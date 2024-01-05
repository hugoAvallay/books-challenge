const $ = id => document.getElementById(id);

window.onload =function(){
    $('email').addEventListener('focus', function(e){
        $('msgError-email').innerHTML = null
        this.classList.remove('is-invalid');
        this.classList.remove('is-valid')
    })

    $('email').addEventListener('blur', function(e){

        switch (true) {
            case !this.value.trim():
                $('msgError-email').innerHTML = "El email es obligatorio.JS"
                this.classList.add('is-invalid')
                break;
            case !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.value.trim()):
                $('msgError-email').innerHTML = "El formato es inválido.JS";
                this.classList.add('is-invalid')
                break
            default:
                $('msgError-email').innerHTML = null;
                this.classList.add('is-valid')
                this.classList.remove('is-invalid')
                break;

                
        }
        $('password').addEventListener('focus', function(e){
            $('msgError-password').innerHTML = null
            this.classList.remove('is-invalid');
            this.classList.remove('is-valid')
        })
    
        $('password').addEventListener('blur', function(e){
    
            switch (true) {
                case !this.value.trim():
                    $('msgError-password').innerHTML = "La contraseña es obligatoria.JS"
                    this.classList.add('is-invalid')
                    break;
                case !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,12}$/.test(this.value.trim()):
                    $('msgError-password').innerHTML = "La contraseña debe tener entre 6 y 12 caracteres, minúscula, mayúscula, número y caracter especial.JS";
                    this.classList.add('is-invalid')
                    break
                default:
                    $('msgError-password').innerHTML = null;
                    this.classList.add('is-valid')
                    this.classList.remove('is-invalid')
                    break;
            }
        });
    
    
    });
}
