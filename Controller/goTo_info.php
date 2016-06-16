<?php
include '../Controller/sesionCheck.php';
require_once 'twig/lib/Twig/Autoloader.php';
require_once '../Model/Usuario.php';

Twig_Autoloader::register();

$loader = new Twig_Loader_Filesystem(__DIR__.'/../View');
$twig = new Twig_Environment($loader);

$data ['nombreUsuario'] = $usuarioSes;
echo $twig->render('info.html.twig',$data);
