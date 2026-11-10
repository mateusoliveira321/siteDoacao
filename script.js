/* ==========================================================================
   LÓGICA DE NAVEGAÇÃO E EVENTOS - HELPER'S
   ========================================================================== */

/**
 * Função para alternar visibilidade entre as telas (SPA)
 * @param {string} screenId - ID da tela de destino (sem o prefixo 'screen-')
 */
function navigateTo(screenId) {
    // Esconde todas as telas
    const screens = document.querySelectorAll('.app-screen');
    screens.forEach(screen => screen.classList.add('d-none'));

    // Mostra a tela selecionada
    const targetScreen = document.getElementById(`screen-${screenId}`);
    if (targetScreen) {
        targetScreen.classList.remove('d-none');
    }

    // Atualiza estado ativo dos botões do Navbar
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => btn.classList.remove('active'));

    const activeNav = document.getElementById(`nav-${screenId}`);
    if (activeNav) {
        activeNav.classList.add('active');
    }

    // Rola para o topo suavemente ao mudar de tela
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Handler genérico para submissão de formulários
 * @param {Event} event - Evento de formulário
 * @param {string} successMessage - Mensagem exibida em alerta
 */
function handleFormSubmit(event, successMessage) {
    event.preventDefault();
    alert(successMessage);
    // Retorna para o início ou limpa o formulário se desejado
    navigateTo('inicio');
}