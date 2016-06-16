<?php
require_once '../Model/Usuario.php';



if (isset($_POST['username'])){
     //$nombreUser = PDO::quote($_POST['username']);
     $nombreUser = $_POST['username'];
     $email = $_POST['email'];
     $fechNac = $_POST['date'];
     $password = $_POST['password'];
     // Convierte el formato de la fecha al de sql
     $date = date('Y-m-d', strtotime($fechNac));

    $usuario = new Usuario($nombreUser, $email, $password, "españa", $date, "","");
    $usuario->insert();
    return true;
    }
