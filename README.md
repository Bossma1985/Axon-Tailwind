# Axón Fisioterapia - Sitio Web

Este es un sitio web minimalista para la clínica de fisioterapia Axón, desarrollado con HTML, Tailwind CSS y JavaScript.

## Estructura del Proyecto

```
axon-fisioterapia/
│
├── css/
│   └── styles.css       # Estilos personalizados
│
├── js/
│   └── script.js        # Funcionalidades JavaScript
│
├── img/
│   └── tratamientos/    # Imágenes de los tratamientos
│
├── videos/              # Carpeta para videos de testimonios
│
├── tratamientos/        # Páginas individuales de cada tratamiento
│   ├── fisioterapia-deportiva.html
│   ├── osteopatia.html
│   ├── ...
│   └── plantilla-tratamiento.html  # Plantilla para crear nuevos tratamientos
│
└── index.html           # Página principal
```

## Características

- Diseño responsive adaptado a dispositivos móviles y de escritorio
- Menú de navegación con scroll suave
- Hero con fondo dinámico animado
- Secciones para información sobre la clínica
- Sección de tratamientos organizados por categorías
- Páginas individuales detalladas para cada tratamiento
- Sección de testimonios en video
- Información de contacto completa

## Requisitos para Personalización

1. Reemplazar las imágenes de ejemplo:
   - Logo: `img/logo.png`
   - Imagen de la clínica: `img/clinica.jpg`
   - Imágenes de tratamientos: `img/tratamientos/nombre-tratamiento.jpg`

2. Añadir videos de testimonios reales en la carpeta `videos/` y actualizar las referencias en el HTML.

3. Personalizar las páginas individuales de tratamientos:
   - Utilizar la plantilla `tratamientos/plantilla-tratamiento.html` como base
   - Modificar el contenido con información específica de cada tratamiento
   - Actualizar los enlaces a tratamientos relacionados en la barra lateral

4. Actualizar la información de contacto en el footer con los datos reales de la clínica.

## Tecnologías Utilizadas

- HTML5
- Tailwind CSS (desde CDN)
- JavaScript vanilla (sin frameworks)

## Cómo Usar

Simplemente abre el archivo `index.html` en tu navegador para ver el sitio web. Para realizar cambios, edita los archivos correspondientes usando un editor de código como Visual Studio Code.

## Cómo Añadir Nuevos Tratamientos

1. Duplica el archivo `tratamientos/plantilla-tratamiento.html` y renómbralo según el nuevo tratamiento (ej: `nuevo-tratamiento.html`)
2. Edita el contenido con la información específica del nuevo tratamiento
3. Añade una imagen representativa en `img/tratamientos/`
4. Actualiza el enlace en la sección de tratamientos de `index.html` 