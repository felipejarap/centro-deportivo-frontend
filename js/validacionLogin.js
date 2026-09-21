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
            // Fuerza la visibilidad en rojo ignorando las reglas estrictas de Bootstrap
            feedback.style.setProperty('display', 'block', 'important');
        }
    }

    function limpiarError(input) {
        if (!input) return;
        input.classList.remove('is-invalid');
        
        const contenedor = input.closest('.campo-formulario') || input.parentElement;
        const feedback = contenedor.querySelector('.invalid-feedback');
        
        if (feedback) {
            const spanTexto = feedback.querySelector('.txt-error') || feedback;
            if (spanTexto) spanTexto.textContent = '';
            feedback.style.display = 'none';
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
            if (!input) return;
            
            const oculta = input.type === 'password';
            input.type = oculta ? 'text' : 'password';
            if (icono) icono.className = oculta ? 'bi bi-eye-slash' : 'bi bi-eye';
        });
    }

    if ($('#usuario')) {
        $('#usuario').addEventListener('input', () => {
            limpiarError($('#usuario'));
            if ($('#errorGeneral')) $('#errorGeneral').classList.add('d-none');
        });
    }
    
    if ($('#password')) {
        $('#password').addEventListener('input', () => {
            limpiarError($('#password'));
            if ($('#errorGeneral')) $('#errorGeneral').classList.add('d-none');
        });
    }

  
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Validar que los campos no se envíen vacíos
        const okUsuario = validarObligatorio($('#usuario'), 'Ingrese su usuario o correo.');
        const okPassword = validarObligatorio($('#password'), 'Ingrese su contraseña.');

        // 2. Si ambos campos contienen texto escrito, evaluamos los valores de simulación
        if (okUsuario && okPassword) {
            const usuarioIngresado = $('#usuario').value.trim().toLowerCase();
            const passwordIngresada = $('#password').value.trim();

            const USUARIO_VALIDO = "admin";
            const PASSWORD_VALIDO = "1234";

            if (usuarioIngresado === USUARIO_VALIDO && passwordIngresada === PASSWORD_VALIDO) {
                // ÉXITO: Saneamos el diseño antes de lanzar la alerta
                if ($('#errorGeneral')) $('#errorGeneral').classList.add('d-none');
                limpiarError($('#usuario'));
                limpiarError($('#password'));
                
                // DISPARADOR DE ÉXITO FUNCIONANDO
                alert('¡Formulario válido! Simulación de inicio de sesión exitosa en KRONOFIT.');
                formLogin.reset();
            } else {
                // CREDENCIALES INCORRECTAS: Forzamos el color ROJO en inputs y alerta superior
                mostrarError($('#usuario'), 'Usuario incorrecto.');
                mostrarError($('#password'), 'Contraseña incorrecta.');
                
                const errorGeneral = $('#errorGeneral');
                if (errorGeneral) {
                    errorGeneral.textContent = 'El usuario o la contraseña son incorrectos. Prueba con admin y 1234.';
                    errorGeneral.classList.remove('d-none');
                }
            }
        }
    });
});
