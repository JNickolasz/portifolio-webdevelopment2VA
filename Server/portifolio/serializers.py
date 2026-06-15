from rest_framework import serializers 

from .models import Tecnologia, Projeto, Certificado

class TecnologiaSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Tecnologia 
        fields = '__all__'

class ProjetoSerializer(serializers.ModelSerializer):
    tecnologias_detalhe = TecnologiaSerializer(source='tecnologias', many=True, read_only=True)

    class Meta: 
        model = Projeto
        fields = ['id', 'titulo', 'descricao', 'tipo', 'link_git', 'tecnologias', 'tecnologias_detalhe']

class CertificadoSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Certificado
        fields = '__all__'
