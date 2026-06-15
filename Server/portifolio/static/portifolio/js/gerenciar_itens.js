const buttonEditSobre = document.getElementById('btn-edit-sobre');
const buttonCancelarEditSobre = document.getElementById('btn-cancelar-sobre');
const buttonSalvarSobre = document.getElementById('btn-salvar-sobre');

const buttonAddTecnologias = document.getElementById('btn-add-tecnologias');
const buttonCancelarAddTecnologias = document.getElementById('btn-cancelar-tech');
const buttonSalvarTecnologias = document.getElementById('btn-salvar-tech');

const buttonEditDados = document.getElementById('btn-edit-dados');
const buttonCancelarEditDados = document.getElementById('btn-cancelar-dados');
const buttonSalvarDados = document.getElementById('btn-salvar-dados');

const buttonAddCertificados = document.getElementById('btn-add-certificado');
const buttonCancelarAddCertificados = document.getElementById('btn-cancelar-cert');
const buttonSalvarCertificados = document.getElementById('btn-salvar-cert');

const buttonAddProjeto = document.getElementById('btn-add-proj');
const buttonCancelarAddProjeto = document.getElementById('btn-cancelar-proj');
const buttonSalvarProjeto = document.getElementById('btn-salvar-proj');

const buttonEditFoto = document.getElementById('btn-edit-foto');
const buttonCancelarEditFoto = document.getElementById('btn-cancelar-foto');
const buttonSalvarFoto = document.getElementById('btn-salvar-foto');

const modalSobre = document.getElementById('sobre-modal');
const modalTecnologia = document.getElementById('tech-modal');
const modalDados = document.getElementById('dados-modal');
const modalCertificados = document.getElementById('cert-modal');
const modalProjeto = document.getElementById('proj-modal');
const modalFoto = document.getElementById('foto-modal');

if (buttonEditSobre) {
    buttonEditSobre.addEventListener('click', function() {
        const token = localStorage.getItem('access_token');

        fetch(API_BASE + '/api/perfil/', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function(response){
            if (!response.ok){
                throw new Error('Erro ao buscar dados! Tente novamente mais tarde.');
            }
            return response.json();
        })
        .then(function(data){
            document.getElementById('txt-sobre-mim').value = data.descricao || '';
            modalSobre.style.display = 'flex';
        })
        .catch(function(error){
            alert(error.message);
        })
    });
}
if (buttonCancelarEditSobre) {
    buttonCancelarEditSobre.addEventListener('click', function() {
        modalSobre.style.display = 'none';
        document.getElementById('txt-sobre-mim').value = '';
    });
}
if (buttonSalvarSobre) {
    buttonSalvarSobre.addEventListener('click', function() {
        const token = localStorage.getItem('access_token');
        const dados = {
            descricao: document.getElementById('txt-sobre-mim').value,
        };

        fetch(API_BASE + '/api/perfil/', {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados),
        })
        .then(function(response) {
            if (!response.ok){
                throw new Error('Erro ao alterar "Sobre Mim"! Tente novamente mais tarde.');
            }
            return response.json();
        })
        .then(function(data) {
            modalSobre.style.display = 'none';
            document.getElementById('txt-sobre-mim').value = '';
            window.showFeedback('Sobre mim atualizado com sucesso!', 'success', function() {
                window.location.reload();
            });
        })
        .catch(function(error) {
            window.showFeedback(error.message, 'error');
        });
    });
}

if (buttonAddTecnologias) {
    buttonAddTecnologias.addEventListener('click', function() {
        modalTecnologia.style.display = 'flex';
    });
}
if (buttonCancelarAddTecnologias) {
    buttonCancelarAddTecnologias.addEventListener('click', function() {
        modalTecnologia.style.display = 'none';
        document.getElementById('tech-nome').value = '';
        document.getElementById('tech-url').value = ''; 
    });
}
if (buttonSalvarTecnologias) {
    buttonSalvarTecnologias.addEventListener('click', function() {
        const token = localStorage.getItem('access_token');
        const dados = {
            nome: document.getElementById('tech-nome').value,
            url_icone: document.getElementById('tech-url').value
        };

        fetch(API_BASE + '/api/tecnologias/', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })
        .then(function(response){
            if (!response.ok){
                throw new Error('Erro ao adicionar tecnologia! Tente novamente mais tarde.');
            }
            return response.json();
        })
        .then(function(data){
            modalTecnologia.style.display = 'none';
            document.getElementById('tech-nome').value = '';
            document.getElementById('tech-url').value = ''; 
            window.showFeedback('Tecnologia adicionada com sucesso!', 'success', function() {
                window.location.reload();
            });
        })
        .catch(function(error){
            window.showFeedback(error.message, 'error');
        });
    });
}

