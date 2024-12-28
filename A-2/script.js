// Custom JavaScript for Medical Landing Page

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#contact form');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent form submission

        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const message = document.querySelector('#message').value;

        // Simple validation
        if (!name || !email || !message) {
            alert('Por favor, completa todos los campos antes de enviar.');
            return;
        }

        // Mock API submission (log to console for now)
        console.log('Formulario enviado:', { name, email, message });

        alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
        form.reset();
    });
});
