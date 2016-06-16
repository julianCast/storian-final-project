$(document).ready(function() {
    //Carga script  jquery ui.
    $.getScript("jquery-ui.min.js");

// Calendario
    $(function () {
        $.datepicker.regional['es'] = {
        closeText: 'Cerrar',
        prevText: '<Ant',
        nextText: 'Sig>',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
        dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
        weekHeader: 'Sm',
        dateFormat: 'dd-mm-yy',
        firstDay: 1,
        changeYear: true,
        yearRange: "-100:+0",
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
        };
        $.datepicker.setDefaults($.datepicker.regional['es']);
        $(function () {
        $("#datepicker").datepicker();
        });
    });
// Fin calendario
// Metodo formato fecha

$.validator.addMethod(
    "date",
    function ( value, element ) {
        var bits = value.match( /([0-9]+)/gi ), str;
        if ( ! bits )
            return this.optional(element) || false;
        str = bits[ 1 ] + '-' + bits[ 0 ] + '-' + bits[ 2 ]; // 1 0 2
        return this.optional(element) || !/Invalid|NaN/.test(new Date( str ));
    },
    '<div class="ui-state-highlight ui-corner-all" style="margin-top: 0px; padding: 0 .2em;"><div  style="padding:0px; background: none; font-size:14px"><span class="ui-icon ui-icon-info" style="float: left;"></span>Usa el formato dd-mm-yyyy</div></div>'
);

// Fin metodo formato fecha

   // Formulario
    // validate signup form on keyup and submit
    $("#signupForm").validate({
        rules: {
            username: {
                    required: true,
                    minlength: 2,

                    remote :{
                        url: "checkUser",
                        type: "post",
                        data:  {
                            'username' : function(){
                                return $( "#username" ).val();
                            }},
                        dataType:'json'
                    }

            },
            password: {
                    required: true,
                    minlength: 5
            },
            date: {
                    required: true,
                    date: true
            },
            confirm_password: {
                    required: true,
                    minlength: 5,
                    equalTo: "#password"
            },
            email: {
                    required: true,
                    email: true,
                    remote :{
                        url: "checkEmail",
                        type: "post",
                        data:  {
                            'username' : function(){
                                return $( "#email" ).val();
                            }},
                        dataType:'json'
                    }
            }
        },

        messages: {
            username: {
                    required:  '<div class="ui-state-error ui-corner-all" style="padding: 0 .7em;"><div  style="padding:0px; background: none; font-size:14px"><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>Introduce un nombre de usuario</div></div>',
                    minlength: '<div class="ui-state-highlight ui-corner-all" style="margin-top: 0px; padding: 0 .2em;"><div  style="padding:0px; background: none; font-size:14px"><span class="ui-icon ui-icon-info" style="float: left;"></span>Minimo dos caracteres</div></div>',
                    remote:'<div class="ui-state-error ui-corner-all" style="padding: 0 .7em;"><div  style="padding:0px; background: none; font-size:14px"><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>El nombre ya esta en uso</div></div>'
            },
            date: {
                    required:  '<div class="ui-state-error ui-corner-all" style="padding: 0 .7em;"><div  style="padding:0px; background: none; font-size:14px"><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>Introduce una fecha de nacimiento</div></div>'
            },
            password: {
                    required: '<div class="ui-state-error ui-corner-all" style="padding: 0 .7em;"><div  style="padding:0px; background: none; font-size:14px"><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>Introduce una contraseña</div></div>',
                    minlength: '<div class="ui-state-highlight ui-corner-all" style="margin-top: 0px; padding: 0 .2em;"><div  style="padding:0px; background: none; font-size:14px"><span class="ui-icon ui-icon-info" style="float: left;"></span>La contraseña debe tener al menos 5 caracteres</div></div>'
            },
            confirm_password: {
                    required: '<div class="ui-state-error ui-corner-all" style="padding: 0 .7em;"><div  style="padding:0px; background: none; font-size:14px"><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>Repite la contraseña</div></div>',
                    minlength: '<div class="ui-state-highlight ui-corner-all" style="margin-top: 0px; padding: 0 .2em;"><div  style="padding:0px; background: none; font-size:14px"><span class="ui-icon ui-icon-info" style="float: left;"></span>La contraseña debe tener al menos 5 caracteres</div></div>',
                    equalTo: '<div class="ui-state-error ui-corner-all" style="padding: 0 .7em;"><div  style="padding:0px; background: none; font-size:14px"><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>Las contraseñas no coinciden</div></div>'
            },
            email:{
              required: '<div class="ui-state-error ui-corner-all" style="padding: 0 .7em;"><div  style="padding:0px; background: none; font-size:14px"><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>Introduce un email valido</div></div>',
              remote:'<div class="ui-state-error ui-corner-all" style="padding: 0 .7em;"><div  style="padding:0px; background: none; font-size:14px"><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>El email ya esta en uso</div></div>'
            }

        }
    });
    $("#loginForm").validate({
        rules: {
            username: {
                    required: true,
                    minlength: 2

            },
            password: {
                    required: true,
                    minlength: 5
            },
            date: {
                    required: true,
                    date: true
            },
            confirm_password: {
                    required: true,
                    minlength: 5,
                    equalTo: "#password"
            },
            email: {
                    required: true,
                    email: true
            }
        },

        messages: {
            username: {
                    required:  '<div class="ui-state-error ui-corner-all" style="padding: 0 .7em;"><div  style="padding:0px; background: none; font-size:14px"><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>Introduce un nombre de usuario</div></div>',
                    minlength: '<div class="ui-state-highlight ui-corner-all" style="margin-top: 0px; padding: 0 .2em;"><div  style="padding:0px; background: none; font-size:14px"><span class="ui-icon ui-icon-info" style="float: left;"></span>Minimo dos caracteres</div></div>',
                    remote:'<div class="ui-state-error ui-corner-all" style="padding: 0 .7em;"><div  style="padding:0px; background: none; font-size:14px"><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>El nombre ya esta en uso</div></div>'
            },
            date: {
                    required:  '<div class="ui-state-error ui-corner-all" style="padding: 0 .7em;"><div  style="padding:0px; background: none; font-size:14px"><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>Introduce una fecha de nacimiento</div></div>'
            },
            password: {
                    required: '<div class="ui-state-error ui-corner-all" style="padding: 0 .7em;"><div  style="padding:0px; background: none; font-size:14px"><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>Introduce una contraseña</div></div>',
                    minlength: '<div class="ui-state-highlight ui-corner-all" style="margin-top: 0px; padding: 0 .2em;"><div  style="padding:0px; background: none; font-size:14px"><span class="ui-icon ui-icon-info" style="float: left;"></span>La contraseña debe tener al menos 5 caracteres</div></div>'
            },
            confirm_password: {
                    required: '<div class="ui-state-error ui-corner-all" style="padding: 0 .7em;"><div  style="padding:0px; background: none; font-size:14px"><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>Repite la contraseña</div></div>',
                    minlength: '<div class="ui-state-highlight ui-corner-all" style="margin-top: 0px; padding: 0 .2em;"><div  style="padding:0px; background: none; font-size:14px"><span class="ui-icon ui-icon-info" style="float: left;"></span>La contraseña debe tener al menos 5 caracteres</div></div>',
                    equalTo: '<div class="ui-state-error ui-corner-all" style="padding: 0 .7em;"><div  style="padding:0px; background: none; font-size:14px"><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>Las contraseñas no coinciden</div></div>'
            },
            email: '<div class="ui-state-error ui-corner-all" style="padding: 0 .7em;"><div  style="padding:0px; background: none; font-size:14px"><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>Introduce un email valido</div></div>'
        }
    });
    $('#registrar').on('click', function(e){
        e.preventDefault();
        if ( $('#signupForm').valid() ){

          // VARIABLES
          var username = $('#username').val();
          var date = $('#datepicker').val();
          var email = $('#email').val();
          var password = $('#password').val();

          //
          $.ajax({
            type: "POST",
            url: "alta",
            data: {username: username, email:email, fechNac: date, password: password},
              success: function(data) {
                  $('<div title=Registrado>Registro con exito. Ahora logueate.</div>').dialog({
                    buttons: {
                      'Ok': function () {
                        window.location.href = 'login';
                      }
                    }
                  });
              }
          });
        }
    });


    // Acceso y registro
    $('#registro').on('click',function(){
       window.location.href = 'registro';
    });
});
