const $ = (id) => document.getElementById(id);

window.onload = function () {
  $("keywords").addEventListener("blur", function (e) {
    switch (true) {
      case !this.value.trim():
        $("msgError-keywords").innerHTML = "Ingrese un producto";
        this.classList.add("is-invalid");
        break;
      case this.value.trim().length < 2:
        $("msgError-keywords").innerHTML = "Minimo dos letras";
        this.classList.add("is-invalid");
        break;
      case !/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(this.value.trim()):
        $("msgError-keywords").innerHTML = "Solo se permiten letras";
        this.classList.add("is-invalid");
        break;
      default:
        $("msgError-keywords").innerHTML = null;
        this.classList.add("is-valid");
        this.classList.remove("is-invalid");
        break;
    }
  });

  $("form-Keywords").addEventListener("submit", function(event) {
    event.preventDefault()
    let error = false;
    if (!$("keywords").value.trim() || $("keywords").classList.contains('is-invalid')) {
        error = true
        $("msgError-keywords").innerHTML = null;
        this.classList.remove("is-invalid");
        $("msgError-empty").innerHTML = "Debe colocar un producto";
    }
    !error && this.submit();

  })
};
