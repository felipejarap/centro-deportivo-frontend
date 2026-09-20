const $ = (sel) => document.querySelector(sel);

document.addEventListener('DOMContentLoaded', () => {
    const formUsuario = $('#formUsuario');
    if (!formUsuario) return;

    const REGEX_NOMBRE = /^[A-Za-zÁÉÍÓÚÑáéíóúñÜü]+(\s[A-Za-zÁÉÍÓÚÑáéíóúñÜü]+)+$/;

    function rutValido(rut) {
        const regexRut = /^\d{7,8}-[\dkK]$/;
        return regexRut.test(rut);
    }

    function correoValido(correo) {
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexCorreo.test(correo);
    }

    /* Enciende el error agregando .is-invalid y escribiendo en el span */
    function mostrarError(input, texto) {
        if (!input) return;
        input.classList.add('is-invalid');
        const feedback = input.nextElementSibling;
        if (feedback && feedback.classList.contains('invalid-feedback')) {
            const spanTexto = feedback.querySelector('.txt-error') || feedback;
            spanTexto.textContent = texto;
        }
    }

    /* Apaga el error quitando .is-invalid */
    function limpiarError(input) {
        if (!input) return;
        input.classList.remove('is-invalid');
        const feedback = input.nextElementSibling;
        if (feedback) {
            const spanTexto = feedback.querySelector('.txt-error');
            if (spanTexto) spanTexto.textContent = '';
        }
    }

    function validarObligatorio(input) {
        if (!input) return false;
        if (input.value.trim() === '') {
            mostrarError(input, 'Este campo es obligatorio.');
            return false;
        }
        limpiarError(input);
        return true;
    }

    /* Enlazar limpieza en tiempo real mientras el usuario escribe */
    $('#nombres').addEventListener('input', () => limpiarError($('#nombres')));
    $('#apellidos').addEventListener('input', () => limpiarError($('#apellidos')));
    $('#edad').addEventListener('input', () => limpiarError($('#edad')));
    $('#fechaNacimiento').addEventListener('input', () => limpiarError($('#fechaNacimiento')));
    $('#rut').addEventListener('input', () => limpiarError($('#rut')));
    $('#correo').addEventListener('input', () => limpiarError($('#correo')));

    /* Evento de Envío */
    formUsuario.addEventListener('submit', (e) => {
        e.preventDefault();

        const okNombres = validarObligatorio($('#nombres'));
        const okApellidos = validarObligatorio($('#apellidos'));
        const okEdad = validarObligatorio($('#edad'));
        const okFecha = validarObligatorio($('#fechaNacimiento'));
        const okRut = validarObligatorio($('#rut'));
        const okCorreo = validarObligatorio($('#correo'));

        let formatosCorrectos = true;

        if (okNombres && !REGEX_NOMBRE.test($('#nombres').value.trim())) {
            mostrarError($('#nombres'), 'Solo letras, mínimo dos palabras (ej: Eduardo Urquieta).');
            formatosCorrectos = false;
        }

        if (okApellidos && !REGEX_NOMBRE.test($('#apellidos').value.trim())) {
            mostrarError($('#apellidos'), 'Solo letras, mínimo dos palabras (ej: Urquieta Silva).');
            formatosCorrectos = false;
        }

        if (okEdad) {
            const edadNum = Number($('#edad').value.trim());
            if (isNaN(edadNum) || edadNum < 1 || edadNum > 120) {
                mostrarError($('#edad'), 'Ingrese una edad válida (1 - 120).');
                formatosCorrectos = false;
            }
        }

        if (okFecha) {
            const fechaIngresada = new Date($('#fechaNacimiento').value + 'T00:00:00');
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);
            if (fechaIngresada > hoy) {
                mostrarError($('#fechaNacimiento'), 'La fecha no puede ser posterior a hoy.');
                formatosCorrectos = false;
            }
        }

        if (okRut && !rutValido($('#rut').value.trim())) {
            mostrarError($('#rut'), 'Formato inválido (ej: 12345678-9).');
            formatosCorrectos = false;
        }

        if (okCorreo && !correoValido($('#correo').value.trim())) {
            mostrarError($('#correo'), 'Ingrese un correo electrónico válido.');
            formatosCorrectos = false;
        }

        const esFormularioValido = okNombres && okApellidos && okEdad && okFecha && okRut && okCorreo && formatosCorrectos;

        if (esFormularioValido) {
            alert('¡Registro de usuario exitoso en KRONOFIT!');
            formUsuario.reset();
        }
    });
});
