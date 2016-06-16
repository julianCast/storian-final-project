
(function(){
    /* Inicializo angular y cambio signos para compatilibidad con Twig */
    var app = angular.module('infoApp', []).config(function($interpolateProvider){
        $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
    });
    /* Controlador que carga el array */
    app.controller('InfoController',function(){                            // 2. Creo un controlador para esa ese modulo. Se llama en <body>
        this.lists = features;                                               // 4. Asigno el array creado al controller.
        this.listsSoon = featuresSoon;                                               // 4. Asigno el array creado al controller.
    });
    var features = [
      'Free selection of character type and name. ',
      'Algorithm to detect character genre, based on  type and name.',
      'Infinite combinations of Stories.',
      'Background customized according user choices.',
      'Random soundtracks everytime.',
      'Hand-made ilustrations of multiples characters .',
      'Friendly manager to make your own story into a Storian-story.'
    ];
    var featuresSoon = [
      'Editing and removing your saved Stories ',
      'More places to choose',
      'A ton of new illustrations',
      'Stories Rating'
    ];



})();