if (buttonEditDados) {
    buttonEditDados.addEventListener('click', function(){
        const token = localStorage.getItem('access_token');
        
        fetch(API_BASE + '/api/perfil/', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function(response){
            if (!response.ok){
                throw new Error('Erro ao buscar dados! Tente novamente mais tarde.');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('txt-nome').value = data.nome || '';
            document.getElementById('txt-idade').value = data.idade || '';
            document.getElementById('txt-curso').value = data.curso || '';
            document.getElementById('txt-periodo').value = data.periodo || '';
            modalDados.style.display = 'flex';
        })
        .catch(function(error){
            window.showFeedback(error.message, 'error');
        });
    });
}
if (buttonCancelarEditDados) {
    buttonCancelarEditDados.addEventListener('click', function(){
        modalDados.style.display = 'none';
        document.getElementById('txt-nome').value = '';
        document.getElementById('txt-idade').value = '';
        document.getElementById('txt-curso').value = '';
        document.getElementById('txt-periodo').value = '';
    });
}
if (buttonSalvarDados) {
    buttonSalvarDados.addEventListener('click', function(){
        const token = localStorage.getItem('access_token');
        const dados = {
            nome: document.getElementById('txt-nome').value,
            idade: document.getElementById('txt-idade').value,
            curso: document.getElementById('txt-curso').value,
            periodo: document.getElementById('txt-periodo').value
        };

        fetch(API_BASE + '/api/perfil/', {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })
        .then(function(response){
            if (!response.ok){
                throw new Error('Erro ao alterar dados pessoais! Tente novamente mais tarde.');
            }
            return response.json();
        })
        .then(function(data){
            modalDados.style.display = 'none';
            document.getElementById('txt-nome').value = '';
            document.getElementById('txt-idade').value = '';
            document.getElementById('txt-curso').value = '';
            document.getElementById('txt-periodo').value = '';
            window.showFeedback('Dados pessoais salvos com sucesso!', 'success', function() {
                window.location.reload();
            });
        })
        .catch(function(error){
            window.showFeedback(error.message, 'error');
        });
    });
}

if (buttonAddCertificados) {
    buttonAddCertificados.addEventListener('click', function(){
        modalCertificados.style.display = 'flex';
    });
}
if (buttonCancelarAddCertificados) {
    buttonCancelarAddCertificados.addEventListener('click', function(){
        modalCertificados.style.display = 'none';
        document.getElementById('cert-descricao').value = ''; 
    });
}
if (buttonSalvarCertificados) {
    buttonSalvarCertificados.addEventListener('click', function(){
        const token = localStorage.getItem('access_token');
        const dados = {
            descricao: document.getElementById('cert-descricao').value
        };

        fetch(API_BASE + '/api/certificados/', {
            method: 'POST', 
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })
        .then(function(response){
            if (!response.ok){
                throw new Error('Erro ao adicionar certificado! Tente novamente mais tarde.');
            }
            return response.json();
        })
        .then(function(data){
            modalCertificados.style.display = 'none';
            document.getElementById('cert-descricao').value = ''; 
            window.showFeedback('Certificado adicionado com sucesso!', 'success', function() {
                window.location.reload();
            });
        })
        .catch(function(error){
            window.showFeedback(error.message, 'error');
        });
    });
}

if (buttonAddProjeto) {
    buttonAddProjeto.addEventListener('click', function(){
        const token = localStorage.getItem('access_token');
        const container = document.getElementById('proj-techs-container');
        container.innerHTML = '<p style="color: #64748b; font-size: 0.9rem; margin: 0;">Carregando...</p>';

        fetch(API_BASE + '/api/tecnologias/', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => {
            if (!response.ok) throw new Error('Erro ao carregar tecnologias.');
            return response.json();
        })
        .then(techs => {
            container.innerHTML = '';
            if (techs.length === 0) {
                container.innerHTML = '<p style="color: #64748b; font-size: 0.9rem; margin: 0;">Nenhuma tecnologia cadastrada.</p>';
                return;
            }
            
            techs.forEach(tech => {
                const label = document.createElement('label');
                label.className = 'tech-checkbox-label';

                label.innerHTML = `
                    <input type="checkbox" name="proj-techs" value="${tech.id}">
                    <img src="${tech.url_icone}" width="16" height="16" style="object-fit: contain;">
                    <span>${tech.nome}</span>
                `;
                container.appendChild(label);
            });
        })
        .catch(error => {
            container.innerHTML = `<p style="color: #ef4444; font-size: 0.9rem; margin: 0;">${error.message}</p>`;
        });

        modalProjeto.style.display = 'flex';
    });
}

if (buttonCancelarAddProjeto) {
    buttonCancelarAddProjeto.addEventListener('click', function(){
        modalProjeto.style.display = 'none';
        document.getElementById('proj-titulo').value = '';
        document.getElementById('proj-descricao').value = '';
        document.getElementById('proj-link').value = '';
        document.getElementById('proj-tipo').value = 'Pessoal';
        document.getElementById('proj-techs-container').innerHTML = '';
    });
}

if (buttonSalvarProjeto) {
    buttonSalvarProjeto.addEventListener('click', function(){
        const token = localStorage.getItem('access_token');
        
        const checkboxes = document.querySelectorAll('input[name="proj-techs"]:checked');
        const tecnologiasIds = Array.from(checkboxes).map(cb => parseInt(cb.value));

        const dados = {
            titulo: document.getElementById('proj-titulo').value,
            descricao: document.getElementById('proj-descricao').value,
            tipo: document.getElementById('proj-tipo').value,
            link_git: document.getElementById('proj-link').value,
            tecnologias: tecnologiasIds
        };

        fetch(API_BASE + '/api/projetos/', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })
        .then(function(response){
            if (!response.ok){
                throw new Error('Erro ao adicionar projeto! Tente novamente mais tarde.');
            }
            return response.json();
        })
        .then(function(data){
            modalProjeto.style.display = 'none';
            document.getElementById('proj-titulo').value = '';
            document.getElementById('proj-descricao').value = '';
            document.getElementById('proj-link').value = '';
            document.getElementById('proj-tipo').value = 'Pessoal';
            window.showFeedback('Projeto adicionado com sucesso!', 'success', function() {
                window.location.reload();
            });
        })
        .catch(function(error){
            window.showFeedback(error.message, 'error');
        });
    });
}

