from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title
    
class Profile(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    dob = models.DateField(null=True, blank=True)
    placeOfBirth = models.CharField(max_length=255, null=True, blank=True)
    telephone = models.CharField(max_length=15, null=True, blank=True)
    userRole = models.CharField(max_length=100, null=True)
    pdf_file = models.TextField(null=True, blank=True)
    regione_residenza = models.CharField(max_length=200, null=True)
    provincia_residenza = models.CharField(max_length=300, null=True)
    comune = models.CharField(max_length=300, null=True)
    via = models.CharField(max_length=600, null=True)
    numero_iscrizione_albo =  models.CharField(max_length=100, null=True, blank=True)
    titolo = models.CharField(max_length=200, null=True)
    denominazione_farmacia = models.CharField(max_length=200, null=True)
    partita_iva =  models.CharField(max_length=100, null=True, blank=True)


    def __str__(self):
        return self.user.username
    
class Offer(models.Model):
    TIME_CHOICES = [
        ('mattina', 'Mattina'),
        ('pomeriggio', 'Pomeriggio'),
        ('sera', 'Sera'),
        ('notturno', 'Notturno'),
    ]

    title = models.CharField(max_length=400, null=True, blank=True)
    description = models.TextField()
    time = models.CharField(max_length=10, choices=TIME_CHOICES)
    salary = models.FloatField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="offers", null=True)

    def __str__(self):
        return self.title or "Offer"