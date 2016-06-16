<?php
header('Content-type: application/json');
require_once '../Model/Usuario.php';

$email = $_POST['email'];

$usuario = new Usuario("", $email, "", "", "", "");
if ( $usuario->existe() ){
    echo(json_encode(false));
}else{
    echo(json_encode(true));
}
