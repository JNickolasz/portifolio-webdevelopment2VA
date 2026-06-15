# Portfólio Acadêmico - Django & Django REST Framework (com Microserviço de Notificação)

Este projeto é um portfólio acadêmico dinâmico desenvolvido como parte das atividades da cadeira de desenvolvimento web. O sistema combina um backend robusto em Django com Django REST Framework (DRF) e uma interface frontend interativa desenvolvida inteiramente em Vanilla JavaScript e CSS, adotando uma estética moderna de **Glassmorphism**.

Nesta segunda etapa do projeto, integramos o portfólio a um **Microserviço de Notificações independente** rodando em um servidor separado.

---

## 📁 Estrutura de Diretórios Recomendada

Para rodar o projeto localmente de forma organizada, o professor deve organizar os repositórios em duas pastas irmãs dentro de um diretório comum (por exemplo, `2VA/`):

```text
2VA/
├── Portifolio - DRF & Microserviço/   <-- Repositório do Portfólio (Porta 8000)
│   └── Server/
└── Microserviço/                      <-- Repositório do Microserviço (Porta 8001)
    └── notificacao_ms/
```

---

## 🔧 Como Executar Ambos os Projetos e Testar

Siga o passo a passo abaixo para clonar, rodar e testar os dois servidores localmente.

### PASSO 1: Clonar os Repositórios

Abra o terminal na pasta onde deseja organizar os projetos e clone os dois repositórios:

```bash
# 1. Clonar o projeto do Portfólio
git clone https://github.com/JNickolasz/portifolio-webdevelopment2VA.git "Portifolio - DRF & Microserviço"

# 2. Clonar o projeto do Microserviço
git clone https://github.com/JNickolasz/notification-microservice.git Microserviço
```

---

### PASSO 2: Preparar e Executar o Microserviço (Porta 8001)

Abra o primeiro terminal na pasta raiz onde os projetos foram clonados:

```bash
# 1. Entre no diretório do microserviço
cd Microserviço

# 2. Crie e ative a venv própria do microserviço
python -m venv .venv
source .venv/bin/activate  # No Windows use: .venv\Scripts\activate

# 3. Instale as dependências
pip install django djangorestframework django-cors-headers

# 4. Rode as migrações para criar o banco de dados
python manage.py makemigrations
python manage.py migrate

# 5. Crie um superusuário para acessar o admin do microserviço
python manage.py createsuperuser

# 6. Inicie o servidor do microserviço na porta 8001
python manage.py runserver 8001
```

### PASSO 3: Configurar o Admin do Microserviço

1. No seu navegador, acesse **[http://127.0.0.1:8001/admin/](http://127.0.0.1:8001/admin/)** e faça login com a conta de superusuário criada no passo anterior.
2. Vá em **Empresas** e clique em **Adicionar Empresa**.
3. Escolha o nome `Portfólio UAST` e clique em **Salvar**.
4. Abra novamente a empresa criada e **copie o código Hash de 16 caracteres** gerado automaticamente (ex: `fe8cdd0939fe5a3d`).
5. Vá em **Targets** e adicione um novo target:
   - Selecione a empresa `Portfólio UAST`.
   - No campo `user_id`, coloque `1` (que é o ID padrão do administrador no banco do portfólio).

---

### PASSO 4: Preparar e Executar o Portfólio (Porta 8000)

Abra um **segundo terminal** (mantenha o terminal do microserviço aberto e rodando) e execute:

```bash
# 1. Entre na pasta do portfólio
cd "Portifolio - DRF & Microserviço"

# 2. Crie e ative o ambiente virtual (venv)
python -m venv .venv
source .venv/bin/activate  # No Windows use: .venv\Scripts\activate

# 3. Instale as dependências
pip install -r Server/requirements.txt

# 4. Configure a API Key no Portfólio
# Abra o arquivo `Server/django_tutorial/settings.py` e altere a seguinte linha
# adicionando o hash copiado no PASSO 3:
# NOTIFICACAO_MS_API_KEY = 'hash_copiado_do_admin'

# 5. Execute as migrações (criar banco do portfólio)
cd Server
python manage.py migrate

# 6. Carregue os dados de teste (Fixture)
python manage.py loaddata db.json

# 7. Execute o servidor do portfólio na porta 8000
python manage.py runserver 8000
```

---

## 🧪 Como Testar a Integração de Notificações

1. Acesse o Portfólio no navegador: **[http://127.0.0.1:8000/portfolio/](http://127.0.0.1:8000/portfolio/)**
2. Clique no ícone de chave no canto inferior direito para acessar a tela de **Login** e insira as credenciais do administrador.
3. Assim que fizer login, a navbar mostrará o **Sino de Notificações** exibindo `0` (indicando conexão ativa com o microserviço, mas sem mensagens).
4. No Django Admin do Microserviço (porta 8001), vá em **Notificações** e clique em **Adicionar**:
   - Selecione o target `Portfólio UAST - User 1`.
   - Digite a mensagem: `Sua informação foi editada com sucesso!`.
   - Certifique-se de que a opção `Is read` está desmarcada e clique em Salvar.
5. Volte para a aba do Portfólio no navegador. Em no máximo 5 segundos, o badge do sino vai mudar de `0` para `1` (bolinha vermelha vibrante).
6. Clicar no sino abrirá o dropdown listando a notificação criada. Ao clicar em **"Marcar como lida"**, o item desaparece e o sino volta a marcar `0`.
7. **Simulação de Queda de Conexão**: Vá no terminal do microserviço (porta 8001) e derrube o servidor pressionando `Ctrl + C`. Em menos de 5 segundos, o badge do sino no portfólio mudará para **X** (cinza), indicando que perdeu a comunicação com a API de notificações.
