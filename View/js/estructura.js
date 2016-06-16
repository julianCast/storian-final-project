$(document).ready(function () {
    //Carga script  simulacion escritura.
    $.getScript("typed.js");


    //$('#aceptar').prop('disabled', true);
    $('#titulobtn').prop('disabled', true);
    $('#historia').prop('disabled', true);
    guardaTitulo();
    //textToButton();
    clickButtonToText();
    chequeoDatosIn();
    titulo();
    envCuento();
    fadeIn();

    /* Provoca un fadein a la carga de la pagina */
    function fadeIn() {
        $('#fondoNegro').fadeOut(1000);
    }
    /* Habilita el boton ACEPTAR cuando los datos se han introducidos */
    function chequeoDatosIn() {

            $('#aceptar').on('click', function () {
              var nombreP1 = $('#nombP1').val();
              var tipoP1 = $('#tipoP1').val();
              var nombreP2 = $('#nombP2').val();
              var tipoP2 = $('#tipoP2').val();
              var nombreLu = $('#nomLug').val();
              if ((nombreP1 != "") && (nombreP2 != "") && (tipoP1 != "") && (tipoP2 != "")) {
                textToButton();

                $('#tapP1').fadeOut("slow");
                $('#botonesMagicos').fadeIn("slow");
                $('#cuadroTexto').fadeIn("slow");
              } else {
                $('<div title="Faltan datos">Introduce al menos los datos del PROTAGONISTA.</div>').dialog({
                    buttons: {
                        "Ok": function () {
                            $(this).dialog("close");
                        }
                    }
                });
              }
            });
    }

    /* Cambia el nombre de los botones segun los input */
    function textToButton() {
            $('#titulo').prop('disabled', false);
            $('#titulo').focus();
            // DEFINIR VARIABLES
            var nombreP1 = capital($('#nombP1').val());
            var tipoP1 = capitalLow($('#tipoP1').val());
            var nombreP2 = capital($('#nombP2').val());
            var tipoP2 = capitalLow($('#tipoP2').val());

            var nombreLu = $('#nomLug').val();

            $('#nombP1i').text(nombreP1);
            $('#tipoP1i').text(tipoP1);
            $('#nombP2i').text(nombreP2);
            $('#tipoP2i').text(tipoP2);

            $('#nomLui').text($('#nomLug').val());

            // Ultimas letras de PERSONAJE 1
            if ((nombreP1 != "") && (tipoP1 != "")) {
                var ultN1 = (nombreP1.slice(-1));
                var ultT1 = (tipoP1.slice(-1));

                // Determinar sexo PERSONAJE 1
                if ((ultT1 == "a") || (ultT1 == "e") && (ultN1 == "a")) {
                    var sexoP1 = "femenino";
                } else {
                    var sexoP1 = "masculino";
                }
                // FIN Determinar sexo
            }
            // Ultimas letras de PERSONAJE 2
            if ((nombreP2 != "") || (tipoP2 != "")) {
                var ultN2 = (nombreP2.slice(-1));
                var ultT2 = (tipoP2.slice(-1));

                // Determinar sexo PERSONAJE 2
                if ((ultT2 == "a") || ((ultT2 == "e") && (ultN2 == "a"))) {
                    var sexoP2 = "femenino";
                } else {
                    var sexoP2 = "masculino";
                }
                articSexo(sexoP1, sexoP2, sexoLu);
            }
            // Ultimas letras de LUGAR

            var ultLu = (nombreLu.slice(-1));
            // Determinar sexo LUGAR
            if ((ultLu == "a") || ((ultLu == "e") && (ultLu == "a"))) {
                var sexoLu = "femenino";
            } else {
                var sexoLu = "masculino";
            }

            articSexo(sexoP1, sexoP2, sexoLu);
    }

    /* Segun el sexo de entrada, cambia articulos y generos */
    function articSexo(sexoP1, sexoP2, sexoLu) {
        //ATRIBUIR ARTICULOS
        if (sexoP1 == "masculino") {
            var artDetP1m = "El";
            var artDetP1 = "el";
            var oaP1 = "o";
            var pronP1 = "él";
            var detIndP1 = "un";
            var neutP1 = "lo";
        } else {
            var artDetP1m = "La";
            var artDetP1 = "la";
            var oaP1 = "a";
            var pronP1 = "ella";
            var detIndP1 = "una";
            var neutP1 = "la";
        }
        if (sexoP2 == "masculino") {
            var artDetP2m = "El";
            var artDetP2 = "el";
            var oaP2 = "o";
            var pronP2 = "él";
            var detIndP2 = "un";
            var neutP2 = "lo";
        } else {
            var artDetP2m = "La";
            var artDetP2 = "la";
            var oaP2 = "a";
            var pronP2 = "ella";
            var detIndP2 = "una";
            var neutP2 = "la";
        }
        if (sexoLu == "masculino") {
            var artDetLum = "El";
            var artDetLu = "el";
            var oaLu = "o";
            var detIndLu = "un";
        } else {
            var artDetLum = "La";
            var artDetLu = "la";
            var oaLu = "a";
            var detIndLu = "una";
        }
        $('#artDetP1m').text(artDetP1m);
        $('#artDetP1').text(artDetP1);
        $('#oaP1').text(oaP1);
        $('#pronP1').text(pronP1);
        $('#detIndP1').text(detIndP1);
        $('#neutP1').text(neutP1);

        $('#artDetP2m').text(artDetP2m);
        $('#artDetP2').text(artDetP2);
        $('#oaP2').text(oaP2);
        $('#pronP2').text(pronP2);
        $('#detIndP2').text(detIndP2);
        $('#neutP2').text(neutP2);
        $('#artDetLum').text(artDetLum);
        $('#artDetLum').text(artDetLum);
        $('#artDetLu').text(artDetLu);
        $('#oaLu').text(oaLu);
        $('#detIndLu').text(detIndLu);

        resultado(artDetP1m, artDetP1, oaP1, pronP1, detIndP1, neutP1, artDetP2m, artDetP2, oaP2, pronP2, detIndP2, neutP2, artDetLum, artDetLu, oaLu, detIndLu);
    }

    /* Pasa el id boton al cuadro de texto */
    function clickButtonToText() {
        $('.boton').on('click', function () {
            var contenidoHistoria = $('#historia').val();
            var contenidoTitulo = $('#titulo').val();
            var key = $(this).attr('id');

            if ($('#titulo').is(':disabled')) {
                $('#historia').val(contenidoHistoria + key);
                $('#resultado').text($('#historia').val());
                $('#historia').focus();
                console.log("titulo esta desactivado!");
            } else if ($('#titulo').is(':enabled')) {
                $('#titulo').val(contenidoTitulo + key);
                $('#resultado').text($('#titulo').val());
                $('#titulo').focus();
                console.log("titulo esta activado!");
            }

        });
    }
    function titulo() {
        $('#titulo').on('keyup', function () {
            if ($('#titulo').val() != "") {
                $('#titulobtn').prop('disabled', false);
            }
        });
    }

    /* Funcion que usa mostrarResultado() Dando click a boton o tecleando*/
    function resultado(artDetP1m, artDetP1, oaP1, pronP1, detIndP1, neutP1, artDetP2m, artDetP2, oaP2, pronP2, detIndP2, neutP2, artDetLum, artDetLu, oaLu, detIndLu) {
        $('#historia,#titulo').on('keyup', function () {
            mostrarResultado(artDetP1m, artDetP1, oaP1, pronP1, detIndP1, neutP1, artDetP2m, artDetP2, oaP2, pronP2, detIndP2, neutP2, artDetLum, artDetLu, oaLu, detIndLu);
        });
        $('.boton').on('click', function () {
            mostrarResultado(artDetP1m, artDetP1, oaP1, pronP1, detIndP1, neutP1, artDetP2m, artDetP2, oaP2, pronP2, detIndP2, neutP2, artDetLum, artDetLu, oaLu, detIndLu);
        });
    }

    /* Funcion que codifica el text area para verlo en #resultado */
    function mostrarResultado(artDetP1m, artDetP1, oaP1, pronP1, detIndP1, neutP1, artDetP2m, artDetP2, oaP2, pronP2, detIndP2, neutP2, artDetLum, artDetLu, oaLu, detIndLu) {

        // TITULO
        $('#titulado').text($('#titulo').val());
        var contenidoTitulado = $('#titulado').text();
        // HISTORIA
        $('#resultado').text($('#historia').val());
        var contenidoResultado = $('#resultado').text();

        // SUSTITUIR VARIABLES POR ARTICULOS

        var nombreP1 = capital($('#nombP1').val());
        var tipoP1 = capitalLow($('#tipoP1').val());
        var nombreP2 = capital($('#nombP2').val());
        var tipoP2 = capitalLow($('#tipoP2').val());
        var lugar = capital($('#nomLug').val());
        /*
         * ENCUENTRA EL NOMBRE INCLUSO RODEADO                     DE LETRAS, COMO sPEDROc => /nombP1i/gi
         * ENCUENTRA EL NOMBRE SOLO SI ES EXACTO,                    COMO PEDRO =>/\bnombP2i\b/gi
         */
        // TITULO
        var contenidoModTit = contenidoTitulado.replace(/\bnombP1i\b/gi, nombreP1);
        contenidoModTit = contenidoModTit.replace(/\btipoP1i/gi, tipoP1);
        contenidoModTit = contenidoModTit.replace(/\bartDetP1m\b/gi, artDetP1m);
        contenidoModTit = contenidoModTit.replace(/\bartDetP1\b/gi, artDetP1);
        contenidoModTit = contenidoModTit.replace(/oaP1/gi, oaP1);
        contenidoModTit = contenidoModTit.replace(/\bpronP1\b/gi, pronP1);
        contenidoModTit = contenidoModTit.replace(/\bdetIndP1/gi, detIndP1);
        contenidoModTit = contenidoModTit.replace(/\bneutP1/gi, neutP1);

        contenidoModTit = contenidoModTit.replace(/\bnombP2i\b/gi, nombreP2);
        contenidoModTit = contenidoModTit.replace(/\btipoP2i/gi, tipoP2);
        contenidoModTit = contenidoModTit.replace(/\bartDetP2m\b/gi, artDetP2m);
        contenidoModTit = contenidoModTit.replace(/\bartDetP2\b/gi, artDetP2);
        contenidoModTit = contenidoModTit.replace(/oaP2/gi, oaP2);
        contenidoModTit = contenidoModTit.replace(/\bpronP2\b/gi, pronP2);
        contenidoModTit = contenidoModTit.replace(/\bdetIndP2/gi, detIndP2);
        contenidoModTit = contenidoModTit.replace(/\bneutP2/gi, neutP2);

        contenidoModTit = contenidoModTit.replace(/\bartDetLum\b/gi, artDetLum);
        contenidoModTit = contenidoModTit.replace(/\bartDetLu\b/gi, artDetLu);
        contenidoModTit = contenidoModTit.replace(/oaLu/gi, oaLu);
        contenidoModTit = contenidoModTit.replace(/\bdetIndLu\b/gi, detIndLu);
        contenidoModTit = contenidoModTit.replace(/\bnomLui\b/gi, lugar);
        $('#titulado').text(contenidoModTit);
        // HISTORIA
        var contenidoMod = contenidoResultado.replace(/\bnombP1i\b/gi, nombreP1);
        contenidoMod = contenidoMod.replace(/\btipoP1i/gi, tipoP1);
        contenidoMod = contenidoMod.replace(/\bartDetP1m\b/gi, artDetP1m);
        contenidoMod = contenidoMod.replace(/\bartDetP1\b/gi, artDetP1);
        contenidoMod = contenidoMod.replace(/oaP1/gi, oaP1);
        contenidoMod = contenidoMod.replace(/\bpronP1\b/gi, pronP1);
        contenidoMod = contenidoMod.replace(/\bdetIndP1/gi, detIndP1);
        contenidoMod = contenidoMod.replace(/\bneutP1/gi, neutP1);

        contenidoMod = contenidoMod.replace(/\bnombP2i\b/gi, nombreP2);
        contenidoMod = contenidoMod.replace(/\btipoP2i/gi, tipoP2);
        contenidoMod = contenidoMod.replace(/\bartDetP2m\b/gi, artDetP2m);
        contenidoMod = contenidoMod.replace(/\bartDetP2\b/gi, artDetP2);
        contenidoMod = contenidoMod.replace(/oaP2/gi, oaP2);
        contenidoMod = contenidoMod.replace(/\bpronP2\b/gi, pronP2);
        contenidoMod = contenidoMod.replace(/\bdetIndP2/gi, detIndP2);
        contenidoMod = contenidoMod.replace(/\bneutP2/gi, neutP2);

        contenidoMod = contenidoMod.replace(/\bartDetLum\b/gi, artDetLum);
        contenidoMod = contenidoMod.replace(/\bartDetLu\b/gi, artDetLu);
        contenidoMod = contenidoMod.replace(/oaLu/gi, oaLu);
        contenidoMod = contenidoMod.replace(/\bdetIndLu\b/gi, detIndLu);
        contenidoMod = contenidoMod.replace(/\bnomLui\b/gi, lugar);
        $('#resultado').text(contenidoMod);
    }
    function guardaTitulo() {
        $('#titulobtn').on('click', function () {
            $('#titulo').prop('disabled', true);
            $('#titulobtn').prop('disabled', true);
            $('#historia').prop('disabled', false);
            $('#historia').focus();
        });
    }
// Poner minusculas y mayusculas
    function capital(string) {
        string = string.toLowerCase();
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    function capitalLow(string) {
        return string = string.toLowerCase();
    }

    /* Segun lo enviado por user, genera una respuesta data con proceso.php */
    function envCuento() {
        $('#enviaCuento').on('click', function () {
            enviaSQL();
        });
    }

    function enviaSQL() {
        var tituloIn = $('#titulo').val();
        var historiaIn = $('#historia').val();
        var autorIn = $('#autorHidden').val();
        $.ajax({
            type: "POST",
            url: "grabaHistoria",
            data: {titulo: tituloIn, historia: historiaIn, autor: autorIn}
        })
                .done(function (data) {
                    $('<div title=¡Historia enviada!>Muchas gracias por enviar tu historia.</div>').dialog({
                        buttons: {
                            "Ok": function () {
                                window.location.href = '/storian/modos';
                            }
                        }
                    });
                })
                .fail(function () {
                    alert("algo ha superpetado");
                });

    }
    function recibeSQL() {
        var tituloIn = $('#titulo').val();
        var historiaIn = $('#historia').val();
        $.ajax({
            type: "POST",
            url: "proceso.php",
            data: {titulo: tituloIn, historia: historiaIn}
        })
                .done(function (data) {
                    simulEscribe(data);
                    $('<input id="contenidoMensaje" type="text" autofocus="autofocus" autocomplete="off" name="mensaje" >').appendTo('#contenedor');
                })
                .fail(function () {
                    alert("algo ha superpetado");
                });

    }

    /* Escribe la respuesta con efecto poco a poco */
    function simulEscribe(data) {
        $('#contenedor').append('<p></p>');
        $("#contenedor").find('p').last().typed({
            strings: [data],
            typeSpeed: 2
        });
    }

    /*  ENTORNO VISUAL ESCRITOR */
    $('#comenzar').on('click', function (e) {
        e.preventDefault();
        // Desaparecer y eliminar
        $('#contenedorAsistente').fadeOut("slow", function () {
            $('#contenedorAsistente').remove();
        });
        $('#tapP1').fadeIn();
    });



    /* FIN ENTORNO VISUAL */

/* Borrar usuario */
    $('#btn_delete').on('click', function () {
        var nombreUser = $('#nomUser').text();
        console.log(nombreUser);
        $('<div title=ATENCION>¿Estas seguro  de que quieres borrar tu cuenta?</div>').dialog({
            buttons: {
                "Ok": function () {
                    $.ajax({
                        type: "POST",
                        url: "baja",
                        data: {nombre: nombreUser}
                    })
                            .done(function (data) {
                                window.location.href = 'modos';
                                console.log(data);
                            })
                            .fail(function () {
                                alert("algo ha superpetado");
                            });
                },
                "Cancelar": function () {
                    $(this).dialog("close");
                }
            }
        });

    });
    /* FIN Borrar usuario*/
    /* Cerrar sesion */
    $('#btn_salir').on('click',function(){
         $('<div title=ATENCION>¿Estas seguro de que quieres cerrar la sesion?</div>').dialog({
            buttons: {
                "Ok": function () {
                    window.location.href = 'cierraSesion';
                },
                "Cancelar": function () {
                    $(this).dialog("close");
                }
            }
        });

    });
    /* Fin borrar sesion*/
    $('#modoLee').on('click',function(e){
        e.preventDefault();
        $('<div id=fondoNegro></div>').appendTo('body');
        $('#fondoNegro').fadeIn("slow", function () {
            window.location.href = 'modos/leer';
        });

    });



});
