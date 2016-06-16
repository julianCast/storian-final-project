<?php

require_once 'StorianDB.php';

/**
 * Description of Personaje
 * Clase que incluye cada personaje
 * @author Julian Garcia Castillo
 */
class Usuario {

    // Atributos de instancia
    private $nombreUser;
    private $email;
    private $password;
    private $lugarNac;
    private $fechaNac;
    private $fechaAlt;
    private $numLeidos;

    // Constructor
    function __construct($nombreUser, $email, $password, $lugarNac, $fechaNac, $fechaAlt) {
        $this->nombreUser = $nombreUser;
        $this->email = $email;
        $this->password = sha1($password);
        $this->lugarNac = $lugarNac;
        $this->fechaNac = $fechaNac;
        $this->fechaAlt = $this->fechAltaVer();
        $this->numLeidos = $this->fetchNumLeidos();
    }

    // Getter and Setter
    function getNombreUser() {
        return $this->nombreUser;
    }

    function getEmail() {
        return $this->email;
    }

    function getPassword() {
        return $this->password;
    }

    function getLugarNac() {
        return $this->lugarNac;
    }

    function getFechaNac() {
        return $this->fechaNac;
    }

    function setNombreUser($nombreUser) {
        $this->nombreUser = $nombreUser;
    }

    function getFechaAlt() {
        return $this->fechaAlt;
    }

    function getNumLeidos($numLeidos) {
        return $this->$numLeidos;
    }

    function setEmail($email) {
        $this->email = $email;
    }

    function setPassword($password) {
        $this->password = $password;
    }

    function setLugarNac($lugarNac) {
        $this->lugarNac = $lugarNac;
    }

    function setFechaNac($fechaNac) {
        $this->fechaNac = $fechaNac;
    }

    function setFechaAlt($fechaAlt) {
        $this->fechaAlt = $fechaAlt;
    }
    function setNumLeidos($numLeidos) {
        $this->$numLeidos = $numLeidos;
    }

    public function __toString() {
        return "<b>Usuario</b><br>" .
                "Nombre: " . $this->getNombreUser() . "<br>" .
                "Email: " . $this->getEmail() . "<br>" .
                "Lugar de Nacimiento: " . $this->getLugarNac() . "<br>" .
                "Fecha de alta: " . $this->getFechaAlt() . "<br>" .
                "Fecha de Nacimiento: " . $this->getFechaNac() . "<br>" .
                "Numero de historias: " . $this->numHistorias() . "<br>";
    }

    // Funciones
    // Alta de un usuario
    public function insert() {
        $conexion = StorianDB::connectDB();
        $insercion = "INSERT INTO `Storian`.`usuario` (`nombreUser`, `email`, `password`, `lugarNacimiento`, `fechNac`, `fechAlta`) VALUES ('" . $this->nombreUser . "','" . $this->email . "', '" . $this->password . "','" . $this->lugarNac . "','" . $this->fechaNac . "',CURRENT_TIMESTAMP);";
        $conexion->exec($insercion);
    }

    // Baja de un usuario
    public function delete() {
        $conexion = StorianDB::connectDB();
        $borrado = "DELETE FROM usuario WHERE nombreUser='".$this->getNombreUser()."'";
        $conexion->exec($borrado);
    }

    // Comprobar si existe el nombre de usuario o email esta ya usado en la base de datos
    public function existe() {
        $conexion = StorianDB::connectDB();
        $queryEmail = $conexion->query("SELECT * FROM `usuario` WHERE `email` LIKE '" . $this->getEmail() . "'");
        $queryNombre = $conexion->query("SELECT * FROM `usuario` WHERE `nombreUser` LIKE '" . $this->getNombreUser() . "'");
        $nEmails = $queryEmail->rowCount();
        $nNombres = $queryNombre->rowCount();
        if ( $nNombres > 0  ||  $nEmails > 0 ) {
         return true;
        }else{return false;}
    }

    // Comprobar si coincide el nombre y pass de usuarios en la BD
    public function acceso() {
        $conexion = StorianDB::connectDB();
        $query = $conexion->query("SELECT * FROM `usuario` WHERE `nombreUser` LIKE '" . $this->getNombreUser() . "' AND `password` LIKE '" . $this->getPassword() . "'");

        $nCoincidencias = $query->rowCount();

        if ($nCoincidencias > 0) {
            return true;
        } else {
            return false;
        }
    }

    //Informacion de usuario
    public function obtenInfo() {
        $conexion = StorianDB::connectDB();
        $query = $conexion->query("SELECT * FROM `usuario` WHERE `nombreUser` LIKE '" . $this->getNombreUser() . "'");
        return $tabla = $query->fetchObject();
    }

    // Numero de historias
    public function numHistorias() {
        $conexion = StorianDB::connectDB();
        $query = $conexion->query("SELECT * FROM `cuento` WHERE `autor` LIKE '" . $this->getEmail() . "'");
        return $query->rowCount();
    }

    // Historias del usuario
    public function Historias() {
        $conexion = StorianDB::connectDB();
        $query = $conexion->query("SELECT * FROM `cuento` WHERE `autor` LIKE '" . $this->getEmail() . "'");
        return $tabla = $query->fetchObject();
    }

    // Sacar fecha de alta
    public function fechAltaVer() {
        $conexion = StorianDB::connectDB();
        $query = $conexion->query("SELECT fechAlta FROM `usuario` WHERE `email` LIKE '" . $this->getEmail() . "'");
        $tabla = $query->fetchObject();
        $resultado = $tabla->fechAlta;
        // Extraer solo fecha
        $timestamp = strtotime($resultado);
        $date = date('d-m-Y', $timestamp);
        return $date;
    }
    // Coger contador cuentos leidos
    public function fetchNumLeidos() {
        $conexion = StorianDB::connectDB();
        $query = $conexion->query("SELECT numLeidos FROM `usuario` WHERE `usuario`.`nombreUser` = '".$this->getNombreUser()."';");
        $tabla = $query->fetchObject();
        $numLeidos = $tabla->numLeidos;
        return $numLeidos;
    }
    // Aumentar contador cuentos leidos
    public function addNumLeidos() {
        $conexion = StorianDB::connectDB();
        $query = $conexion->query("SELECT numLeidos FROM `usuario` WHERE `usuario`.`nombreUser` = '".$this->getNombreUser()."';");
        $tabla = $query->fetchObject();
        $numLeidos = $tabla->numLeidos;
        $numLeidos = $numLeidos+1;
        $this->setNumLeidos($numLeidos);

        $insercion = "UPDATE usuario SET `numLeidos`= '$numLeidos' WHERE `usuario`.`nombreUser` = '".$this->getNombreUser()."';";
        $conexion->exec($insercion);
    }
}
