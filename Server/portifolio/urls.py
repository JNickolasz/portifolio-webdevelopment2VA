from django.views.generic import RedirectView
from django.urls import path
from . import views

app_name = 'portifolio'

urlpatterns = [
    # === TEMPLATES(HTML) ===
    path("", RedirectView.as_view(url='home/', permanent=True)),
    path("home/", view=views.home, name='home'),
    path("projetos/", view=views.projeto_view, name='projetos'),
    path("contato/", view=views.contato_view, name='contato'),
    path("login/", view=views.login_view, name='login'),
    # === API REST ===
        # === Projetos ===
    path("api/projetos/", views.ProjetoListCreateAPIView.as_view(), name='api_projetos_list'),
    path("api/projetos/<int:pk>/", views.ProjetoRetrieveUpdateDestroyAPIView.as_view(), name='api_projetos_detail'),
        # === Tecnologias ===
    path("api/tecnologias/", views.TecnologiaListCreateAPIView.as_view(), name='api_tecnologias_list'),
    path("api/tecnologias/<int:pk>/", views.TecnologiaRetriveUpdateDestroyAPIView.as_view(), name='api_tecnologias_detail'),
        # === Certificados ===
    path("api/certificados/", views.CertificadoListCreateAPIView.as_view(), name='api_certificados_list'),
    path("api/certificados/<int:pk>/", views.CertificadoRetriveUpdateDestroyAPIView.as_view(), name='api_certificados_detail'),
]
