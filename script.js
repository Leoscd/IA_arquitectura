// Variables globales
let isSubmitting = false;

// Configuración para envío a Google Forms
const GOOGLE_FORM_CONFIG = {
    // URL actualizada del formulario de Google
    formURL: 'https://docs.google.com/forms/d/e/1FAIpQLSeEl_9jKh2D6Lz5mvk6rT44kdIkQfePY7xMrMbwyYBGecxezQ/formResponse',
    fields: {
        // NOTA: Estos entry IDs deben ser actualizados inspeccionando el formulario real
        // Ve al README.md para instrucciones detalladas
        nombre: 'entry.123456789',      // Actualizar con entry ID real
        email: 'entry.987654321',       // Actualizar con entry ID real
        telefono: 'entry.555666777',    // Actualizar con entry ID real
        experiencia: 'entry.111222333', // Actualizar con entry ID real
        situacion: 'entry.444555666',   // Actualizar con entry ID real
        mayorDesafio: 'entry.777888999', // Actualizar con entry ID real
        objetivo: 'entry.000111222'     // Actualizar con entry ID real
    }
};

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initializeSmoothScrolling();
    initializeAnimations();
    initializeFAQ();
});

// Función para inicializar el formulario
function initializeForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}

// Función para manejar el envío del formulario
async function handleFormSubmit(event) {
    event.preventDefault();
    
    if (isSubmitting) return;
    
    const form = event.target;
    const submitButton = form.querySelector('.submit-button');
    const formData = new FormData(form);
    
    // Validar formulario
    if (!validateForm(formData)) {
        return;
    }
    
    // Cambiar estado del botón
    isSubmitting = true;
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    try {
        // Enviar a Google Forms
        await sendToGoogleForms(formData);
        
        // Mostrar mensaje de éxito
        showSuccessMessage();
        
        // Limpiar formulario
        form.reset();
        
        // Opcional: redirigir a Calendly después de un breve delay
        setTimeout(() => {
            window.open('https://calendly.com/leodiazdt/30min', '_blank');
        }, 2000);
        
    } catch (error) {
        console.error('Error al enviar formulario:', error);
        showErrorMessage();
    } finally {
        // Restaurar botón
        isSubmitting = false;
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    }
}

// Función para validar el formulario
function validateForm(formData) {
    const requiredFields = ['nombre', 'email', 'experiencia', 'situacion', 'mayor-desafio', 'objetivo'];
    const errors = [];
    
    // Validar campos requeridos
    requiredFields.forEach(field => {
        const value = formData.get(field);
        if (!value || value.trim() === '') {
            errors.push(`El campo ${field} es requerido`);
        }
    });
    
    // Validar email
    const email = formData.get('email');
    if (email && !isValidEmail(email)) {
        errors.push('El email no tiene un formato válido');
    }
    
    if (errors.length > 0) {
        showValidationErrors(errors);
        return false;
    }
    
    return true;
}

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para enviar datos a Google Forms
async function sendToGoogleForms(formData) {
    // TEMPORAL: Por ahora guardamos en localStorage hasta que configures Google Forms
    const data = {
        nombre: formData.get('nombre'),
        email: formData.get('email'),
        telefono: formData.get('telefono'),
        experiencia: formData.get('experiencia'),
        situacion: formData.get('situacion'),
        mayorDesafio: formData.get('mayor-desafio'),
        objetivo: formData.get('objetivo'),
        timestamp: new Date().toISOString()
    };
    
    // Guardar temporalmente en localStorage
    const existingData = JSON.parse(localStorage.getItem('ia-arquitectura-leads') || '[]');
    existingData.push(data);
    localStorage.setItem('ia-arquitectura-leads', JSON.stringify(existingData));
    
    // Simular delay de envío
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    /* 
    // CÓDIGO PARA CUANDO TENGAS GOOGLE FORMS CONFIGURADO:
    
    const formData = new URLSearchParams();
    formData.append(GOOGLE_FORM_CONFIG.fields.nombre, data.nombre);
    formData.append(GOOGLE_FORM_CONFIG.fields.email, data.email);
    formData.append(GOOGLE_FORM_CONFIG.fields.telefono, data.telefono);
    formData.append(GOOGLE_FORM_CONFIG.fields.experiencia, data.experiencia);
    formData.append(GOOGLE_FORM_CONFIG.fields.situacion, data.situacion);
    formData.append(GOOGLE_FORM_CONFIG.fields.mayorDesafio, data.mayorDesafio);
    formData.append(GOOGLE_FORM_CONFIG.fields.objetivo, data.objetivo);
    
    const response = await fetch(GOOGLE_FORM_CONFIG.formURL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
    });
    */
}

