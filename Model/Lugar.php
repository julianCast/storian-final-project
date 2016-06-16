<?php

require_once 'StorianDB.php';

/**
 * Description of Lugar
 * Clase que incluye el lugar de la historia
 * @author Julian Garcia Castillo
 */

class Lugar {

    // Atributos de instancia
    private $nombre;
    private $sexo;
    
    // Constructor
    function __construct($nombre) {
        $this->nombre = $nombre;
        $this->sexo();
    }

    
    // Getter and Setter
    function getNombre() {
        return $this->nombre;
    }

    function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    function getSexo() {
        return $this->sexo;
    }

    function setSexo($sexo) {
        $this->sexo = $sexo;
    }
    public function __toString() {
        return "<b>LUGAR<b/><br>".
                    "Nombre: " . $this->getNombre() . "<br>".
                    "Sexo: " . $this->getSexo() . "<br>";
    }

        
    // Devuelve un sexo de Lugar
    public  function sexo(){
        $ultLetranNom = substr($this->getNombre(), -1) ;
        
        if ($ultLetranNom=="a"){
            $this->sexo = "femenino";
        }else{
          $this->sexo = "masculino";
        }
        
    }
    

   
   
   
   
}
