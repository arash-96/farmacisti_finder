from django.urls import path
from . import views

urlpatterns = [
    #Offers
    path('offers/', views.OfferList.as_view(), name="offer-list"),
    path('offers/create/', views.OfferCreate.as_view(), name="offer-create"),
    path('offers/mine/', views.MyOffersView.as_view(), name='offer-mine'),
    path('offers/<int:pk>/delete/', views.DeleteOfferView.as_view(), name='offer-delete'),
    path('offers/<int:pk>/update/', views.UpdateOfferView.as_view(), name='offer-update'),
    #Pharmacies
    path('pharmacies/', views.CreateFarmacieView.as_view(), name="get_all_pharmacies" ),
    #Users
    path('users/titolare/', views.TitolareUserListView.as_view(), name="get_titolare_users"),
    path('users/update_location/', views.UpdateLocationView.as_view(), name="update_location"),
    path('users/get_location/', views.GetLocationView.as_view(), name="get_location"),
    #Candidature
    path('candidature/', views.SubmitCandidatureView.as_view(), name='submit-candidature'),
    path("titolare/candidatures/", views.TitolareCandidatureListView.as_view()),
    #Farmacisti
    path('farmacista/<int:farmacista_id>/profile/', views.FarmacistaProfileView.as_view(), name='farmacista-profile'),
    #Profile Description
    path('profile-descrizione/', views.ProfileDescrizioneView.as_view(), name='profile-descrizione'),
    #All Users
    path('users/all/', views.AllUsersWithRoleView.as_view(), name="get_all_users_with_role"),
]