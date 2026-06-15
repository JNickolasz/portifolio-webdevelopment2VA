from django import forms 

class ContatoForm(forms.Form):
    nome = forms.CharField(max_length=100)
    email = forms.EmailField()
    assunto = forms.CharField(max_length=200)
    mensagem = forms.CharField(widget=forms.Textarea)