// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Toggle para el menú móvil
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');
            menuToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
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
    const sectionTitles = document.querySelectorAll('.h2-section, .h2-treatment, section h2');
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
    
    // Efecto hover para títulos h3
    const h3Titles = document.querySelectorAll('.h3-title');
    h3Titles.forEach(title => {
        title.addEventListener('mouseenter', function() {
            this.classList.add('shadow-md');
            this.style.transform = 'translateY(-1px)';
        });
        
        title.addEventListener('mouseleave', function() {
            this.classList.remove('shadow-md');
            this.style.transform = 'translateY(0)';
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
    
    // Añadir clase fade-in a elementos h3
    const h3Elements = document.querySelectorAll('h3.h3-title');
    h3Elements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
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

    // ------ Código para el carrusel de imágenes ------
    const carouselTrack = document.getElementById('carousel-track');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const carouselIndicators = document.getElementById('carousel-indicators');
    
    // ------ Código para el botón Volver Arriba ------
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        // Mostrar/ocultar el botón según el scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.remove('opacity-0', 'invisible');
                backToTopButton.classList.add('opacity-100');
            } else {
                backToTopButton.classList.remove('opacity-100');
                backToTopButton.classList.add('opacity-0', 'invisible');
            }
        });
        
        // Evento de clic para volver arriba
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    if (carouselTrack && prevButton && nextButton && carouselIndicators) {
        const slides = carouselTrack.children;
        const slideCount = slides.length;
        let currentIndex = 0;
        let slideWidth = 100; // Porcentaje
        let autoSlideInterval;
        let isDragging = false;
        let startPos = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        
        // Aplicar transición más suave con una curva Bezier optimizada
        carouselTrack.style.transition = 'transform 800ms cubic-bezier(0.25, 0.1, 0.25, 1.0)';
        
        // Determinar cuántos slides se muestran a la vez según el ancho de la pantalla
        function getSlidesPerView() {
            if (window.innerWidth >= 1024) {
                return 3; // Desktop: mostrar 3 slides
            } else if (window.innerWidth >= 768) {
                return 2; // Tablet: mostrar 2 slides
            } else {
                return 1; // Mobile: mostrar 1 slide
            }
        }
        
        // Precarga de imágenes para evitar saltos
        function preloadImages() {
            const imageElements = document.querySelectorAll('#carousel-track img');
            
            // Crear un contador para saber cuándo todas las imágenes están cargadas
            let loadedImages = 0;
            const totalImages = imageElements.length;
            
            imageElements.forEach(img => {
                // Si la imagen ya está cargada, incrementar contador
                if (img.complete) {
                    loadedImages++;
                } else {
                    // Establecer dimensiones explícitas si no las tiene
                    if (!img.style.height) {
                        img.style.height = '320px';
                    }
                    
                    // Evento onload para incrementar el contador
                    img.onload = function() {
                        loadedImages++;
                        // Cuando todas las imágenes estén cargadas, habilitar el carrusel
                        if (loadedImages === totalImages) {
                            carouselTrack.style.opacity = '1';
                        }
                    };
                    
                    // Forzar carga en segundo plano
                    const src = img.getAttribute('src');
                    if (src) {
                        const newImg = new Image();
                        newImg.src = src;
                    }
                }
            });
            
            // Si todas las imágenes ya están cargadas (desde caché)
            if (loadedImages === totalImages) {
                carouselTrack.style.opacity = '1';
            }
        }
        
        // Crear indicadores
        function createIndicators() {
            carouselIndicators.innerHTML = '';
            const slidesPerView = getSlidesPerView();
            const indicatorCount = Math.ceil(slideCount / slidesPerView);
            
            for (let i = 0; i < indicatorCount; i++) {
                const indicator = document.createElement('button');
                indicator.classList.add('w-3', 'h-3', 'rounded-full', 'bg-gray-300', 'transition-all', 'duration-300');
                
                // Añadir atributos ARIA para accesibilidad
                indicator.setAttribute('role', 'tab');
                indicator.setAttribute('aria-label', `Ir a grupo de imágenes ${i + 1}`);
                indicator.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
                indicator.setAttribute('tabindex', i === 0 ? '0' : '-1');
                
                if (i === 0) {
                    indicator.classList.add('bg-blue-600');
                }
                
                indicator.addEventListener('click', () => {
                    goToSlide(i * slidesPerView);
                });
                
                carouselIndicators.appendChild(indicator);
            }
        }
        
        // Actualizar indicadores
        function updateIndicators() {
            const slidesPerView = getSlidesPerView();
            const activeIndex = Math.floor(currentIndex / slidesPerView);
            const indicators = carouselIndicators.children;
            
            for (let i = 0; i < indicators.length; i++) {
                if (i === activeIndex) {
                    indicators[i].classList.add('bg-blue-600');
                    indicators[i].classList.remove('bg-gray-300');
                    indicators[i].setAttribute('aria-selected', 'true');
                    indicators[i].setAttribute('tabindex', '0');
                } else {
                    indicators[i].classList.add('bg-gray-300');
                    indicators[i].classList.remove('bg-blue-600');
                    indicators[i].setAttribute('aria-selected', 'false');
                    indicators[i].setAttribute('tabindex', '-1');
                }
            }
        }
        
        // Ir a un slide específico
        function goToSlide(index) {
            const slidesPerView = getSlidesPerView();
            const maxIndex = slideCount - slidesPerView;
            
            if (index < 0) {
                index = 0;
            } else if (index > maxIndex) {
                index = maxIndex;
            }
            
            currentIndex = index;
            const translateX = -currentIndex * (slideWidth / slidesPerView);
            carouselTrack.style.transform = `translateX(${translateX}%)`;
            updateIndicators();
            resetAutoSlide();
        }
        
        // Slide anterior
        function prevSlide() {
            const slidesPerView = getSlidesPerView();
            goToSlide(currentIndex - slidesPerView);
        }
        
        // Slide siguiente
        function nextSlide() {
            const slidesPerView = getSlidesPerView();
            goToSlide(currentIndex + slidesPerView);
        }
        
        // Deslizamiento automático
        function startAutoSlide() {
            clearInterval(autoSlideInterval);
            
            autoSlideInterval = setInterval(() => {
                const slidesPerView = getSlidesPerView();
                const maxIndex = slideCount - slidesPerView;
                
                if (currentIndex >= maxIndex) {
                    goToSlide(0);
                } else {
                    nextSlide();
                }
            }, 5000); // Cambiar cada 5 segundos
        }
        
        // Reiniciar deslizamiento automático
        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }
        
        // Función para manejar eventos táctiles
        function setupTouchEvents() {
            // Evento táctil inicial
            carouselTrack.addEventListener('touchstart', (e) => {
                isDragging = true;
                startPos = e.touches[0].clientX;
                prevTranslate = currentTranslate;
                clearInterval(autoSlideInterval);
            });
            
            // Evento táctil de movimiento
            carouselTrack.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                
                const currentPosition = e.touches[0].clientX;
                const diff = currentPosition - startPos;
                const slidesPerView = getSlidesPerView();
                const containerWidth = carouselTrack.clientWidth;
                const slideWidthPx = containerWidth / slidesPerView;
                
                // Convertir la diferencia en píxeles a porcentaje
                const diffPercentage = (diff / slideWidthPx) * (slideWidth / slidesPerView);
                
                // Calcular nueva posición
                const newTranslate = prevTranslate + diffPercentage;
                
                // Limitar el arrastre
                const maxTranslate = 0;
                const minTranslate = -((slideCount - slidesPerView) * (slideWidth / slidesPerView));
                
                if (newTranslate > maxTranslate) {
                    currentTranslate = maxTranslate * 0.5; // Efecto elástico
                } else if (newTranslate < minTranslate) {
                    currentTranslate = minTranslate + (newTranslate - minTranslate) * 0.5; // Efecto elástico
                } else {
                    currentTranslate = newTranslate;
                }
                
                carouselTrack.style.transform = `translateX(${currentTranslate}%)`;
            });
            
            // Evento táctil final
            carouselTrack.addEventListener('touchend', () => {
                isDragging = false;
                
                const slidesPerView = getSlidesPerView();
                const threshold = slideWidth / slidesPerView / 4; // 25% de un slide
                
                if (Math.abs(currentTranslate - prevTranslate) > threshold) {
                    if (currentTranslate > prevTranslate) {
                        prevSlide();
                    } else {
                        nextSlide();
                    }
                } else {
                    // Volver a la posición original si el movimiento no fue suficiente
                    goToSlide(currentIndex);
                }
                
                startAutoSlide();
            });
        }
        
        // Inicializar el carrusel
        function initCarousel() {
            // Establecer opacidad inicial para evitar parpadeos
            carouselTrack.style.opacity = '0';
            
            // Asegurar que las imágenes estén precargadas
            preloadImages();
            
            const carouselLoader = document.getElementById('carousel-loader');
            if (carouselLoader) {
                carouselLoader.style.display = 'none';
            }
            
            // Inicialización directa sin esperar a que las imágenes se carguen
            createIndicators();
            updateIndicators();
            
            // Ajustar el ancho de los slides según cuántos se muestran
            updateSlideWidths();
            
            setupTouchEvents();
            startAutoSlide();
            
            // Eventos de botones
            prevButton.addEventListener('click', () => {
                prevSlide();
            });
            
            nextButton.addEventListener('click', () => {
                nextSlide();
            });
            
            // Añadir pausa del autocarrusel al pasar el cursor
            const carouselContainer = document.getElementById('carousel-container');
            if (carouselContainer) {
                carouselContainer.addEventListener('mouseenter', () => {
                    clearInterval(autoSlideInterval);
                });
                
                carouselContainer.addEventListener('mouseleave', () => {
                    startAutoSlide();
                });
            }
            
            // Reajustar el carrusel cuando cambia el tamaño de la ventana
            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    const oldSlidesPerView = getSlidesPerView();
                    createIndicators();
                    
                    // Ajustar el ancho de los slides
                    const newSlidesPerView = getSlidesPerView();
                    updateSlideWidths();
                    
                    // Ajustar el índice actual y actualizar la posición
                    if (oldSlidesPerView !== newSlidesPerView) {
                        goToSlide(Math.floor(currentIndex / oldSlidesPerView) * newSlidesPerView);
                    }
                }, 200); // Pequeño retraso para evitar múltiples redimensionamientos
            });
        }
        
        // Función para actualizar el ancho de los slides
        function updateSlideWidths() {
            const slidesPerView = getSlidesPerView();
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.minWidth = `${slideWidth / slidesPerView}%`;
                const img = slides[i].querySelector('img');
                if (img) {
                    // Optimización para renderizado
                    img.style.willChange = 'transform';
                    
                    // Asegurar que la imagen tenga dimensiones definidas
                    if (!img.hasAttribute('width')) {
                        img.setAttribute('width', '400');
                    }
                    if (!img.hasAttribute('height')) {
                        img.setAttribute('height', '320');
                    }
                    
                    // Asegurar que la imagen esté cargada
                    if (!img.complete) {
                        img.classList.add('opacity-50');
                        img.onload = function() {
                            img.classList.remove('opacity-50');
                        };
                    }
                }
            }
        }
        
        // Iniciar el carrusel
        initCarousel();
    }

    // ------ Código para el formulario de contacto ------
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Mostrar mensaje de carga
            formStatus.textContent = 'Enviando mensaje...';
            formStatus.className = 'text-center mt-4 text-blue-300';
            formStatus.classList.remove('hidden');
            
            // Simulamos el envío (en producción se conectaría con un backend real)
            setTimeout(() => {
                // Simulación de respuesta exitosa
                formStatus.textContent = '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo a la mayor brevedad.';
                formStatus.className = 'text-center mt-4 text-green-300 bg-green-900 bg-opacity-40 p-3 rounded-lg';
                
                // Restablecer el formulario
                contactForm.reset();
                
                // Ocultar el mensaje después de un tiempo
                setTimeout(() => {
                    formStatus.classList.add('hidden');
                }, 5000);
                
                // Nota: En un entorno de producción, aquí se haría la llamada a un endpoint de backend
                // para procesar el formulario, por ejemplo mediante fetch() o XMLHttpRequest
            }, 1500);
        });
    }
    
    // ------ Código para la portada del video en la sección "Sobre Nosotros" ------
    const videoThumbnail = document.getElementById('nosotros-video-thumbnail');
    const playButton = document.getElementById('nosotros-play-button');
    const nosotrosVideo = document.getElementById('nosotros-video');
    const videoContainer = document.getElementById('nosotros-video-container');
    
    if (videoThumbnail && playButton && nosotrosVideo && videoContainer) {
        // Asegurarse de que el video está detenido inicialmente
        nosotrosVideo.pause();
        
        // Preparar el video para reproducción
        nosotrosVideo.load();
        
        // Ajustar las dimensiones del contenedor para que coincida con la relación de aspecto del video
        nosotrosVideo.addEventListener('loadedmetadata', () => {
            const videoAspectRatio = nosotrosVideo.videoWidth / nosotrosVideo.videoHeight;
            
            // Aplicar la misma relación de aspecto a la imagen de portada
            if (videoAspectRatio > 0) {
                // Ajustar la altura del contenedor basado en su ancho y la relación de aspecto del video
                const containerWidth = videoContainer.offsetWidth;
                const idealHeight = containerWidth / videoAspectRatio;
                
                // Establecer una altura mínima para el contenedor
                videoContainer.style.height = `${Math.max(idealHeight, 200)}px`;
                
                // Asegurar que la imagen de portada tenga el mismo recorte que el video
                videoThumbnail.style.objectPosition = 'center';
            }
        });
        
        // Función para iniciar la reproducción
        const playVideo = (event) => {
            // Prevenir comportamiento por defecto
            event.preventDefault();
            
            // Asegurarse de que el video está listo para reproducirse
            if (nosotrosVideo.readyState >= 2) {
                startPlayback();
            } else {
                // Si el video no está listo, cargarlo primero
                nosotrosVideo.addEventListener('canplay', startPlayback, { once: true });
                nosotrosVideo.load();
            }
        };
        
        // Función para iniciar la reproducción del video
        const startPlayback = () => {
            // Actualizar los estilos y posiciones
            nosotrosVideo.style.display = 'block';
            nosotrosVideo.style.zIndex = '4';
            nosotrosVideo.style.opacity = '1';
            
            // Ocultar la miniatura y el botón
            videoThumbnail.style.opacity = '0';
            playButton.style.opacity = '0';
            
            // Después de la transición, eliminar completamente la miniatura y el botón
            setTimeout(() => {
                videoThumbnail.style.display = 'none';
                playButton.style.display = 'none';
                
                // Iniciar el video
                try {
                    const playPromise = nosotrosVideo.play();
                    
                    if (playPromise !== undefined) {
                        playPromise.catch(error => {
                            console.error('Error al reproducir el video:', error);
                            resetVideoDisplay();
                        });
                    }
                } catch (error) {
                    console.error('Error al reproducir el video:', error);
                    resetVideoDisplay();
                }
            }, 300);
        };
        
        // Función para restaurar la visualización original en caso de error
        const resetVideoDisplay = () => {
            videoThumbnail.style.opacity = '1';
            videoThumbnail.style.display = 'block';
            playButton.style.opacity = '1';
            playButton.style.display = 'flex';
            nosotrosVideo.style.zIndex = '1';
            nosotrosVideo.pause();
        };
        
        // Manejar errores de video
        nosotrosVideo.addEventListener('error', () => {
            resetVideoDisplay();
            alert('Error al reproducir el video. Por favor, inténtalo de nuevo.');
        });
        
        // Añadir transiciones para un efecto suave
        videoThumbnail.style.transition = 'opacity 0.3s ease';
        playButton.style.transition = 'opacity 0.3s ease';
        nosotrosVideo.style.transition = 'opacity 0.3s ease';
        
        // Añadir listeners de clic
        videoThumbnail.addEventListener('click', playVideo);
        playButton.addEventListener('click', playVideo);
    }
}); 