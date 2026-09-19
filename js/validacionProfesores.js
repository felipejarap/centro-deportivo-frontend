const $ = (sel) => document.querySelector(sel);

document.addEventListener('DOMContentLoaded', () => {
    const formClase = $('#formClase');
    if (!formClase) return;

    function esCorreoValido(correo) {
        if (typeof correo !== 'string') return false;
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(correo.trim());
    }

    

});