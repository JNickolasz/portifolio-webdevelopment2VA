from django.contrib.messages.storage import default_storage
from django.conf import settings
from django.db import models

# Create your models here.

class Pessoal(models.Model):
    usuario = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='perfil',
        null=True,
        blank=True,
    )
    nome = models.CharField(max_length=150)
    idade = models.IntegerField(null=True, blank=True)
    descricao = models.TextField(blank=True)
    curso = models.CharField(max_length=50)
    periodo = models.CharField(max_length=50)
    email = models.EmailField(null=False, blank=False)
    git = models.URLField(blank=True)
    linked = models.URLField(blank=True)
    url_imagem = models.URLField(blank=True)

    class Meta:
        verbose_name = 'Perfil Pessoal'
        verbose_name_plural = 'Perfis Pessoais'

    def __str__(self):
        return self.nome