// Dados das atividades (apenas número, local e horário)
const atividades = [
    // Dia 19
    {
        id: 1,
        titulo: "Atividade 1",
        local: "Auditório Principal",
        dia: 19,
        horaInicio: "10:00",
        horaFim: "12:00",
        status: "acontecendo"
    },
    {
        id: 2,
        titulo: "Atividade 2",
        local: "Pátio Central",
        dia: 19,
        horaInicio: "13:00",
        horaFim: "15:00",
        status: "acontecendo"
    },
    {
        id: 3,
        titulo: "Atividade 3",
        local: "Sala de Reunião 1",
        dia: 19,
        horaInicio: "14:00",
        horaFim: "16:00",
        status: "terminado"
    },
    {
        id: 4,
        titulo: "Atividade 4",
        local: "Auditório Principal",
        dia: 19,
        horaInicio: "15:00",
        horaFim: "17:00",
        status: "acontecendo"
    },
    
    // Dia 20
    {
        id: 5,
        titulo: "Atividade 5",
        local: "Pátio Externo",
        dia: 20,
        horaInicio: "09:00",
        horaFim: "11:00",
        status: "nao-iniciado"
    },
    {
        id: 6,
        titulo: "Atividade 6",
        local: "Auditório Principal",
        dia: 20,
        horaInicio: "10:00",
        horaFim: "12:00",
        status: "nao-iniciado"
    },
    {
        id: 7,
        titulo: "Atividade 7",
        local: "Pátio Central",
        dia: 20,
        horaInicio: "11:00",
        horaFim: "13:00",
        status: "nao-iniciado"
    },
    {
        id: 8,
        titulo: "Atividade 8",
        local: "Sala de Reunião 2",
        dia: 20,
        horaInicio: "14:00",
        horaFim: "16:00",
        status: "nao-iniciado"
    }
];

// Estado atual dos filtros
let currentFilter = {
    status: 'todos',
    day: 'todos'
};

// Função para filtrar eventos
function filterEvents(type, value) {
    // Atualizar o estado do filtro
    if (type === 'status') {
        currentFilter.status = value;
        // Atualizar botões de status
        document.querySelectorAll('.status-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
    } else if (type === 'day') {
        currentFilter.day = value;
        // Atualizar botões de dia
        document.querySelectorAll('.day-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
    }
    
    // Aplicar filtros
    aplicarFiltros();
}

// Função para aplicar todos os filtros
function aplicarFiltros() {
    let atividadesFiltradas = [...atividades];
    
    // Filtrar por status
    if (currentFilter.status !== 'todos') {
        atividadesFiltradas = atividadesFiltradas.filter(a => a.status === currentFilter.status);
    }
    
    // Filtrar por dia
    if (currentFilter.day !== 'todos') {
        atividadesFiltradas = atividadesFiltradas.filter(a => a.dia === parseInt(currentFilter.day));
    }
    
    renderizarAtividades(atividadesFiltradas);
}

// Função para renderizar atividades
function renderizarAtividades(atividadesFiltradas) {
    const grid = document.getElementById('eventsGrid');
    
    if (atividadesFiltradas.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 50px; background: white; border-radius: 10px;">Nenhuma atividade encontrada.</div>';
        return;
    }

    grid.innerHTML = atividadesFiltradas.map(atividade => {
        // Determinar classe e texto do status
        let statusClass, statusText;
        switch(atividade.status) {
            case 'acontecendo':
                statusClass = 'status-acontecendo';
                statusText = '🟢 A Decorrer';
                break;
            case 'terminado':
                statusClass = 'status-terminado';
                statusText = '🔴 Terminado';
                break;
            case 'nao-iniciado':
                statusClass = 'status-nao-iniciado';
                statusText = '🟡 Não Iniciado';
                break;
        }

        return `
            <div class="event-card ${atividade.status}">
                <div class="event-header">
                    <span class="event-status ${statusClass}">${statusText}</span>
                    <span>📅 Dia ${atividade.dia}</span>
                </div>
                <div class="event-body">
                    <h3 class="event-title-card">${atividade.titulo}</h3>
                    
                    <div class="event-details">
                        <div class="event-detail">
                            <i>📍</i> <span>${atividade.local}</span>
                        </div>
                    </div>
                    
                    <div class="event-time">
                        ⏰ ${atividade.horaInicio} - ${atividade.horaFim}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Renderizar todas as atividades ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    renderizarAtividades(atividades);
});