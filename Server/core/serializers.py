from rest_framework import serializers
from .models import Pessoal 

class PessoalSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Pessoal 
        fields = ['id', 'nome', 'idade', 'descricao', 'curso', 'periodo', 'email', 'git', 'linked', 'url_imagem']
