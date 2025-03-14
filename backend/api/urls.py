from django.urls import path
from . import views

urlpatterns = [
    path('offer/', views.OfferCreate.as_view(), name="create_offer"),
    path('offers/', views.OfferList.as_view(), name="get_all_offers"),
    path('get_pharmacies/', views.CreateFarmacieView.as_view(), name="get_all_pharmacies" )
]