const btnEditar = document.getElementById('edit-button');
const API_BASE = 'http://127.0.0.1:8000';

// === Controle de Autenticação ===

function verificarAutenticao() {
    const token = localStorage.getItem('access_token');
    const adminElements = document.querySelectorAll('.admin-only');

    if (token) {
        adminElements.forEach(el => {
            el.style.setProperty('display', 'inline-block', 'important');
        });
        btnEditar.innerHTML = '<i data-lucide="log-out"></i>';
        lucide.createIcons(); 
        btnEditar.style.color = '#ef4444';
        btnEditar.style.setProperty('display', 'inline-block', 'important');
    } else {
        adminElements.forEach(el => {
            el.style.setProperty('display', 'none', 'important');
        });
        btnEditar.style.setProperty('display', 'none', 'important');
    }
}

if (btnEditar) {
    btnEditar.addEventListener('click', function(e) {
        e.preventDefault();
        const token = localStorage.getItem('access_token');

        if (token) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            verificarAutenticao();
            window.showFeedback('Você saiu da conta com sucesso!', 'success', function() {
                window.location.reload();
            });
        }
    });
}

// === Helper Functions para Modais Customizados ===

window.showFeedback = function(message, type = 'success', callback = null) {
    const toast = document.getElementById('feedback-toast');
    const icon = document.getElementById('feedback-icon');
    const msgSpan = document.getElementById('feedback-message');

    toast.className = 'feedback-toast ' + type;
    msgSpan.textContent = message;

    if (type === 'success') {
        icon.className = 'fa-solid fa-circle-check';
    } else {
        icon.className = 'fa-solid fa-circle-xmark';
    }

    toast.style.display = 'flex';
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    setTimeout(function() {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(function() {
            toast.style.display = 'none';
            if (callback) callback();
        }, 300);
    }, 1800);
};

window.showConfirm = function(title, message, onYes, onNo = null) {
    const confirmModal = document.getElementById('confirm-modal');
    const confirmTitle = document.getElementById('confirm-title');
    const confirmMessage = document.getElementById('confirm-message');
    const btnYes = document.getElementById('btn-confirm-yes');
    const btnNo = document.getElementById('btn-confirm-no');

    confirmTitle.textContent = title;
    confirmMessage.textContent = message;

    confirmModal.style.display = 'flex';

    // Substituir botões para remover listeners antigos
    const newBtnYes = btnYes.cloneNode(true);
    const newBtnNo = btnNo.cloneNode(true);
    btnYes.parentNode.replaceChild(newBtnYes, btnYes);
    btnNo.parentNode.replaceChild(newBtnNo, btnNo);

    newBtnYes.addEventListener('click', function() {
        confirmModal.style.display = 'none';
        if (onYes) onYes();
    });

    newBtnNo.addEventListener('click', function() {
        confirmModal.style.display = 'none';
        if (onNo) onNo();
    });
};

document.addEventListener('DOMContentLoaded', verificarAutenticao);