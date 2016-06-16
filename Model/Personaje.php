<?php

require_once 'StorianDB.php';

/**
 * Description of Personaje
 * Clase que incluye cada personaje
 * @author Julian Garcia Castillo
 */

class Personaje {

    // Atributos de instancia
    private $nombre;
    private $tipo;
    private $sexo;

    // Constructor
    function __construct($nombre, $tipo) {
        $this->nombre = $nombre;
        $this->tipo = $tipo;
        $this->sexo();
    }


    // Getter and Setter
    function getNombre() {
        return $this->nombre;
    }

    function getTipo() {
        return $this->tipo;
    }

    function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    function setTipo($tipo) {
        $this->tipo = $tipo;
    }

    function getSexo() {
        return $this->sexo;
    }

    function setSexo($sexo) {
        $this->sexo = $sexo;
    }
    public function __toString() {
    return "<b>PERSONAJE</b><br>".
      "Nombre: " . $this->getNombre() . "<br>".
      "Tipo: " . $this->getTipo() . "<br>".
      "Sexo: " . $this->getSexo() . "<br>";
    }



    // Devuelve un sexo Personaje
    public  function sexo(){
        $ultLetranNom = substr($this->getNombre(), -1) ;
        $ultLetraTipo = substr($this->getTipo(), -1) ;
        $excepNomFem = array ("Rocio","Vero","Amparo");
        $excepNomMasc = array("Rafa","Seba");
        $excepTipoMasc = array("aguila","pez");
        $excepTipoFem = array("serpiente","anguila");

        if (( $ultLetraTipo=="a") || (($ultLetraTipo=="e" ) && ($ultLetranNom=="a"))){
            $this->sexo = "femenino";
        }else{
          $this->sexo = "masculino";
        }


        // Excepciones Nombre Fem
        foreach($excepNomFem as $value){
            if ($this->getNombre() == $value){
                $this->sexo = "femenino";
            }
        }
        // Excepciones Nombre Masc
        foreach($excepNomMasc as $value){
            if ($this->getNombre() == $value){
                $this->sexo = "masculino";
            }
        }
        // Excepciones Tipo Masc
        foreach($excepTipoMasc as $value){
            if ($this->getTipo() == $value){
                $this->sexo = "masculino";
            }
        }
        // Excepciones Tipo Fem
        foreach($excepTipoFem as $value){
            if ($this->getTipo() == $value){
                $this->sexo = "femenino";
            }
        }




    }






}