if (buttonEditFoto){
    buttonEditFoto.addEventListener('click', function(){
        const token = localStorage.getItem('access_token');

        fetch(API_BASE + '/api/perfil/', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function(response){
            if(!response.ok){
                throw new Error('Erro ao buscar imagem! Tente novamente mais tarde.');
            }
            return response.json();
        })
        .then(function(data){
            document.getElementById('foto-url').value = data.url_imagem || '';
            modalFoto.style.display = 'flex';
        })
        .catch(function(error){
            window.showFeedback(error.message, 'error');
        });
    })
}

if (buttonCancelarEditFoto){
    buttonCancelarEditFoto.addEventListener('click', function(){
        modalFoto.style.display = 'none';
        document.getElementById('foto-url').value = '';
    });
}

if (buttonSalvarFoto){
    buttonSalvarFoto.addEventListener('click', function(){
        const token = localStorage.getItem('access_token');

        const dados = {
            url_imagem: document.getElementById('foto-url').value
        }

        fetch(API_BASE + '/api/perfil/', {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })
        .then(function(response){
            if(!response.ok){
                throw new Error('Erro ao salvar nova imagem! Tente novamente mais tarde.')
            }
            return response.json()
        })
        .then(function(data){
            modalFoto.style.display = 'none';
            document.getElementById('foto-url').value = '';
            window.showFeedback('Foto de perfil atualizada com sucesso!', 'success', function() {
                window.location.reload();
            });
        })
        .catch(function(error){
            window.showFeedback(error.message, 'error');
        });
    })
}

document.addEventListener('click', function(e) {
    const btnTech = e.target.closest('.btn-delete-tecnologia');
    if (btnTech) {
        e.preventDefault();
        const id = btnTech.dataset.id;
        const token = localStorage.getItem('access_token');

        window.showConfirm('Excluir Tecnologia', 'Deseja realmente excluir esta tecnologia?', function() {
            fetch(API_BASE + '/api/tecnologias/' + id + '/', {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Erro ao deletar tecnologia! Tente novamente mais tarde.');
                }
                window.showFeedback('Tecnologia deletada com sucesso!', 'success', function() {
                    window.location.reload();
                });
            })
            .catch(function(error) {
                window.showFeedback(error.message, 'error');
            });
        });
        return;
    }

    const btnCert = e.target.closest('.btn-delete-certificado');
    if (btnCert) {
        e.preventDefault();
        const id = btnCert.dataset.id;
        const token = localStorage.getItem('access_token');

        window.showConfirm('Excluir Certificado', 'Deseja realmente excluir este certificado?', function() {
            fetch(API_BASE + '/api/certificados/' + id + '/', {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Erro ao deletar certificado! Tente novamente mais tarde.');
                }
                window.showFeedback('Certificado deletado com sucesso!', 'success', function() {
                    window.location.reload();
                });
            })
            .catch(function(error) {
                window.showFeedback(error.message, 'error');
            });
        });
        return;
    }

    const btnProj = e.target.closest('.btn-delete-proj');
    if (btnProj) {
        e.preventDefault();
        const id = btnProj.dataset.id;
        const token = localStorage.getItem('access_token');

        window.showConfirm('Excluir Projeto', 'Deseja realmente excluir este projeto?', function() {
            fetch(API_BASE + '/api/projetos/' + id + '/', {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Erro ao deletar projeto! Tente novamente mais tarde.');
                }
                window.showFeedback('Projeto deletado com sucesso!', 'success', function() {
                    window.location.reload();
                });
            })
            .catch(function(error) {
                window.showFeedback(error.message, 'error');
            });
        });
    }
});