(() => {
  const form = document.getElementById('pedidoForm');
  const btnEnviar = document.getElementById('btnEnviar');
  const btnLimpiar = document.getElementById('btnLimpiar');
  const infoPaquete = document.getElementById('info-paquete');

  const fields = {
    nombre: document.getElementById('nombre'),
    indicativo: document.getElementById('indicativo'),
    celular: document.getElementById('celular'),
    direccion: document.getElementById('direccion'),
    paquete: document.getElementById('paquete'),
    fecha: document.getElementById('fecha'),
    hora: document.getElementById('hora'),
  };

  // Mostrar info del paquete seleccionado
  fields.paquete.addEventListener('change', () => {
    const selectedOption = fields.paquete.options[fields.paquete.selectedIndex];
    infoPaquete.textContent = selectedOption.getAttribute('data-info') || '';
    validateField(fields.paquete);
    checkFormValidity();
  });

  // Validación de un campo individual
  function validateField(field) {
    let valid = false;
    if (field.value.trim() === '') {
      valid = false;
    } else if (field === fields.celular) {
      // Validar solo números en celular
      const regex = /^[0-9]+$/;
      valid = regex.test(field.value.trim());
    } else {
      valid = true;
    }

    if (!valid) {
      field.classList.add('is-invalid');
    } else {
      field.classList.remove('is-invalid');
    }
    return valid;
  }

  // Validar todos los campos requeridos
  function checkFormValidity() {
    let allValid = true;
    for (const key in fields) {
      if (!validateField(fields[key])) {
        allValid = false;
      }
    }
    btnEnviar.disabled = !allValid;
  }

  // Validar en tiempo real
  for (const key in fields) {
    fields[key].addEventListener('input', () => {
      validateField(fields[key]);
      checkFormValidity();
    });
  }

  // Validar también al perder foco para marcar error más rápido
  for (const key in fields) {
    fields[key].addEventListener('blur', () => {
      validateField(fields[key]);
      checkFormValidity();
    });
  }

  // Limpiar info y validaciones al limpiar el formulario
  btnLimpiar.addEventListener('click', () => {
    infoPaquete.textContent = '';
    for (const key in fields) {
      fields[key].classList.remove('is-invalid');
    }
    btnEnviar.disabled = true;
  });

  // Envío del formulario (solo muestra alerta, luego limpia)
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!btnEnviar.disabled) {
      alert('¡Pedido enviado con éxito!');
      form.reset();
      infoPaquete.textContent = '';
      btnEnviar.disabled = true;
      // Eliminar estilos de error
      for (const key in fields) {
        fields[key].classList.remove('is-invalid');
      }
    }
  });
})();