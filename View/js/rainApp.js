$(document).ready(function() {

    var audioThunder = document.createElement('audio');
    audioThunder.setAttribute('src', '/storian/View/Assets/music/thunderv2.mp3');

    /* Background random*/
     randomBackground();

    /* Rain Effect */
    setTimeout(function () { rain(); }, 200);
    /* Cada 3 minutos reset lluvia */
    setInterval(resetRain,180000);

    /* Click to go page */
    clicktoEnter();

    /* Ejecuta randomThunder la primera vez */
    var rand = Math.floor(Math.random() * 40000) + 10000;
    setTimeout(function () {
      console.log('rayooo');

        randomThunder();
    }, rand);

    /* Resetea lluvia para rendimiento: Si no esta en modo escribir, recarga pagina */
    function resetRain() {
      var ruta = window.location.pathname;
      console.log(ruta);
      if (ruta != '/storian/modos/escribir'){
        location.reload();
      }
    }

    /* Function Background random */
    function randomBackground() {
        var backgrounds =  ['bosque','castillo','cueva','colegio','jardin','lago','montaña','museo','playa','valle'];
        var rnd = Math.floor(Math.random() * (backgrounds.length));
        $('#background').attr('src','/storian/View/Assets/img/lugares/'+backgrounds[rnd]+'.jpg');
    }

    /* Control click */
    function clicktoEnter(){
        $('.enterLink').on('click', function(e){
            url = $(this).attr('href');
            e.preventDefault();
            thunder();
            $('#fondoNegro').fadeIn(3000, function(){location.href = url;});
        });
    }

   /* Rain */
    function rain() {
      var ruta = window.location.pathname;
      console.log(ruta);
      if (ruta != '/storian/modos/escribir'){
        var image = document.getElementById('background');
            var engine = new RainyDay({
                image: image
            });
            engine.rain([ [1, 2, 1000] ]);
            engine.rain([ [3, 5, 0.08], [5, 5, 0.9], [6, 2, 0.05] ], 100);
      }

    }

    /* Reproduce thunder */
    function thunder() {
        var imageFlash = document.getElementById('thunderLayer');
        var engine = new RainyDay({
            image: imageFlash
        });
        engine.rain([ [1, 2, 10] ]);
        engine.rain([ [3, 3, 0.88], [5, 5, 0.9], [6, 2, 1] ], 100);
        audioThunder.volume=0.3;
        audioThunder.play();
        setTimeout(function () {
          $('canvas').last().remove();
        }, 90);
    }

    /* Ejecuta thunder() cada x ms */
    function randomThunder() {
      console.log('rayo');
      var rand = Math.floor(Math.random() * 120000) + 20000;
     thunder();
     setTimeout(function () {
              randomThunder();
        }, rand);
   };
});
