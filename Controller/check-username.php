<?php
header('Content-type: application/json');
require_once '../Model/Usuario.php';

$username = $_POST['username'];

$usuario = new Usuario($username, "", "", "", "", "");
if ( $usuario->existe() ){
    echo(json_encode(false));
}else{
    echo(json_encode(true));
}
