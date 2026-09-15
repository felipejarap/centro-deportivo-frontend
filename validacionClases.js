const $ = (sel) => document.querySelector(sel);

document.addEventListener('DOMContentLoaded', () => {
    const formClase = $('#formClase');
    if (!formClase) return;

   function mostrarError(campo, texto) {
    if (!campo) return;
    campo.classList.add('con-error');
    const spanTexto = campo.querySelector('.mensaje-error span');
    if (spanTexto) {
        spanTexto.innerHTML = texto;
    }
}


function limpiarError(campo) {
    if (!campo) return;
    campo.classList.remove('con-error');
    const spanTexto = campo.querySelector('.mensaje-error span');
    if (spanTexto) {
        spanTexto.innerHTML = '';
    }
}

    function validarObligatorio(input) {
        if (!input) return false;
        const campo = input.closest('.campo-formulario'); 
        if (input.value.trim() === '') {
            mostrarError(campo, 'Dato obligatorio');
            return false;
        }
        limpiarError(campo);
        return true;
    }

    formClase.addEventListener('submit', (e) => {
        e.preventDefault(); 

        const okNombre = validarObligatorio($('#nombre'));
        const okTipo = validarObligatorio($('#tipoClase'));
        const okLugar = validarObligatorio($('#lugar'));
        const okInicio = validarObligatorio($('#fechaInicio'));
        const okTermino = validarObligatorio($('#fechaTermino'));
        let okParticipantes = validarObligatorio($('#participantes'));

        if (okParticipantes) {
            const numParticipantes = Number($('#participantes').value);
            if (Number.isNaN(numParticipantes) || numParticipantes <= 0) {
                mostrarError($('#participantes').closest('.campo-formulario'), 'Debe ser mayor a 0');
                okParticipantes = false;
            }
        }

        let fechasValidas = false;
        if (okInicio && okTermino) {
            const inicio = new Date($('#fechaInicio').value);
            const termino = new Date($('#fechaTermino').value);
            const campoTermino = $('#fechaTermino').closest('.campo-formulario');

            if (termino <= inicio) {
                mostrarError(campoTermino, 'Debe ser posterior al inicio');
                fechasValidas = false;
            } else {
                limpiarError(campoTermino);
                fechasValidas = true;
            }
        }

        if (okNombre && okTipo && okLugar && okInicio && okTermino && okParticipantes && fechasValidas) {
            const modalElemento = document.getElementById('modalExito');
            if (modalElemento) {
                const miPopup = new bootstrap.Modal(modalElemento);
                miPopup.show();
                formClase.reset(); 
            }
        }
    });
});
