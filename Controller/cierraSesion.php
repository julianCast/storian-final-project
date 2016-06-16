<?php

include '../Controller/sesionCheck.php';
// Vacia variable de sesion
unset($_SESSION['usuario']);
// Redirige a index.php
header('Location: /storian/modos');
