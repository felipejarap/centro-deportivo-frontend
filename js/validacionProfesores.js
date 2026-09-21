const $ = (sel) => document.querySelector(sel);

document.addEventListener('DOMContentLoaded', () => {
    const formProfesor = $('#formProfesor');
    if (!formProfesor) return;


    function rutValido(rut) {
        const regexRut = /^\d{7,8}-[\dkK]$/;
        return regexRut.test(rut);
    }


    function correoValido(correo) {
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexCorreo.test(correo);
    }

    function telefonoValido(telefono) {
        const regexTelefono = /^(\+?56)?(\s?)(9\d{8})$/;
        return regexTelefono.test(telefono);
    }

    function esMayorDeEdad(fechaNacimiento) {
        if (!fechaNacimiento) return false;
        const fechaNac = new Date(fechaNacimiento);
        const hoy = new Date();
        
        let edad = hoy.getFullYear() - fechaNac.getFullYear();
        const diferenciaMeses = hoy.getMonth() - fechaNac.getMonth();

        if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < fechaNac.getDate())) {
            edad--;
        }
        return edad >= 18;
    }


    function soloLetras(texto) {
        const regexTexto = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        return regexTexto.test(texto);
    }

    function mostrarError(input, texto) {
        if (!input) return;

        input.classList.add('is-invalid');

        const feedback = input.nextElementSibling;
        if (feedback && feedback.classList.contains('invalid-feedback')) {
            feedback.textContent = texto;
        }
    }

    function limpiarError(input) {
        if (!input) return;

        input.classList.remove('is-invalid');

        const feedback = input.nextElementSibling;
        if (feedback) {
            feedback.textContent = '';
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

    formProfesor.addEventListener('input', (e) => {
        limpiarError(e.target);
    });

    formProfesor.addEventListener('focusin', (e) => {
        limpiarError(e.target);
    });

    formProfesor.addEventListener('submit', (e) => {
        e.preventDefault();


        const okNombre = validarObligatorio($('#nombreProfesor'));
        const okApellido = validarObligatorio($('#apellidoProfesor'));
        const okRut = validarObligatorio($('#rutProfesor'));
        const okFecha = validarObligatorio($('#fechaNacimientoProfesor'));
        const okCorreo = validarObligatorio($('#correoProfesor'));
        const okTelefono = validarObligatorio($('#telefonoProfesor'));
        const okEspecialidad = validarObligatorio($('#especialidadProfesor'));

        let formatosCorrectos = true;

        if (okNombre) {
            const valNombre = $('#nombreProfesor').value.trim();
            if (valNombre.length < 3) {
                mostrarError($('#nombreProfesor'), 'El nombre debe tener al menos 3 caracteres.');
                formatosCorrectos = false;
            } else if (!soloLetras(valNombre)) {
                mostrarError($('#nombreProfesor'), 'El nombre solo debe contener letras.');
                formatosCorrectos = false;
            }
        }

        if (okApellido) {
            const valApellido = $('#apellidoProfesor').value.trim();
            if (valApellido.length < 3) {
                mostrarError($('#apellidoProfesor'), 'El apellido debe tener al menos 3 caracteres.');
                formatosCorrectos = false;
            } else if (!soloLetras(valApellido)) {
                mostrarError($('#apellidoProfesor'), 'El apellido solo debe contener letras.');
                formatosCorrectos = false;
            }
        }

        if (okRut && !rutValido($('#rutProfesor').value.trim())) {
            mostrarError($('#rutProfesor'), 'El RUT debe tener el formato 12345678-9 (sin puntos).');
            formatosCorrectos = false;
        }

        if (okFecha && !esMayorDeEdad($('#fechaNacimientoProfesor').value)) {
            mostrarError($('#fechaNacimientoProfesor'), 'El profesor debe ser mayor de 18 años.');
            formatosCorrectos = false;
        }

        if (okCorreo && !correoValido($('#correoProfesor').value.trim())) {
            mostrarError($('#correoProfesor'), 'Ingresa un correo electrónico válido.');
            formatosCorrectos = false;
        }

        if (okTelefono && !telefonoValido($('#telefonoProfesor').value.trim())) {
            mostrarError($('#telefonoProfesor'), 'Ingresa un teléfono válido de 9 dígitos.');
            formatosCorrectos = false;
        }

        const esFormularioValido = okNombre && okApellido && okRut && okFecha && okCorreo && okTelefono && okEspecialidad && formatosCorrectos;

        if (esFormularioValido) {
            const modalElemento = document.getElementById('modalExito');
            if (modalElemento) {
                const miPopup = new bootstrap.Modal(modalElemento);
                miPopup.show();
                formProfesor.reset();
            }
        }

    });
});