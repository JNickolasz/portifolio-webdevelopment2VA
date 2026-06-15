from django.shortcuts import redirect
from django.contrib import messages
from django.core.mail import send_mail
from django.shortcuts import render

from rest_framework import generics 
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from core.models import Pessoal
from .models import Projeto, Certificado, Tecnologia
from .forms import ContatoForm

from .serializers import TecnologiaSerializer, ProjetoSerializer, CertificadoSerializer

# Create your views here.

# === TEMPLATES ===

def home(request):
    dados = Pessoal.objects.first() # Pega só o primeiro q achar no banco, já q é pessoal ent...
    tecnologias = Tecnologia.objects.all()
    certificados = Certificado.objects.all()
    projetos = Projeto.objects.all()
    
    return render(request, 'portifolio/home.html', {
        'dados': dados, 
        'tecnologias': tecnologias, 
        'certificados': certificados,
        'projetos': projetos
    })

def contato_view(request): 
    dados = Pessoal.objects.first()
    if request.method == "POST":
        form = ContatoForm(request.POST)
        if form.is_valid():
            send_mail(
                subject = form.cleaned_data['assunto'],
                message = form.cleaned_data['mensagem'],
                from_email = form.cleaned_data['email'],
                recipient_list = [dados.email]
            )
            messages.success(request, "E-mail enviado com sucesso! Entraremos em contato em breve.")
        else:
            messages.error(request, "Erro ao enviar e-mail. Tente novamente em breve.")
        return redirect('portifolio:contato')
    else: 
        form = ContatoForm()
    
    return render(request, "portifolio/contato.html", {
        'dados': dados, 
        'form': form
    })

def projeto_view(request):
    dados = Pessoal.objects.first()
    projetos = Projeto.objects.all()
    return render(request, 'portifolio/projetos.html', {
        'dados': dados, 
        'projetos': projetos
    })

def login_view(request):
    dados = Pessoal.objects.first()
    return render(request, 'portifolio/login.html', {
        'dados': dados
    })

# === API REST ===

class ProjetoListCreateAPIView(generics.ListCreateAPIView):
    queryset = Projeto.objects.all()
    serializer_class = ProjetoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class ProjetoRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Projeto.objects.all()
    serializer_class = ProjetoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class TecnologiaListCreateAPIView(generics.ListCreateAPIView):
    queryset = Tecnologia.objects.all()
    serializer_class = TecnologiaSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class TecnologiaRetriveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tecnologia.objects.all()
    serializer_class = TecnologiaSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class CertificadoListCreateAPIView(generics.ListCreateAPIView):
    queryset = Certificado.objects.all()
    serializer_class = CertificadoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class CertificadoRetriveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Certificado.objects.all()
    serializer_class = CertificadoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]