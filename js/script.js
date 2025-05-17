// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Toggle para el menú móvil
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Cambiar estilo de navegación al hacer scroll
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.classList.add('bg-white', 'shadow-md');
            nav.classList.remove('bg-transparent');
        } else {
            nav.classList.add('bg-white');
        }
    });
    
    // Animación para el fondo del hero
    const heroBackground = document.getElementById('hero-background');
    if (heroBackground) {
        // Aplicar clase para la animación de gradiente desde JavaScript
        heroBackground.style.background = 'linear-gradient(45deg, #3490dc, #38b2ac)';
        heroBackground.style.backgroundSize = '400% 400%';
        heroBackground.style.animation = 'gradientAnimation 15s ease infinite';
    }
    
    // Definir la animación de gradiente usando una hoja de estilo dinámica
    const style = document.createElement('style');
    style.textContent = `
        @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
    `;
    document.head.appendChild(style);
    
    // Añadir efecto hover a los títulos h2 de secciones
    const sectionTitles = document.querySelectorAll('section h2');
    sectionTitles.forEach(title => {
        title.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            const span = this.querySelector('span');
            if (span) {
                span.style.width = '40px';
            }
        });
        
        title.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            const span = this.querySelector('span');
            if (span) {
                span.style.width = '24px';
            }
        });
    });
    
    // Efecto hover para tarjetas de tratamiento
    const treatmentCards = document.querySelectorAll('.treatment-card');
    treatmentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Animaciones de entrada para elementos cuando son visibles
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-5');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Seleccionar todos los elementos que queremos animar
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        element.classList.add('opacity-0', 'translate-y-5', 'transition-all', 'duration-500', 'ease-in-out');
        observer.observe(element);
    });
    
    // Añadir clase fade-in a elementos específicos
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const heading = section.querySelector('h2');
        if (heading) {
            heading.classList.add('fade-in');
        }
        
        const content = section.querySelectorAll('.fade-in-element');
        content.forEach(el => {
            el.classList.add('fade-in');
        });
    });
    
    // Smooth scroll para enlaces internos usando clases de Tailwind
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajuste para la navegación fija
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil si está abierto
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
}); 