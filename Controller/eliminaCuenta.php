<?php

include_once '../Model/Usuario.php';
include_once '../Controller/sesionCheck.php';

// Recoge Variables
$nombre = $_POST['nombre'];


 // Construye objeto usuario
 $userVacio = new Usuario($nombre, "", "", "", "", "","");
 // Lo borra de la base de datos, y de la sesion
 $userVacio->delete();
 unset($_SESSION['usuario']);
