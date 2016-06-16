<?php
/*
 * Envia los datos recibidos de estructura.js a traves de ajax a la base de datos.
 */
include_once '../Model/Historia.php';
include_once '../Model/Usuario.php';

// Recoge Variables
$titulo = $_POST['titulo'];
$contenido = $_POST['historia'];
$nombreUser = $_POST['autor'];

 // Construye objeto usuario
 $userVacio = new Usuario($nombreUser, "", "", "", "", "");
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
        'numHist' => $user->numHistorias()
    ]
  ];


// Envia a la db
$historia = new Historia("", $titulo, $contenido, $user->getEmail(),"");
$historia->insert();
