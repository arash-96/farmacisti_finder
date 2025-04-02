from django.urls import path
from . import views

urlpatterns = [
    path('offer/', views.OfferCreate.as_view(), name="create_offer"),
    path('offers/', views.OfferList.as_view(), name="get_all_offers"),
    path('get_pharmacies/', views.CreateFarmacieView.as_view(), name="get_all_pharmacies" ),
    path('users/titolare/', views.TitolareUserListView.as_view(), name="get_titolare_users"),
    path('users/update_location/', views.UpdateLocationView.as_view(), name="update_location"),
    path('users/get_location/', views.GetLocationView.as_view(), name="get_location"),
    path('offers/my/', views.MyOffersView.as_view(), name='my_offers'),
    path('offers/<int:pk>/delete/', views.DeleteOfferView.as_view(), name='delete_offer'),
    path('offers/<int:pk>/update/', views.UpdateOfferView.as_view(), name='update_offer'),
]