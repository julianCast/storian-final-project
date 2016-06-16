<?php
  require_once 'twig/lib/Twig/Autoloader.php';
  require_once '../Model/Usuario.php';
  include '../Controller/sesionCheck.php';
  Twig_Autoloader::register();

  $loader = new Twig_Loader_Filesystem(__DIR__.'/../View');
  $twig = new Twig_Environment($loader);

// Recibo variables
$nombre = $_POST['username'];
$password = $_POST['password'];
$data ['nombreUsuario'] = $usuarioSes;


// Comprobacion
$usuario = new Usuario($nombre, "", $password, "", "", "");
if ($usuario->acceso()){
    //guardar en sesion y en data
    $usuarioSes = $usuario->getNombreUser();
    $data ['nombreUsuario'] = $usuarioSes;
    echo $twig->render('seleccion_modo.html.twig',$data);
}else{
    $data['alert'] = 'error';
    echo $twig->render('control_acceso.html.twig',$data);
}