// Función para mostrar errores de validación
function showValidationErrors(errors) {
    const errorHtml = errors.map(error => `<li>${error}</li>`).join('');
    showMessage(`
        <div class="error-message">
            <h4>Por favor corrige los siguientes errores:</h4>
            <ul>${errorHtml}</ul>
        </div>
    `, 'error');
}

// Función para mostrar mensaje de éxito
function showSuccessMessage() {
    showMessage(`
        <div class="success-message">
            <h4>¡Información enviada correctamente!</h4>
            <p>Recibirás un email de confirmación pronto. Te redirigiremos a Calendly para agendar tu consulta.</p>
        </div>
    `, 'success');
}

// Función para mostrar mensaje de error
function showErrorMessage() {
    showMessage(`
        <div class="error-message">
            <h4>Error al enviar la información</h4>
            <p>Por favor intenta nuevamente o contáctanos directamente por WhatsApp o email.</p>
        </div>
    `, 'error');
}

// Función general para mostrar mensajes
function showMessage(html, type) {
    // Remover mensaje anterior si existe
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Crear nuevo mensaje
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.innerHTML = html;
    
    // Insertar antes del formulario
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(messageDiv, form);
    
    // Scroll al mensaje
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Auto-remover después de 10 segundos para mensajes de error
    if (type === 'error') {
        setTimeout(() => {
            messageDiv.remove();
        }, 10000);
    }
}

// Función para inicializar FAQ interactivo
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Cerrar otros items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle del item actual
            item.classList.toggle('active');
        });
    });
}

// Función para inicializar scroll suave
function initializeSmoothScrolling() {
    // Manejar clicks en enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Función para inicializar animaciones
function initializeAnimations() {
    // Intersection Observer para animaciones al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos que queremos animar
    document.querySelectorAll('.benefit, .module, .testimonial').forEach(el => {
        observer.observe(el);
    });
}

// Función para mostrar datos guardados (solo para testing)
function showStoredData() {
    const data = JSON.parse(localStorage.getItem('ia-arquitectura-leads') || '[]');
    console.log('Leads guardados:', data);
    return data;
}

// Función para limpiar datos guardados (solo para testing)
function clearStoredData() {
    localStorage.removeItem('ia-arquitectura-leads');
    console.log('Datos limpiados');
}

// Estilos CSS para los mensajes (se insertan dinámicamente)
const messageStyles = `
<style>
.form-message {
    margin-bottom: 30px;
    padding: 20px;
    border-radius: 10px;
    animation: slideIn 0.3s ease-out;
}

.form-message.success {
    background: #f0fff4;
    border: 2px solid #68d391;
    color: #22543d;
}

.form-message.error {
    background: #fed7d7;
    border: 2px solid #fc8181;
    color: #742a2a;
}

.form-message h4 {
    margin-bottom: 10px;
    font-weight: 600;
}

.form-message ul {
    margin-left: 20px;
}

.form-message li {
    margin-bottom: 5px;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Animaciones para elementos que aparecen al hacer scroll */
.benefit, .module, .testimonial {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease-out;
}

.benefit.animate-in, .module.animate-in, .testimonial.animate-in {
    opacity: 1;
    transform: translateY(0);
}
</style>
`;

// Insertar estilos al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    document.head.insertAdjacentHTML('beforeend', messageStyles);
});
