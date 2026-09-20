const $ = (sel) => document.querySelector(sel);

document.addEventListener('DOMContentLoaded', () => {
    const formLogin = $('#formLogin');
    if (!formLogin) return;

    function mostrarError(input, texto) {
        if (!input) return;
        input.classList.add('is-invalid');
        
        const contenedor = input.closest('.campo-formulario') || input.parentElement;
        const feedback = contenedor.querySelector('.invalid-feedback');
        
        if (feedback) {
            const spanTexto = feedback.querySelector('.txt-error') || feedback;
            spanTexto.textContent = texto;
        }
    }

    function limpiarError(input) {
        if (!input) return;
        input.classList.remove('is-invalid');
        
        const contenedor = input.closest('.campo-formulario') || input.parentElement;
        const feedback = contenedor.querySelector('.invalid-feedback');
        
        if (feedback) {
            const spanTexto = feedback.querySelector('.txt-error');
            if (spanTexto) spanTexto.textContent = '';
        }
    }

    function validarObligatorio(input, texto) {
        if (!input) return false;
        if (input.value.trim() === '') {
            mostrarError(input, texto);
            return false;
        }
        limpiarError(input);
        return true;
    }

    const btnMostrarPassword = $('#btnMostrarPassword');
    if (btnMostrarPassword) {
        btnMostrarPassword.addEventListener('click', () => {
            const input = $('#password');
            const icono = $('#iconoPassword');
            const texto = $('#textoMostrarPassword');
            const oculta = input.type === 'password';

            input.type = oculta ? 'text' : 'password';
            texto.innerHTML = oculta ? 'Ocultar' : 'Mostrar';
            icono.className = oculta ? 'bi bi-eye-slash' : 'bi bi-eye';
            btnMostrarPassword.setAttribute('aria-pressed', String(oculta));
        });
    }

    ['#usuario', '#password'].forEach((sel) => {
        const el = $(sel);
        if (el) {
            el.addEventListener('input', () => limpiarError(el));
        }
    });

    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();

        const okUsuario = validarObligatorio($('#usuario'), 'Ingrese su usuario o correo.');
        const okPassword = validarObligatorio($('#password'), 'Ingrese su contraseña.');

        if (okUsuario && okPassword) {
            alert('¡Formulario válido! Simulación de inicio de sesión exitosa en KRONOFIT.');
            formLogin.reset();
        }
    });
});
