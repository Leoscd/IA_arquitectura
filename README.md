# IA en Arquitectura - Landing Page

Esta es la landing page del programa "IA en Arquitectura: Transformando Flujos de Trabajo Profesionales" creada por Leo Díaz.

## Características del Programa

- **Duración:** 10 encuentros en 6 semanas de curso
- **Modalidad:** Programa intensivo de implementación práctica  
- **Enfoque:** Casos personalizados en los últimos encuentros
- **Garantía:** Seguimiento hasta optimizar 10+ horas semanales

## Estructura del Proyecto

```
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript interactivo
└── README.md           # Este archivo
```

## Características

- **Diseño responsive**: Funciona perfectamente en móviles y desktop
- **Formulario interactivo**: Captura leads con validación completa
- **Integración con Google Forms**: Para almacenar respuestas automáticamente
- **Conexión con Calendly**: Redirección automática para agendar citas
- **Animaciones suaves**: Elementos que aparecen al hacer scroll
- **SEO optimizado**: Meta tags y estructura semántica

## Configuración de Google Forms

### Formulario ya creado

Ya tienes tu formulario creado en:
https://docs.google.com/forms/d/e/1FAIpQLSeEl_9jKh2D6Lz5mvk6rT44kdIkQfePY7xMrMbwyYBGecxezQ/viewform

### Paso 1: Obtener los Entry IDs

1. Abre tu formulario: https://docs.google.com/forms/d/e/1FAIpQLSeEl_9jKh2D6Lz5mvk6rT44kdIkQfePY7xMrMbwyYBGecxezQ/viewform
2. Haz clic derecho → "Inspeccionar elemento" (F12)
3. Ve a la pestaña "Elements" o "Elementos"
4. Busca cada campo de input y copia el atributo `name` que contiene "entry."

**Campos que necesitas encontrar:**
- Nombre completo
- Email  
- Teléfono
- Experiencia con IA
- Situación laboral
- Mayor desafío
- Objetivo con IA

**Ejemplo de cómo se ve:**
```html
<input type="text" name="entry.123456789" ...>
```

### Paso 2: Configurar el JavaScript

En el archivo `script.js`, actualiza la configuración con los entry IDs reales:

```javascript
const GOOGLE_FORM_CONFIG = {
    formURL: 'https://docs.google.com/forms/d/e/1FAIpQLSeEl_9jKh2D6Lz5mvk6rT44kdIkQfePY7xMrMbwyYBGecxezQ/formResponse',
    fields: {
        nombre: 'entry.TU_ENTRY_ID_NOMBRE',        // Reemplazar
        email: 'entry.TU_ENTRY_ID_EMAIL',          // Reemplazar
        telefono: 'entry.TU_ENTRY_ID_TELEFONO',    // Reemplazar
        experiencia: 'entry.TU_ENTRY_ID_EXPERIENCIA', // Reemplazar
        situacion: 'entry.TU_ENTRY_ID_SITUACION',  // Reemplazar
        mayorDesafio: 'entry.TU_ENTRY_ID_DESAFIO', // Reemplazar
        objetivo: 'entry.TU_ENTRY_ID_OBJETIVO'     // Reemplazar
    }
};
```

### Paso 3: Activar el envío real

Descomenta el código marcado en `script.js` en la función `sendToGoogleForms()` y comenta la parte temporal.

## Hostear en GitHub Pages

### Opción 1: Desde GitHub.com

1. Sube todos los archivos a un repositorio en GitHub
2. Ve a Settings → Pages
3. Selecciona "Deploy from a branch"
4. Elige "main" y "/ (root)"
5. Tu sitio estará en: `https://tuusuario.github.io/nombre-repositorio`

### Opción 2: Desde línea de comandos

```bash
# Navegar a la carpeta del proyecto
cd "D:\Soy Leo\IA en arquitectura"

# Inicializar repositorio Git
git init

# Agregar archivos
git add .

# Hacer commit
git commit -m "Primera versión de la landing page"

# Conectar con repositorio remoto
git remote add origin https://github.com/tuusuario/ia-arquitectura.git

# Subir archivos
git push -u origin main
```

## Personalización

### Colores principales
- Azul principal: `#2c5282`
- Azul secundario: `#2d3748`
- Rojo CTA: `#e53e3e`
- Gris texto: `#4a5568`

### Modificar contenido
- **Hero section**: Edita el archivo `index.html` en la sección `<section class="hero">`
- **Módulos**: Modifica la sección `<div class="modules">` 
- **Formulario**: Ajusta campos en la sección `<form id="contactForm">`

### Agregar tracking
Para Google Analytics, agrega antes de `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Testing Local

Para probar localmente, puedes usar:

1. **Live Server** (extensión de VS Code)
2. **Python simple server**:
   ```bash
   cd "D:\Soy Leo\IA en arquitectura"
   python -m http.server 8000
   ```
3. **Node.js http-server**:
   ```bash
   npx http-server
   ```

## Funciones de Debug

En la consola del navegador puedes usar:

```javascript
// Ver leads guardados temporalmente
showStoredData()

// Limpiar datos guardados
clearStoredData()
```

## Contacto

Leo Díaz  
Email: soyleo.ai.arq@gmail.com  
LinkedIn: www.linkedin.com/in/leo-iml  
Instagram: @soy.leo_ai  

## Licencia

Proyecto privado - Todos los derechos reservados © 2024 Leo Díaz