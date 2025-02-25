from django.contrib.auth.models import User
from django.core.files.uploadedfile import InMemoryUploadedFile
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import UserSerializer, NoteSerializer, OfferSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.generics import RetrieveUpdateAPIView
from .models import Note, Offer

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user        
        return Note.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

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

class NoteDelete(generics.DestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

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