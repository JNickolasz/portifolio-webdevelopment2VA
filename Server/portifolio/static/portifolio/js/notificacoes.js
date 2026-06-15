function iniciarNotificacoes() {
    const config = window.NOTIFICACAO_CONFIG;
    if (!config) return;

    // Obtém o token JWT do localStorage
    const token = localStorage.getItem('access_token');
    if (!token) return;

    // Decodifica o payload do token JWT para obter o user_id
    let userId;
    try {
        const payloadBase64 = token.split('.')[1];
        const payloadDecodificado = JSON.parse(atob(payloadBase64));
        userId = payloadDecodificado.user_id;
    } catch (e) {
        console.error("Erro ao decodificar token JWT:", e);
        return;
    }

    const bell = document.getElementById('notification-bell');
    const badge = document.getElementById('notification-badge');
    const dropdown = document.getElementById('notification-dropdown');
    const listContainer = document.getElementById('notification-list');

    if (!bell || !badge || !dropdown || !listContainer) return;

    const headers = {
        'X-Api-Key': config.apiKey,
        'X-User-Id': String(userId),
        'Content-Type': 'application/json'
    };

    async function fetchUnreadCount() {
        try {
            const response = await fetch(`${config.msUrl}/api/notificacoes/nao-lidas/`, { headers });
            if (!response.ok) throw new Error();

            const data = await response.json();
            const count = data.count;

            badge.textContent = count;
            badge.classList.remove('offline');

            if (count === 0) {
                badge.classList.add('empty');
            } else {
                badge.classList.remove('empty');
            }
        } catch (error) {
            badge.textContent = 'X';
            badge.classList.add('offline');
            badge.classList.remove('empty');
        }
    }

    async function fetchNotificationsList() {
        try {
            const response = await fetch(`${config.msUrl}/api/notificacoes/?is_read=false`, { headers });
            if (!response.ok) throw new Error();

            const notifications = await response.json();
            listContainer.innerHTML = '';

            if (notifications.length === 0) {
                listContainer.innerHTML = '<p class="notification-empty">Nenhuma mensagem nova.</p>';
                return;
            }

            notifications.forEach(notif => {
                const date = new Date(notif.criado_em).toLocaleDateString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit'
                });

                const item = document.createElement('div');
                item.className = 'notification-item';
                item.innerHTML = `
                    <p class="notification-text">${notif.mensagem}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                        <span class="notification-time">${date}</span>
                        <button class="mark-read-btn" data-id="${notif.id}">Marcar como lida</button>
                    </div>
                `;
                item.querySelector('.mark-read-btn').addEventListener('click', function() {
                    markAsRead(notif.id);
                });
                listContainer.appendChild(item);
            });
        } catch (error) {
            listContainer.innerHTML = '<p class="notification-empty" style="color: #ef4444;">Erro ao buscar notificações.</p>';
        }
    }

    async function markAsRead(id) {
        try {
            const response = await fetch(`${config.msUrl}/api/notificacoes/${id}/lida/`, {
                method: 'PATCH',
                headers: headers
            });

            if (response.ok) {
                await fetchNotificationsList();
                await fetchUnreadCount();
            }
        } catch (error) {
            console.error(error);
        }
    }

    bell.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdown.classList.toggle('active');

        if (dropdown.classList.contains('active')) {
            fetchNotificationsList();
        }
    });

    document.addEventListener('click', function() {
        dropdown.classList.remove('active');
    });

    dropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    fetchUnreadCount();
    setInterval(fetchUnreadCount, 5000);
}

// Inicializa a escuta de notificações
document.addEventListener('DOMContentLoaded', function() {
    iniciarNotificacoes();
});