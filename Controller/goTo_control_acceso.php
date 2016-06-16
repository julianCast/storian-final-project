<?php
include '../Controller/sesionCheck.php';
  require_once 'twig/lib/Twig/Autoloader.php';
  require_once '../Model/Usuario.php';

  Twig_Autoloader::register();

  $loader = new Twig_Loader_Filesystem(__DIR__.'/../View');
  $twig = new Twig_Environment($loader);
  $data ['nombreUsuario'] = $usuarioSes;


// Si viene como invitado, ir a registro.
  if ($usuarioSes == "Invitado"){
    echo $twig->render('control_acceso.html.twig',$data);

// Si no, ir a mandar enviar historia
  }else{
      echo $twig->render('formularioEnviaHistoria.html.twig',$data);
  }



  
