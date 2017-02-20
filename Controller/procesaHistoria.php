<?php
/*
 * Procesa los datos recibidos de estructura.js a traves de ajax y crea la historia con las caracteristicas elegidas por el user.
 */
require_once '../Model/Historia.php';
require_once '../Model/Personaje.php';
require_once '../Model/Lugar.php';
require_once '../Model/Usuario.php';
require_once '../Controller/sesionCheck.php';


// Recoge Variables
$nombreP1 = $_POST['nombreP1'];
$tipoP1 = $_POST['tipoP1'];
$nombreP2 = $_POST['nombreP2'];
$tipoP2 = $_POST['tipoP2'];
$nomLui = $_POST['lugar'];

// Crear personajes y lugar.
$personaje1 = new Personaje($nombreP1, $tipoP1);
$personaje2 = new Personaje($nombreP2, $tipoP2);
$lugar = new Lugar($nomLui);

// Articulos
    // Personaje 1
        if ($personaje1->getSexo() == "masculino"){
            $artDetP1m = "El"; $artDetP1 = "el"; $oaP1 = "o"; $pronP1 = "él"; $detIndP1 = "un"; $neutP1 = "lo";
        }else{
            $artDetP1m = "La"; $artDetP1 = "la"; $oaP1 = "a"; $pronP1 = "ella"; $detIndP1 = "una"; $neutP1 = "la";
          }
    // Personaje 2
        if ($personaje2->getSexo() == "masculino"){
            $artDetP2m = "El"; $artDetP2 = "el"; $oaP2 = "o"; $pronP2 = "él"; $detIndP2 = "un"; $neutP2 = "lo";
        }else{
            $artDetP2m = "La"; $artDetP2 = "la"; $oaP2 = "a"; $pronP2 = "ella"; $detIndP2 = "una"; $neutP2 = "la";
          }
    // Lugar
         if ($lugar->getSexo() == "masculino"){
            $artDetLum = "El"; $artDetLu = "el"; $oaLu = "o"; $detIndLu = "un";
        }else{
            $artDetLum = "La"; $artDetLu = "la"; $oaLu = "a"; $detIndLu = "una";
        }
// Selecciona historia random de DB
$historiaRnd = Historia::random();
$historia = new Historia($historiaRnd->id, $historiaRnd->titulo_es, $historiaRnd->contenido_es, $historiaRnd->autor, $historiaRnd->fecha);

// Aumentar numero de Cuentos leidos por ese user
$usuario = new Usuario($usuarioSes,"","","","","");
$usuario->addNumLeidos();

// Extrae titulo y contenido y autor
    $titulo = $historia->getTitulo();
    $contenido = $historia->getContenido();
    $autor = $historia->getAutor();


// Personaliza historia
    // Titulo
        // Personaje 1
    $titulo = str_replace("artDetP1m",$artDetP1m,$titulo);
    $titulo = str_replace("artDetP1",$artDetP1,$titulo);
    $titulo = str_replace("nombP1i",$nombreP1,$titulo);
    $titulo = str_replace("tipoP1i",$tipoP1,$titulo);
    $titulo = str_replace("oaP1",$oaP1,$titulo);
    $titulo = str_replace("pronP1",$pronP1,$titulo);
    $titulo = str_replace("detIndP1",$detIndP1,$titulo);
    $titulo = str_replace("neutP1",$neutP1,$titulo);
        // Personaje 2
    $titulo = str_replace("artDetP2m",$artDetP2m,$titulo);
    $titulo = str_replace("artDetP2",$artDetP2,$titulo);
    $titulo = str_replace("nombP2i",$nombreP2,$titulo);
    $titulo = str_replace("tipoP2i",$tipoP2,$titulo);
    $titulo = str_replace("oaP2",$oaP2,$titulo);
    $titulo = str_replace("pronP2",$pronP2,$titulo);
    $titulo = str_replace("detIndP2",$detIndP2,$titulo);
    $titulo = str_replace("neutP2",$neutP2,$titulo);
        // Lugar
    $titulo = str_replace("artDetLum",$artDetLum,$titulo);
    $titulo = str_replace("artDetLu",$artDetLu,$titulo);
    $titulo = str_replace("oaLu",$oaLu,$titulo);
    $titulo = str_replace("detIndLu",$detIndLu,$titulo);
    $titulo = str_replace("nomLui",$nomLui,$titulo);

    // Historia
        // Personaje 1
    $contenido = str_replace("artDetP1m",$artDetP1m,$contenido);
    $contenido = str_replace("artDetP1",$artDetP1,$contenido);
    $contenido = str_replace("nombP1i",$nombreP1,$contenido);
    $contenido = str_replace("tipoP1i",$tipoP1,$contenido);
    $contenido = str_replace("oaP1",$oaP1,$contenido);
    $contenido = str_replace("pronP1",$pronP1,$contenido);
    $contenido = str_replace("detIndP1",$detIndP1,$contenido);
    $contenido = str_replace("neutP1",$neutP1,$contenido);
        // Personaje 2
    $contenido = str_replace("artDetP2m",$artDetP2m,$contenido);
    $contenido = str_replace("artDetP2",$artDetP2,$contenido);
    $contenido = str_replace("nombP2i",$nombreP2,$contenido);
    $contenido = str_replace("tipoP2i",$tipoP2,$contenido);
    $contenido = str_replace("oaP2",$oaP2,$contenido);
    $contenido = str_replace("pronP2",$pronP2,$contenido);
    $contenido = str_replace("detIndP2",$detIndP2,$contenido);
    $contenido = str_replace("neutP2",$neutP2,$contenido);
        // Lugar
    $contenido = str_replace("artDetLum",$artDetLum,$contenido);
    $contenido = str_replace("artDetLu",$artDetLu,$contenido);
    $contenido = str_replace("oaLu",$oaLu,$contenido);
    $contenido = str_replace("nomLug",$lugar,$contenido);
    $contenido = str_replace("detIndLu",$detIndLu,$contenido);
    $contenido = str_replace("nomLui",$nomLui,$contenido);


    // Envia historia como array
    $arrayHistoria = array(
        "titulo" => $titulo,
        "contenido" => $contenido,
        "autor" => $autor,
    );

    echo json_encode($arrayHistoria);
