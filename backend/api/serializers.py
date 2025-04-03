from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, Profile, Offer, Pharmacy, Candidature

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["id", "name", "surname", "dob", "placeOfBirth", "telephone", "userRole", "pdf_file",
                   "regione_residenza", "provincia_residenza", "comune", "via", "numero_iscrizione_albo",
                   "titolo", "denominazione_farmacia", "partita_iva", "lat", "lng"
                ]
        extra_kwargs = {"pdf_file": {"required": False}}

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = ["id", "username", "password", "profile"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        profile_data = validated_data.pop("profile", {})
        user = User.objects.create_user(**validated_data)
        Profile.objects.create(user=user, **profile_data)
        return user

    def update(self, instance, validated_data):
        profile_data = validated_data.pop("profile", {})
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        profile = instance.profile
        for attr, value in profile_data.items():
            setattr(profile, attr, value)
        profile.save()

        return instance
    
class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}

class OfferSerializer(serializers.ModelSerializer):
    lat = serializers.DecimalField(source='user.profile.lat', max_digits=9, decimal_places=6, read_only=True)
    lng = serializers.DecimalField(source='user.profile.lng', max_digits=9, decimal_places=6, read_only=True)
    denominazione_farmacia = serializers.CharField(source='user.profile.denominazione_farmacia', read_only=True)

    class Meta:
        model = Offer
        fields = [
            "id", "title", "description", "time_from", "time_to", "date_from", "date_to", "salary", "user",
            "lat", "lng", "denominazione_farmacia"
        ]
        extra_kwargs = {"user": {"read_only": True}}

class PharmacySerializer(serializers.ModelSerializer):
    class Meta:
        model = Pharmacy
        fields = [
            "pharmacy_id",
            "pharmacy_name",
            "provincia",
            "address",
            "phone",
            "lat",
            "lng",
        ]

class ProfileLocationUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['lat', 'lng']

class FarmacistaProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            'id', 'name', 'surname', 'pdf_file', 'telephone', 'regione_residenza',
            'provincia_residenza', 'comune', 'titolo'
        ]

# Basic offer info
class OfferBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        fields = [
            'id', 'title', 'description', 'salary', 'date_from', 'date_to',
            'time_from', 'time_to'
        ]


class CandidatureSerializer(serializers.ModelSerializer):
    offer = OfferBasicSerializer(read_only=True)
    farmacista = FarmacistaProfileSerializer(read_only=True)

    class Meta:
        model = Candidature
        fields = ['id', 'offer', 'farmacista', 'submitted_at']
    

class MyOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        fields = '__all__'