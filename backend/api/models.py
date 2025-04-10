from django.db import models
from django.contrib.auth.models import User
    
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
    indirizzo_farmacia = models.CharField(max_length=500, null=True)
    partita_iva =  models.CharField(max_length=100, null=True, blank=True)
    reset_token = models.CharField(max_length=255, null=True, blank=True)
    reset_token_expires_at = models.DateTimeField(null=True, blank=True)
    lat = models.DecimalField(max_digits=9, decimal_places=6, db_column="Lat", null=True, blank=True)
    lng = models.DecimalField(max_digits=9, decimal_places=6, db_column="Lng", null=True, blank=True)

    def __str__(self):
        return self.user.username
    
class Offer(models.Model):
    title = models.CharField(max_length=400, null=True, blank=True)
    description = models.TextField()
    date_from = models.DateField(null=True, blank=True)  
    date_to = models.DateField(null=True, blank=True)   
    time_from = models.TimeField(null=True, blank=True)  
    time_to = models.TimeField(null=True, blank=True) 
    salary = models.FloatField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="offers", null=True)

    def __str__(self):
        return self.title or "Offer"
    
class Candidature(models.Model):
    offer = models.ForeignKey(Offer, on_delete=models.CASCADE, related_name='candidatures')
    farmacista = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='candidatures')
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('offer', 'farmacista')  # Prevents duplicate

    def __str__(self):
        return f"{self.farmacista.user.username} → {self.offer.title}"
    
class Pharmacy(models.Model):
    pharmacy_id = models.AutoField(primary_key=True, db_column="PharmacyID")
    pharmacy_name = models.TextField(db_column="PharmacyName")
    provincia = models.TextField(db_column="Provincia")
    address = models.TextField(db_column="Address")
    phone = models.TextField(db_column="Phone", null=True, blank=True)
    lat = models.DecimalField(max_digits=9, decimal_places=6, db_column="Lat", null=True, blank=True)
    lng = models.DecimalField(max_digits=9, decimal_places=6, db_column="Lng", null=True, blank=True)

    class Meta:
        db_table = "api_pharmacies"

    def __str__(self):
        return self.pharmacy_name