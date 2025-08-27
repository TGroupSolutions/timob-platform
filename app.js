// Ecossistema T - Base JavaScript
console.log("🚀 Aplicação Ecossistema T carregada!");

// Configurações globais
const CONFIG = {
    emailTarget: 'vanessa@tgroupsolutions.com',
    apiBase: 'https://api.tgroupsolutions.com',
    platforms: {
        tbank: 'https://tbank.tgroupsolutions.tech',
        timob: 'https://timob.tgroupsolutions.tech', 
        tconstru: 'https://tconstru.tgroupsolutions.tech',
        homet: 'https://homet.tgroupsolutions.tech',
        tgrowth: 'https://tgrowth.tgroupsolutions.tech',
        dashboard: 'https://tgroupsolutions.tech'
    }
};

// Inicialização quando DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initSmoothScroll();
    initForms();
    initAnimations();
    initPlatformIntegration();
    console.log("✅ Todos os módulos inicializados");
});

// Menu Mobile
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');

    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('mobile-active');
            this.classList.toggle('active');

            // Animar hamburger
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '1';
                });
            }
        });
    }
}

// Scroll suave
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Gerenciamento de formulários
function initForms() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
}

async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Adicionar informações da plataforma
    data.platform = document.title.split(' - ')[0] || 'Ecossistema T';
    data.timestamp = new Date().toISOString();
    data.userAgent = navigator.userAgent;

    // Mostrar loading
    const submitBtn = form.querySelector('[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
        // Simular envio (substituir por integração real)
        await simulateFormSubmission(data);

        // Sucesso
        showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        form.reset();

        // Rastrear evento
        trackEvent('Form', 'Submit', data.platform);

    } catch (error) {
        console.error('Erro ao enviar formulário:', error);
        showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
    } finally {
        // Restaurar botão
        submitBtn.textContent = originalText;
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
}

// Simular envio de formulário (substituir por integração real)
async function simulateFormSubmission(data) {
    // Em produção, integrar com:
    // - Formspree
    // - Netlify Forms  
    // - EmailJS
    // - API própria

    console.log('📧 Formulário seria enviado para:', CONFIG.emailTarget);
    console.log('📊 Dados do formulário:', data);

    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Salvar no localStorage como backup
    const submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
    submissions.push(data);
    localStorage.setItem('formSubmissions', JSON.stringify(submissions.slice(-10))); // Manter apenas os últimos 10

    return { success: true, id: Date.now() };
}

// Sistema de notificações
function showNotification(message, type = 'info') {
    // Remover notificação existente
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__message">${message}</span>
            <button class="notification__close">&times;</button>
        </div>
    `;

    // Estilos inline para garantir funcionamento
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#00FF41' : type === 'error' ? '#FF4444' : '#333'};
        color: ${type === 'success' ? '#000' : '#fff'};
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Auto-remover após 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);

    // Botão fechar
    notification.querySelector('.notification__close').addEventListener('click', () => {
        notification.remove();
    });
}

// Animações na rolagem
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observar elementos
    document.querySelectorAll('.service-card, .hero__content > *, .section-header').forEach(el => {
        observer.observe(el);
    });
}

// Integração entre plataformas
function initPlatformIntegration() {
    // Dados do usuário (simulado)
    const userData = {
        hasAccount: false,
        platforms: [],
        lastVisit: localStorage.getItem('lastVisit'),
        visitCount: parseInt(localStorage.getItem('visitCount') || '0') + 1
    };

    // Atualizar dados da visita
    localStorage.setItem('lastVisit', new Date().toISOString());
    localStorage.setItem('visitCount', userData.visitCount.toString());

    // Mostrar banner de boas-vindas para novos usuários
    if (userData.visitCount === 1) {
        showWelcomeBanner();
    }

    // Verificar se veio de outra plataforma do ecossistema
    const referrer = document.referrer;
    Object.values(CONFIG.platforms).forEach(platformUrl => {
        if (referrer.includes(platformUrl.replace('https://', ''))) {
            trackEvent('Navigation', 'Cross Platform', referrer);
        }
    });
}

// Banner de boas-vindas
function showWelcomeBanner() {
    const banner = document.createElement('div');
    banner.className = 'welcome-banner';
    banner.innerHTML = `
        <div class="welcome-banner__content">
            <h3>Bem-vindo ao Ecossistema T! 🚀</h3>
            <p>Explore nossas 5 plataformas integradas para otimizar seus resultados.</p>
            <button class="btn btn--outline btn--small" onclick="this.parentElement.parentElement.remove()">Fechar</button>
        </div>
    `;

    banner.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: rgba(0, 255, 65, 0.9);
        color: #000;
        padding: 1rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 255, 65, 0.3);
        z-index: 9999;
        max-width: 350px;
        animation: slideInLeft 0.5s ease;
    `;

    document.body.appendChild(banner);

    // Auto-remover após 10 segundos
    setTimeout(() => {
        if (banner.parentNode) {
            banner.style.animation = 'slideOutLeft 0.5s ease';
            setTimeout(() => banner.remove(), 500);
        }
    }, 10000);
}

// Rastreamento de eventos
function trackEvent(category, action, label) {
    // Integrar com Google Analytics, Mixpanel, etc.
    console.log('📊 Evento rastreado:', { category, action, label });

    // Se Google Analytics estiver configurado
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label,
            value: 1
        });
    }
}

// Utilitários
function formatCurrency(value, currency = 'BRL') {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: currency
    }).format(value);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Exportar para uso global
window.EcossistemaT = {
    showNotification,
    trackEvent,
    formatCurrency,
    debounce,
    CONFIG
};

// CSS de animações (adicionar via JavaScript)
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    @keyframes slideInLeft {
        from { transform: translateX(-100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutLeft {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(-100%); opacity: 0; }
    }

    .nav.mobile-active {
        display: flex !important;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.98);
        border: 1px solid #00FF41;
        border-radius: 8px;
        padding: 20px;
        flex-direction: column;
        gap: 16px;
        backdrop-filter: blur(15px);
        z-index: 1001;
        box-shadow: 0 10px 30px rgba(0, 255, 65, 0.3);
    }

    @media (max-width: 768px) {
        .nav {
            display: none;
        }
    }
`;
document.head.appendChild(style);