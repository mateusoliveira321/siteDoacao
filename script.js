/* ==========================================================================
   LÓGICA DE NAVEGAÇÃO E EVENTOS - HELPER'S
   ========================================================================== */

/**
 * Alterna a visibilidade entre as telas (SPA) e fecha o menu hambúrguer no mobile
 * @param {string} screenId - ID da tela de destino (sem o prefixo 'screen-')
 */
function navigateTo(screenId) {
    const screens = document.querySelectorAll('.app-screen');
    screens.forEach(screen => screen.classList.add('d-none'));

    const targetScreen = document.getElementById(`screen-${screenId}`);
    if (targetScreen) {
        targetScreen.classList.remove('d-none');
    }

    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => btn.classList.remove('active'));

    // Mantém a aba "Doações" ativa nas subtelas de fluxo de doação
    const donationSubScreens = ['registrar-doacao', 'solicitar-doacao', 'status-doacao', 'selecionar-itens'];
    const navKey = donationSubScreens.includes(screenId) ? 'doacoes' : screenId;

    const activeNav = document.getElementById(`nav-${navKey}`);
    if (activeNav) {
        activeNav.classList.add('active');
    }

    // Fecha o menu hambúrguer automaticamente em telas móveis ao clicar em um item
    const navbarCollapse = document.getElementById('mainNavbarMenu');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse, { toggle: false });
        bsCollapse.hide();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Exibe notificações visuais utilizando as cores de suporte do Guia de Estilo
 * @param {string} message - Texto da notificação
 * @param {'success'|'loading'|'error'} type - Tipo de feedback
 */
function showToast(message, type = 'success') {
    const toast = document.getElementById('feedback-toast');
    const toastMsg = document.getElementById('toast-message');
    const toastIcon = document.getElementById('toast-icon');

    toast.className = 'custom-toast';

    if (type === 'success') {
        toast.classList.add('toast-success');
        toastIcon.className = 'fa-solid fa-circle-check me-2';
    } else if (type === 'loading') {
        toast.classList.add('toast-loading');
        toastIcon.className = 'fa-solid fa-spinner fa-spin me-2';
    } else if (type === 'error') {
        toast.classList.add('toast-error');
        toastIcon.className = 'fa-solid fa-circle-exclamation me-2';
    }

    toastMsg.textContent = message;
    toast.classList.remove('d-none');

    setTimeout(() => {
        toast.classList.add('d-none');
    }, 3500);
}

/**
 * Handler genérico para submissão de formulários
 * @param {Event} event - Evento de formulário
 * @param {string} successMessage - Mensagem exibida no toast
 */
function handleFormSubmit(event, successMessage) {
    event.preventDefault();
    showToast(successMessage, 'success');
    event.target.reset();
    navigateTo('inicio');
}