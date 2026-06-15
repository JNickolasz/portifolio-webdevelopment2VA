from django.contrib import admin
from .models import Projeto, Certificado, Tecnologia

# Register your models here.

admin.site.register(Projeto)
admin.site.register(Certificado)
admin.site.register(Tecnologia)
