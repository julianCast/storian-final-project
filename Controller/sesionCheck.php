<?php
session_start();

// Recibir sesion de usuario
$usuarioSes =& $_SESSION['usuario'];

if (!isset($usuarioSes)){
    $usuarioSes = "Invitado";
}

