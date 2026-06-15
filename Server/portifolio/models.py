from django.db import models

# Create your models here.

class Projeto(models.Model): 
    TIPO_CHOICES = [
        ('Pessoal', 'Projeto Pessoal'),
        ('Acadêmico', 'Projeto Acadêmico'),
        ('Profissional', 'Projeto Profissional'),
    ]

    titulo = models.CharField(max_length=100)
    descricao = models.TextField()
    tecnologias = models.ManyToManyField('Tecnologia', blank=True)
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES, default='Pessoal')
    link_git = models.URLField()

    def __str__(self):
        return self.titulo

class Certificado(models.Model):
    # Foi pedido apenas uma coluna de descrição no arquivo de instruções...
    descricao = models.TextField()

    def __str__(self):
        return self.descricao

class Tecnologia(models.Model):
    nome = models.CharField(max_length=50)
    url_icone = models.URLField()

    def __str__(self):
        return self.nome 
