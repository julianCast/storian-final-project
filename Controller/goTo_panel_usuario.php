<?php
  include '../Controller/sesionCheck.php';
  require_once 'twig/lib/Twig/Autoloader.php';
  require_once '../Model/Usuario.php';

  Twig_Autoloader::register();

  $loader = new Twig_Loader_Filesystem(__DIR__.'/../View');
  $twig = new Twig_Environment($loader);

  // Construye objeto
 $userVacio = new Usuario($usuarioSes, "", "", "", "", "","");
 $infoUser = $userVacio->obtenInfo();
 $user = new Usuario($infoUser->nombreUser, $infoUser->email, "", $infoUser->lugarNacimiento, $infoUser->fechNac, $infoUser->fechAlta);

   $data = [
    'nombreUsuario' => $usuarioSes,
    'datosUsuario' => [
        'nombre' => $user->getNombreUser(),
        'email' => $user->getEmail(),
        'lugarNac' => $user->getLugarNac(),
        'fecNac' => $user->getFechaNac(),
        'fecAlt' => $user->getFechaAlt(),
        'numHist' => $user->numHistorias(),
        'numHistLeidas' => $user->fetchNumLeidos()
    ]
  ];



echo $twig->render('panel_usuario.html.twig',$data);
