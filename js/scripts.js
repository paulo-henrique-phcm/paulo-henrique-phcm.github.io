/*!
* Start Bootstrap - Freelancer v7.0.7 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

// function toggleCollapse(elementId) {
//     const element = document.querySelector(elementId);

//     // Alternar a classe 'collapsed' para controlar a transição suave
//     element.classList.toggle('collapsed-itens');
// }



function toggleCollapseInit(elementId, estado_padrao_colapsado = true) {
    const element = document.querySelector(elementId);

    // Verificar se há um estado salvo no localStorage
    const isCollapsed = localStorage.getItem(elementId);
    console.log(isCollapsed)

    // Se o estado armazenado é colapsado (true) entao adiciona a classe
    if (isCollapsed === 'true') {
        element.classList.add('collapsed-itens');
    } else if (isCollapsed === 'false') {
        element.classList.remove('collapsed-itens');
    } else {
        // se não for nenhum, (false ou true) então é nulo, nesse caso vai usar o estado padrão
        if (estado_padrao_colapsado) {
            element.classList.add('collapsed-itens');
            // localStorage.setItem(elementId, 'true');
        } else {
            element.classList.remove('collapsed-itens');
            // localStorage.setItem(elementId, 'false');
        }
    }
}

function openCollapse(elementId) {
    // somente abre o elemento
    const element = document.querySelector(elementId);

    element.classList.remove('collapsed-itens');
    localStorage.setItem(elementId, 'false');
    // Movendo a tela para a seção
    // element.scrollIntoView({ behavior: 'smooth' });
}

function toggleCollapse(elementId) {
    const element = document.querySelector(elementId);

    element.classList.toggle('collapsed-itens');
    const currentState = element.classList.contains('collapsed-itens') ? 'true' : 'false';
    localStorage.setItem(elementId, currentState);
}

// Inicializar a função para o elemento específico quando atualizar a pagina conforme armazenado em localStorage
toggleCollapseInit('#portfolio-conteudo', estado_padrao_colapsado = false);
toggleCollapseInit('#sobre-conteudo');
toggleCollapseInit('#formacao-cursos');
toggleCollapseInit('#habilidades');
toggleCollapseInit('#experiencias');



