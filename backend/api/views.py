from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.utils.timezone import now, timedelta
from django.contrib.auth.hashers import make_password
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import UserSerializer, OfferSerializer, MyOfferSerializer, ForgotPasswordSerializer, PharmacySerializer, UserProfileSerializer, UserWithProfileSerializer, UserWithRoleSerializer
from .serializers import ProfileLocationUpdateSerializer, CandidatureSerializer, DescrizioneProfileSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.views import APIView
from .models import Offer, Profile, Pharmacy,Candidature
import uuid, os
from django.db.models import Q

class OfferCreate(generics.CreateAPIView):
    serializer_class = OfferSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user        
        return Offer.objects.filter(user=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(user=self.request.user)
        else:
            print(serializer.errors)

class OfferList(generics.ListAPIView):  
    """Returns all offers, regardless of the user."""
    serializer_class = OfferSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Offer.objects.all()

class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class UserDetailsView(RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        pdf_encoded_base64 = request.data.get('pdf_file')
        #Either Update PDF or Profile
        if pdf_encoded_base64: 
            user.profile.pdf_file = pdf_encoded_base64
            user.profile.save()
            return Response({"message": "Profile updated successfully!"}, status=status.HTTP_200_OK)
        else:
            profile_data = request.data.get('profile', {})
            if profile_data:
                for attr, value in profile_data.items():
                    setattr(user.profile, attr, value)
                user.profile.save()
                return Response({"message": "Profile updated successfully!"}, status=status.HTTP_200_OK)
            
        return Response({"error": "Invalid file type. Please upload a valid file."}, status=status.HTTP_400_BAD_REQUEST)
    
class TitolareUserListView(generics.ListAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Retrieve titolare users and filter by search term if provided."""
        queryset = Profile.objects.filter(userRole='titolare')

        # Retrieve search term from query parameters
        search_term = self.request.query_params.get('search', "").strip()
        
        if search_term:
            queryset = queryset.filter(
                Q(name__icontains=search_term) | 
                Q(surname__icontains=search_term) | 
                Q(denominazione_farmacia__icontains=search_term) |
                Q(provincia_residenza__icontains=search_term) |
                Q(regione_residenza__icontains=search_term) |  
                Q(comune__icontains=search_term)  
            )

        return queryset
    
class ForgotPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        email = serializer.validated_data['email']
        
        try:
            user = User.objects.get(username=email)
        except User.DoesNotExist:
            return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)

        profile, created = Profile.objects.get_or_create(user=user)

        token = str(uuid.uuid4())
        profile.reset_token = token
        profile.reset_token_expires_at = now() + timedelta(hours=1)  # Expires in 1 hour
        profile.save()

        reset_link = f"http://localhost:5173/reset-password/{token}/"
        send_mail(
            'Password Reset Request',
            f'Click the link to reset your password: {reset_link}',
            os.getenv("EMAIL_HOST_USER"),
            [email],
            fail_silently=False,
        )

        return Response({'message': 'Password reset email sent'}, status=status.HTTP_200_OK)
    
class ResetPasswordView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        token = request.data.get("token")
        new_password = request.data.get("password")

        if not token or not new_password:
            return Response({"error": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            profile = Profile.objects.get(reset_token=token)
            if profile.reset_token_expires_at and profile.reset_token_expires_at < now():
                return Response({"error": "Token expired"}, status=status.HTTP_400_BAD_REQUEST)

            user = profile.user
            user.password = make_password(new_password)
            user.save()

            profile.reset_token = None
            profile.reset_token_expires_at = None
            profile.save()

            return Response({"message": "Password successfully reset"}, status=status.HTTP_200_OK)

        except Profile.DoesNotExist:
            return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
        
class CreateFarmacieView(generics.ListAPIView):
    serializer_class = PharmacySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Pharmacy.objects.all()
        search_query = self.request.query_params.get('search', None)
        if search_query:
            queryset = queryset.filter(
                Q(pharmacy_name__icontains=search_query) | 
                Q(address__icontains=search_query) |
                Q(provincia__icontains=search_query)
            )
        return queryset[:5]
    

class UpdateLocationView(APIView):
    serializer_class = ProfileLocationUpdateSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.data.get('userId')
        lat = request.data.get('lat')
        lng = request.data.get('lng')

        if lat is None or lng is None:
            return Response({"error": "Latitude and Longitude are required."}, status=status.HTTP_400_BAD_REQUEST)

        profile = Profile.objects.get(id=user)
        profile.lat = lat
        profile.lng = lng
        profile.save()

        return Response({"message": "Location updated successfully"}, status=status.HTTP_200_OK)
    
class GetLocationView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user_id = request.data.get('userId')

        if not user_id:
            return Response({"error": "userId is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            profile = Profile.objects.get(id=user_id)
        except Profile.DoesNotExist:
            return Response({"error": "Profile not found for the specified user."}, status=status.HTTP_404_NOT_FOUND)

        return Response({
            "lat": profile.lat,
            "lng": profile.lng
        }, status=status.HTTP_200_OK)

class UserOfferBaseView:
    serializer_class = MyOfferSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Offer.objects.filter(user=self.request.user)

class MyOffersView(UserOfferBaseView, generics.ListAPIView):
    pass

class DeleteOfferView(UserOfferBaseView, generics.DestroyAPIView):
    pass

class UpdateOfferView(UserOfferBaseView, generics.RetrieveUpdateAPIView):
    pass


class FarmacistaProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, farmacista_id):
        try:
            farmacista_profile = Profile.objects.get(id=farmacista_id, userRole='farmacista')
        except Profile.DoesNotExist:
            return Response({'error': 'Farmacista not found'}, status=status.HTTP_404_NOT_FOUND)

        if request.user.profile.userRole != 'titolare':
            return Response({'error': 'Only titolari can view this'}, status=status.HTTP_403_FORBIDDEN)

        if not can_titolare_view_profile(request.user, farmacista_profile):
            return Response({'error': 'You do not have permission to view this profile'}, status=status.HTTP_403_FORBIDDEN)

        serializer = UserProfileSerializer(farmacista_profile)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class SubmitCandidatureView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        offer_id = request.data.get("offer_id")
        if request.user.profile.userRole != 'farmacista':
            return Response({'error': 'Only farmacisti can apply to offers'}, status=status.HTTP_403_FORBIDDEN)

        try:
            offer = Offer.objects.get(id=offer_id)
        except Offer.DoesNotExist:
            return Response({'error': 'Offer not found'}, status=status.HTTP_404_NOT_FOUND)

        candidatura, created = Candidature.objects.get_or_create(
            offer=offer,
            farmacista=request.user.profile
        )

        if not created:
            return Response({'message': 'You already applied to this offer'}, status=status.HTTP_200_OK)

        return Response({'message': 'Application submitted successfully'}, status=status.HTTP_201_CREATED)


def can_titolare_view_profile(titolare_user, farmacista_profile):
    return Candidature.objects.filter(
        offer__user=titolare_user,
        farmacista=farmacista_profile
    ).exists()

class TitolareCandidatureListView(generics.ListAPIView):
    serializer_class = CandidatureSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.profile.userRole != 'titolare':
            return Candidature.objects.none()
        return Candidature.objects.filter(offer__user=user).select_related("offer", "farmacista", "farmacista__user")
    
class ProfileDescrizioneView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DescrizioneProfileSerializer

    def get_object(self):
        return self.request.user.profile

class AllUsersWithRoleView(generics.ListAPIView):
    serializer_class = UserWithRoleSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get_queryset(self):
        queryset = User.objects.all().select_related("profile")
        search = self.request.query_params.get("search", "").strip()
        role = self.request.query_params.get("role", "").strip().lower()

        if search:
            queryset = queryset.filter(
                Q(username__icontains=search) |
                Q(email__icontains=search)
            )

        if role:
            queryset = queryset.filter(profile__userRole__iexact=role)

        return queryset.order_by("id")
    
class SingleUserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.select_related("profile")
    serializer_class = UserWithProfileSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    lookup_field = "pk"
    
class DeleteAccountView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        user = request.user
        user.is_active = False
        user.save()
        return Response({"message": "Account disattivato con successo."}, status=status.HTTP_200_OK)
