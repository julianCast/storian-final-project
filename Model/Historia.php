<?php

require_once 'StorianDB.php';

/**
 * Description of Historia
 * Clase que es la historia.
 * @author Julian Garcia Castillo
 */

class Historia {

    // Atributos de instancia
    private $id;
    private $titulo;
    private $contenido;
    private $autor;
    private $fecha;

    // Constructor
    function __construct($id, $titulo, $contenido, $autor, $fecha) {
        $this->id = $id;
        $this->titulo = $titulo;
        $this->contenido = $contenido;
        $this->autor = $autor;
        $this->fecha = $fecha;
    }


    // Getter and Setter
    function getId() {
        return $this->id;
    }

    function getTitulo() {
        return $this->titulo;
    }

    function getContenido() {
        return $this->contenido;
    }

    function getAutor() {
        return $this->autor;
    }

    function getFecha() {
        return $this->fecha;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setTitulo($titulo) {
        $this->titulo = $titulo;
    }

    function setContenido($contenido) {
        $this->contenido = $contenido;
    }

    function setAutor($autor) {
        $this->autor = $autor;
    }

    function setFecha($fecha) {
        $this->fecha = $fecha;
    }

    // String
    public function __toString() {
        return "<b>HISTORIA</b><br>".
                    "Titulo: " . $this->getTitulo() . "<br>".
                    "Contenido: " . $this->getContenido() . "<br>".
                    "Autor: " . $this->getAutor() . "<br>".
                    "Fecha: " . $this->getFecha() . "<br>";
    }


    // Funciones
    // Alta de un cuento
    public function insert() {
        $conexion = StorianDB::connectDB();
        $insercion = "INSERT INTO cuento (titulo, contenido, autor) VALUES (\"".$this->titulo."\", \"".$this->contenido."\", \"".$this->autor."\")";
        $conexion->exec($insercion);
    }
    // Baja de un cuento
    public function delete() {
        $conexion = StorianDB::connectDB();
        $borrado = "DELETE FROM cuento WHERE id=\"".$this->id."\"";
        $conexion->exec($borrado);
    }
    // Baja de un cuento v2. NO requiere crear un objeto tonto. Historia::deleteAux(id);
    public static function deleteAux($id){
        $conexion = StorianDB::connectDB();
        $borrado = "DELETE FROM cuento WHERE  id='" . $id . "'";
        $conexion->exec($borrado);
    }
    public function toJSON(){
        $out = new stdClass();
        $out->id = $this->id;
        $out->titulo = $this->titulo;
        $out->contenido = $this->contenido;
        $out->autor = $this->autor;
        $out->fecha = $this->fecha;
        return json_encode($out);
    }
    // Devuelve un cuento random.
    public static function random($language){
        if (!$language) {
            $language = "es";
        }
        $conexion = StorianDB::connectDB();
        $query = $conexion->query("SELECT * FROM cuento WHERE lang='".$language."'  ORDER BY RAND() LIMIT 1");
        return $tabla = $query->fetchObject();
    }






}
