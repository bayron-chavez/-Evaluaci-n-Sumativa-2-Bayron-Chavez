document.addEventListener("DOMContentLoaded", function() {

    const formulario = document.querySelector('form');

    // ==========================================
    // 1. BLOQUEO EN TIEMPO REAL: MÁXIMO 9 DÍGITOS
    // ==========================================
    const inputTelefono = document.getElementById('numero-telefono');
    inputTelefono.addEventListener('input', function() {
        if (this.value.length > 9) {
            this.value = this.value.slice(0, 9);
        }
    });

    // ==========================================
    // 2. FUNCIÓN PARA MOSTRAR/OCULTAR CONTRASEÑA (¡Ahora está afuera!)
    // ==========================================
    const btnVerContra1 = document.getElementById('btn-ver-contra1');
    const inputContra1 = document.getElementById('contraseña1');

    btnVerContra1.addEventListener('click', function() {
        if (inputContra1.type === 'password') {
            inputContra1.type = 'text';
            btnVerContra1.innerText = '🙈';
        } else {
            inputContra1.type = 'password';
            btnVerContra1.innerText = '👁️';
        }
    });

    const btnVerContra2 = document.getElementById('btn-ver-contra2');
    const inputContra2 = document.getElementById('contraseña2');

    btnVerContra2.addEventListener('click', function() {
        if (inputContra2.type === 'password') {
            inputContra2.type = 'text';
            btnVerContra2.innerText = '🙈';
        } else {
            inputContra2.type = 'password';
            btnVerContra2.innerText = '👁️';
        }
    });

    // ==========================================
    // 3. VALIDACIÓN AL ENVIAR EL FORMULARIO
    // ==========================================
    formulario.addEventListener('submit', function(evento) {
        
        evento.preventDefault(); 

        const mensajesError = document.querySelectorAll('.text-danger');
        mensajesError.forEach(function(div) { div.innerText = ""; });
        
        const inputs = document.querySelectorAll('.form-control, .form-select');
        inputs.forEach(function(input) { input.classList.remove('is-invalid'); });

        const usuario = document.getElementById('usuario').value.trim();
        const contraseña1 = document.getElementById('contraseña1').value.trim();
        const contraseña2 = document.getElementById('contraseña2').value.trim();
        const direccion = document.getElementById('direccion').value.trim();
        const telefono = document.getElementById('numero-telefono').value.trim();
        const correo1 = document.getElementById('correo1').value.trim();
        const urlPersonal = document.getElementById('urlPersonal').value.trim();

        let formularioValido = true; 

        function mostrarError(idInput, idError, mensaje) {
            document.getElementById(idError).innerText = mensaje;
            document.getElementById(idInput).classList.add('is-invalid');
            formularioValido = false; 
        }

        // --- VALIDACIÓN DE USUARIO ---
        if (usuario.length < 5 || usuario.length > 10) {
            mostrarError('usuario', 'error-usuario', 'El campo de usuario debe tener entre 5 y 10 caracteres.');
        } else {
            let primeraLetra = usuario.charAt(0).toUpperCase();
            if (primeraLetra < 'A' || primeraLetra > 'Z') {
                mostrarError('usuario', 'error-usuario', 'El campo de usuario debe comenzar con una letra.');
            } else {
                let encontroNumero = false; 
                for (let i = 0; i < usuario.length; i++) {
                    let caracter = usuario.charAt(i).toUpperCase();
                    let esLetra = (caracter >= 'A' && caracter <= 'Z');
                    let esNumero = (caracter >= '0' && caracter <= '9');

                    if (!esLetra && !esNumero) {
                        mostrarError('usuario', 'error-usuario', 'El usuario no puede tener caracteres especiales ni acentos.');
                        break; 
                    }

                    if (esNumero) {
                        encontroNumero = true; 
                    } else if (esLetra && encontroNumero) {
                        mostrarError('usuario', 'error-usuario', 'Los números solo pueden ir al final del nombre de usuario.');
                        break; 
                    }
                }
            }
        }

        // --- VALIDACIÓN DE CONTRASEÑA 1 ---
        if (contraseña1 === "") {
            mostrarError('contraseña1', 'error-contraseña1', 'La contraseña es obligatoria.');
        } else if (contraseña1.length < 3 || contraseña1.length > 6) {
            mostrarError('contraseña1', 'error-contraseña1', 'La contraseña debe tener entre 3 y 6 caracteres.');
        } else {
            let tieneLetra = false;
            let tieneNumero = false;

            for (let i = 0; i < contraseña1.length; i++) {
                let caracter = contraseña1.charAt(i).toUpperCase();
                if (caracter >= 'A' && caracter <= 'Z') {
                    tieneLetra = true;
                } else if (caracter >= '0' && caracter <= '9') {
                    tieneNumero = true;
                }
            }

            if (tieneLetra === false || tieneNumero === false) {
                mostrarError('contraseña1', 'error-contraseña1', 'La contraseña debe tener al menos una letra y un dígito.');
            }

            if (usuario !== "" && contraseña1.toLowerCase().includes(usuario.toLowerCase())) {
                mostrarError('contraseña1', 'error-contraseña1', 'La contraseña no puede contener tu nombre de usuario.');
            }
        }

        // --- VALIDACIÓN DE CONFIRMACIÓN ---
        if (contraseña2 === "") {
            mostrarError('contraseña2', 'error-contraseña2', 'Debes confirmar tu contraseña.');
        } else if (contraseña1 !== contraseña2) {
            mostrarError('contraseña2', 'error-contraseña2', 'Las contraseñas no coinciden.');
        }

        // --- VALIDACIÓN DE DIRECCIÓN ---
        if (direccion === "") {
            mostrarError('direccion', 'error-direccion', 'La dirección es obligatoria.');
        }

        // --- VALIDACIÓN DE URL ---
        if (urlPersonal !== "") {
            if (urlPersonal.includes(" ")) { 
                mostrarError('urlPersonal', 'error-url', 'La URL de la página web no puede contener espacios.');
            } else if (!urlPersonal.startsWith("http://") && !urlPersonal.startsWith("https://")) {
                mostrarError('urlPersonal', 'error-url', 'La URL de la página web debe comenzar con http:// o https://');
            }
        }

        // --- VALIDACIÓN DE TELÉFONO ---
        if (telefono === "") {
            mostrarError('numero-telefono', 'error-telefono', 'El número de teléfono es obligatorio.');
        } else if (isNaN(telefono)) {
            mostrarError('numero-telefono', 'error-telefono', 'El número de teléfono debe contener solo dígitos.');
        } else if (telefono.length !== 9) {
            mostrarError('numero-telefono', 'error-telefono', 'El número de teléfono debe tener 9 dígitos.');
        } else if (!telefono.startsWith("9")) {
            mostrarError('numero-telefono', 'error-telefono', 'El teléfono en Chile debe empezar con el número 9.');
        }

        // --- VALIDACIÓN DE CORREO ---
        if (correo1 !== "") {
            if (correo1.includes(" ")) { 
                mostrarError('correo1', 'error-correo1', 'El correo electrónico no puede contener espacios.');
            } else if (!correo1.includes("@") || !correo1.includes(".")) {
                mostrarError('correo1', 'error-correo1', "El correo electrónico debe contener un símbolo '@' y un punto (ej: .cl o .com).");
            }
        }

        // --- ENVÍO FINAL ---
        if (formularioValido) {
            alert("¡Todas las validaciones pasaron con éxito! Listo para enviar.");
            // formulario.submit(); 
            // formulario.reset(); // Descomenta esta línea solo si quieres borrar todo al terminar con éxito
        }

    });
});