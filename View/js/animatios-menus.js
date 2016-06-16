$(document).ready(function () {

    //Carga script  simulacion escritura.
    $.getScript("typed.js");

    introEffect();
    hover();
    tirones();
    tips();
    ocultaTips();
    clickPanel();
    alertas();
    //detecResize();
    loadSound();


    var tirones = 0;
    var rTotal = 170;
    var r = 0;
    var mensaje;

    // Intro effect
    function introEffect(){
        $(".only").mouseenter(function(){
            $("img.logo").css("opacity", "1");
        });
        $(".only").mouseleave(function(){
            $("img.logo").css("opacity", "0.2");
        });
    }

     // Carga sonido forest
     function loadSound(){
        var audioForest = document.getElementById('forest');
        if (audioForest){
            audioForest.volume = 0.2;
           audioForest.play();
        }
     }

     // Si resize, refresh
     function detecResize() {
         $( window ).resize(function() {
            location.reload();
        });
     }

    // Muestra la pagina poco a poco
    $('#fondoAlerta').fadeOut("6000", function () {
        $('#fondoAlerta').remove();
    });

    /* Efecto cuando pasa por encima de la cuerda */
    function hover() {
        $('#cuerdaAcciona').on('mouseover', function () {
            $(this).animate({top: "-=6px"}, "fast");
            $(this).animate({top: "+=6px"}, "fast");
            $('#pack').animate({top: "+=6px"}, "fast");
            $('#pack').animate({top: "-=6px"}, "fast");
            $('#cuadrado').addClass('cuadGira');
        });
    }

    /* Los tirones funcionan con clicks o enter */
    function tirones() {
        $('#cuerdaAcciona').on('mouseup', function () {
            tiron(this);
        });

        $(document).on('keypress', function (key) {
            if (key.which == 13) {
                tiron($('#cuerdaAcciona'));
            }
        });
    }
    function subeCuerda(cuerda) {
        // movil portrait
        if ($("#checkerResponsive").css("zIndex") == "2") {
            $(cuerda).animate({top: "-=15vh"}, 4000);
            $('#pack').animate({top: "+=75%"}, 4000);
        }
        // movil landscape
        if ($("#checkerResponsive").css("zIndex") == "20") {
            $(cuerda).animate({top: "-=15vh"}, 4000);
            $('#pack').animate({top: "+=106%"}, 4000);
        }
        // tablet portrait
        if ($("#checkerResponsive").css("zIndex") == "1") {
            $(cuerda).animate({top: "-=15vh"}, 4000);
            $('#pack').animate({top: "+=50vmax"}, 4000);
        }
        // tablet landscape
        if ($("#checkerResponsive").css("zIndex") == "10") {
            $(cuerda).animate({top: "-=15vh"}, 4000);
            $('#pack').animate({top: "+=50vmax"}, 4000);
        }
        // pc
        if ($("#checkerResponsive").css("zIndex") == "0") {
            $(cuerda).animate({top: "-=15vh"}, 4000); //-=200px
            $('#pack').animate({top: "+=35vmax"}, 4000); // +=300px

        }


    }
    /* Controla tirones de la cuerda y control datos introducidos */
    function tiron(cuerda) {
        tirones++;
        if (tirones == 1) {

            subeCuerda(cuerda);
            setTimeout(function () {
                $('#nombP1').focus();
            }, 4000);
            giraRueda();
        }
        if (tirones == 2) {
            if (($('#nombP1').val() != "") && ($('#tipoP1').val() != "")) {
                $('#nombP1').prop('disabled', true);
                $('#tipoP1').prop('disabled', true);

                subeCuerda(cuerda);
                $('#nombP2').focus();
                giraRueda();
            } else {
                tirones--;
                alerta("Debes elegir NOMBRE y TIPO");
            }
        }
        if (tirones == 3) {
            if (($('#nombP2').val() != "") && ($('#tipoP2').val() != "")) {
                $('#nombP2').prop('disabled', true);
                $('#tipoP2').prop('disabled', true);

                subeCuerda(cuerda);
                setTimeout(function () {
                    $('#nombP2').focus();
                }, 4000);
                $('#lugar').focus();
                giraRueda();
            } else {
                tirones--;
                alerta("Debes elegir NOMBRE y TIPO");
            }
        }
        if (tirones >= 4) {
            $('#lugar').prop('disabled', true);

            $(cuerda).animate({top: "-=200px"}, 1500);
            $('#pack').animate({top: "+=1450px"}, 3000);
            /* limpia pantalla */
           setTimeout(function () {
                    $('#pack').hide();
                    $('body').css({'overflowY':'auto'});
                }, 6000);


            /* fin limpia pantalla*/
            giraRueda();
            cortinas();
            mostrarCuento();
        }
    }

    /* Muestra consejos sobre nombres y tipos */
    function tips() {
        $('input ').on('focus', function () {

            if (($(this).attr('class') == "nomb") && ($(this).val() == "")) {
                if ($(this).attr('id') == "nombP1") {
                    $('#tipoTip').hide();
                    $('#nombTip').slideToggle().delay(5000).slideUp();
                }
            }
            if (($(this).attr('class') == "tipo") && ($(this).val() == "")) {
                if ($(this).attr('id') == "tipoP1") {
                    $('#nombTip').hide();
                    $('#tipoTip').slideToggle().delay(5000).slideUp();
                }
            }
        });
    }

    /* Oculta consejos cuando se escribe */
    function ocultaTips() {
        $('input').on('keydown', function () {
            $('#tipoTip').hide();
            $('#nombTip').hide();
        });
    }

    /* Anima la rueda de forma acumulativa */
    function giraRueda() {
        r = r + rTotal;
        $('#rueda1').css('transform', 'rotate(-' + r + 'deg)');
        $('#rueda2').css('transform', 'rotate(' + r + 'deg)');

    }

    /* Muestra un mensaje en mitad de la pantalla */
    function alerta(mensaje) {
        $('<div title=Informacion>' + mensaje + '</div>').dialog({
            buttons: {
                "Ok": function () {
                    $(this).dialog("close");
                }
            }
        });
    }

    /*  Crea y cierra cortinas */
    function cortinas() {
        // Crea las cortinas
        var cortinaIzq = "<div class='cortina' id='cortinIzq' ></div>";
        var cortinaDcha = "<div class='cortina' id='cortinDcha' ></div>";
        $('body').append(cortinaIzq, cortinaDcha);

        // Cierra las cortinas
        $('#cortinIzq').animate({left: "-15%"}, 3000);
        $('#cortinDcha').animate({left: "50%"}, 3000);
        $('#fondoCortina').fadeIn(2000);
        // Abre las cortinas
        setTimeout(function () {
            $('#cortinIzq').animate({left: "-80%"}, 3000);
            $('#cortinDcha').animate({left: "105%"}, 3000);
            $('#fondoCortina').fadeOut(2000);
            $('#contenedorHistoria').fadeIn(1000);
        }, 6000);
    }

    /* Cuento */
    function mostrarCuento() {
        // Recojo variables
        var nombreP1 = capital($('#nombP1').val());
        var tipoP1 = capitalLow($('#tipoP1').val());
        var nombreP2 = capital($('#nombP2').val());
        var tipoP2 = capitalLow($('#tipoP2').val());
        var lugar = $('#lugar').val();

        imagenPersonajes(tipoP1, tipoP2);

        $.ajax({
            type: "POST",
            url: "/storian/modos/leer/cuento",
            dataType: 'json',
            data: {nombreP1: nombreP1, tipoP1: tipoP1, nombreP2: nombreP2, tipoP2: tipoP2, lugar: lugar}
        })
                .done(function (data) {
                    console.log(data['contenido']);
                    setTimeout(function () {
                        simulEscribe(data);
                    }, 7000);
                    // Cambia musica y fondo css
                    setTimeout(function () {
                        cambioAmbiente();
                    }, 7000);
                    // Muestra el logo cargando y un texto random
                    setTimeout(function () {
                        cargando();
                    }, 3000);
                    setTimeout(function () {
                        $('#loading').hide();
                    }, 5500);
                })
                .fail(function () {
                    alert("Algo ha superpetado");
                });
    }

    /* Escribe la el cuento con efecto poco a poco */
    function simulEscribe(data) {
        var titulo = data['titulo'];
        var contenido = data['contenido'];
        $("#contenedorHistoria").find('#tituloHistoria').typed({
            strings: [titulo],
            typeSpeed: 0
        });
        $("#contenedorHistoria").find('#contenidoHistoria').typed({
            strings: [contenido],
            typeSpeed: 0
        });
    }

    // Poner la primera en mayuscula
    function capital(string) {
        string = string.toLowerCase();
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    // Poner todo el minuscula
    function capitalLow(string) {
        return string = string.toLowerCase();
    }

    // Cambia el fondo y la musica
    function cambioAmbiente() {

        // Crear y reproducir random music
        var rnd = Math.floor((Math.random() * 23) + 1);
        var audio = "<audio loop autoplay id='music'  src='/storian/View/Assets/music/" + rnd + ".mp3' ></audio>";
        $('body').append(audio);
        document.getElementById('music').volume = 0.1;

        // Cambiar fondo
        var lugarSelect = $('#lugar').val();
        $('body').css('background-image', 'url(/storian/View/Assets/img/lugares/' + lugarSelect + '.jpg)');
    }

    // Pone logo cargando y texto rndom
    function cargando() {
        $('#loading').show();
        var rnd = Math.floor((Math.random() * 7) + 0);

        var arrayText = [
            'Los personajes se estan preparando, el escenario esta casi listo',
            '¡Preparate para la aventura!',
            'Mezclando los personajes y el escenario',
            'La aventura esta a punto de comenzar',
            'Aguarda un instante...',
            'Creando la magia',
            'Espera a que todo este listo',
            'Los personajes estan siendo instruidos.'];

        var elemento = "<div class='centered'>" + arrayText[rnd] + "</div>";
        $('#loading').append(elemento);
        console.log(elemento);
    }
    /* Cuando hace click o hovers al paneles */
    function clickPanel() {

        $('#panelDireccion').on('click',function () {
            $(this).animate({top: "0px"}, 100);
            $('#arrow').find('img').attr('src','/storian/View/Assets/img/up.svgz');
        });
        $('#panelDireccion').mouseleave(function () {
            $(this).animate({top: "-150px"}, 100);
            $('#arrow').find('img').attr('src','/storian/View/Assets/img/down.svgz');
        });


        $('#icoMute').on('click',function (e) {
            e.preventDefault();
            var audioForest = document.getElementById('forest');
            var audioRain = document.getElementById('rain');
            var audioMusic = document.getElementById('music');
            if (audioForest){
                if (audioForest.paused) {
                    audioForest.play();
                    $(this).find('img').attr('src','/storian/View/Assets/img/playing.svgz');
                }else{
                    audioForest.pause();
                    $(this).find('img').attr('src','/storian/View/Assets/img/mute.svgz');
                }
            }else{
                if (audioRain.paused) {
                    audioRain.play();
                    $(this).find('img').attr('src','/storian/View/Assets/img/playing.svgz');
                }else{
                    audioRain.pause();
                    $(this).find('img').attr('src','/storian/View/Assets/img/mute.svgz');
                }
            }
            if (audioMusic){
              if (audioMusic.paused) {
                  audioMusic.play();
              }else{
                  audioMusic.pause();
              }
            }

        });


        // Identificar tipo usuario conectado
        var usuario = $('#panelUsu').find('span').text();

        $('#panelUsu').mouseenter(function () {
            if (usuario == "Invitado") {
                $('#panelUsu').html('Salir<br>de<br><span><img src="/storian/View/Assets/img/userWhite.svgz" height="22px" width="22px" > Invitado</span>');
            } else {
                $('#panelUsu').html('Panel<br>de<br><span><img src="/storian/View/Assets/img/userWhite.svgz" height="22px" width="22px" > ' + usuario + '</span>');
            }
            $(this).animate({top: "0px"});
        });
        $('#panelUsu').mouseleave(function () {
            $(this).animate({top: "-45px"});
            if (usuario == "Invitado") {
                $('#panelUsu').html('Salir<br>de<br><span><img src="/storian/View/Assets/img/userWhite.svgz" height="22px" width="22px" > Invitado</span>');
            } else {
                $('#panelUsu').html('Panel<br>de<br><span><img src="/storian/View/Assets/img/userWhite.svgz" height="22px" width="22px" > ' + usuario + '</span>');
            }
        });

        $('#panelUsu').on('click', function () {
            // Si no esta logueado va al panel de registro
            if (usuario == "Invitado") {
                $("<div>¿Quieres ir al Panel <br>de Login/Registro ?</div>").dialog({
                    title: 'Informacion',
                    resizable: false,
                    modal: true,
                    buttons: {
                        "Ok": function () {
                            window.location.href = '/storian/login';
                        },
                        "Cancelar": function () {
                            $(this).dialog("close");
                        }
                    }
                });
                // Si esta logueado, va al panel usuario
            } else {

                $("<div>¿Quieres ir al Panel <br>de Usuario ?</div>").dialog({
                    title: 'Informacion',
                    resizable: false,
                    modal: true,
                    buttons: {
                        "Ok": function () {
                            window.location.href = '/storian/perfil';
                        },
                        "Cancelar": function () {
                            $(this).dialog("close");
                        }
                    }
                });

            }
        });
    }

    // Abre alertas dialog
    function alertas() {
        var alerta = $('#alertaOn').text();
        if (alerta == 'error') {
            $('<div title=Error>Datos incorrectos</div>').dialog({
                buttons: {
                    "Ok": function () {
                        $(this).dialog("close");
                    }
                }
            });
        } else if (alerta == "Bienvenido") {
            $('<div title=Bienvenido>Disfruta de tu estancia.</div>').dialog({
                buttons: {
                    "Ok": function () {
                        $(this).dialog("close");
                    }
                }
            });
        }
    }
    /* Dado un array de raiz de nombres de personajes, si coincide con la entrada del tipo, se usa esa imagen */
    function imagenPersonajes(tipoP1, tipoP2) {
        var animales = ["pajar", "elefant", "os", "cocodril", "perr", "rat", "gat", "jiraf", "princes", "pat", "oc", "cachorr", "ran", "sap", "caball", "yegu", "gall", "lob", "zorr", "cochin", "cerd", "vac", "pez", "pec", "tortug", "leon", "aguil", "ave", "tiburon"];
        var ambiente = ["arbol", "casa", "varita", "arbusto", "libro"];
        var elegP1 = false;
        var elegP2 = false;
        var rnd = 0;
        var rnd2 = 0;

        $.each(animales, function (key, value) {
            var personaje_array = new RegExp("^" + value + ".*", "gi");
            if (tipoP1.match(personaje_array)) {
                $('#imgP1').css({"background-image": "url(/storian/View/Assets/img/" + value + ".png)"});
                elegP1 = true;
                console.log("encuentra p1");
            }
            if (tipoP2.match(personaje_array)) {
                $('#imgP2').css({"background-image": "url(/storian/View/Assets/img/" + value + ".png)"});
                elegP2 = true;
                console.log("encuentra p2");
            }
            // Si llega al final y no se ha encontrado similitud, elegir img random,
            //FIX : PERO DE ARRAY DE AMBIENTE
            if ((key == (ambiente.length) - 1) && (!elegP1)) {
                console.log("no ha encontrado similitud");
                console.log("longitud array:" + ambiente.length);
                rnd = Math.floor(Math.random() * (ambiente.length) + 0);
                rnd2 = rnd;
                $('#imgP1').css({"background-image": "url(/storian/View/Assets/img/" + ambiente[rnd] + ".png)"});
            }
            if ((key == (ambiente.length) - 1) && (!elegP2)) {
                console.log("no encuentra similes con personaje 2");
                do {
                    rnd2 = Math.floor(Math.random() * (ambiente.length) + 0);
                    console.log("rnd:" + rnd);
                    console.log("rnd2:" + rnd2);
                } while (rnd == rnd2);
                $('#imgP2').css({"background-image": "url(/storian/View/Assets/img/" + ambiente[rnd2] + ".png)"});
            }

        });


        /*
         $.each(animales, function (key, value) {
         if (tipoP1 == value) {
         $('#imgP1').css({"background-image": "url(../../View/Assets/img/" + value + ".png)"});
         elegP1 = true;
         }
         if (tipoP2 == value) {
         $('#imgP2').css({"background-image": "url(../../View/Assets/img/" + value + ".png)"});
         elegP2 = true;
         }
         // Si llega al final y no se ha encontrado similitud, elegir img random
         if ((key == (animales.length) - 1) && (!elegP1)) {
         console.log("no ha encontrado similitud");
         console.log("longitud array:" + animales.length);
         rnd = Math.floor(Math.random() * (animales.length) + 0);
         rnd2 = rnd;
         $('#imgP1').css({"background-image": "url(../../View/Assets/img/" + animales[rnd] + ".png)"});
         }
         if ((key == (animales.length) - 1) && (!elegP2)) {
         console.log("no encuentra similes con personaje 2");
         do {
         rnd2 = Math.floor(Math.random() * (animales.length) + 0);
         console.log("rnd:" + rnd);
         console.log("rnd2:" + rnd2);
         } while (rnd == rnd2);
         $('#imgP2').css({"background-image": "url(../../View/Assets/img/" + animales[rnd2] + ".png)"});
         }
         });
         */
    }

});
