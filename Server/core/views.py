from django.shortcuts import render
from rest_framework import generics 

from .models import Pessoal
from .serializers import PessoalSerializer

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class PerfilDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = PessoalSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        perfil, created = Pessoal.objects.get_or_create(
            usuario=self.request.user,
            defaults={'nome': self.request.user.username},
        )
        return perfil
