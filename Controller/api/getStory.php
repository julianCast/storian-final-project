<?php
/*
 * Procesa los datos recibidos de estructura.js a traves de ajax y crea la historia con las caracteristicas elegidas por el user.
 */
require_once '../../Model/Historia.php';
require_once '../../Model/Personaje.php';
require_once '../../Model/Lugar.php';

/* 
PARAMETERS RECEIVED
*/
$nameP1 = ucfirst(strtolower($_POST['nameP1']));
$typeP1 = strtolower($_POST['typeP1']);
$sexP1 = $_POST['sexP1'];
$nameP2 = ucfirst(strtolower($_POST['nameP2']));
$typeP2 = strtolower($_POST['typeP2']);
$sexP2 = $_POST['sexP2'];
$placeName = strtolower($_POST['place']);

// Stories already read by user
$readStories = $_POST['read_stories'];
// Language user 
$lang = $_POST['lang'];


// Crear personajes y lugar.
$character1 = new Personaje($nameP1, $typeP1);
$character2 = new Personaje($nameP2, $typeP2);
$place = new Lugar($placeName);

// SPANISH
if ($lang == "es") {
  // Articulos
    // Personaje 1
    if ($character1->getSexo() == "masculino"){
      $artDetP1m = "El"; $artDetP1 = "el"; $oaP1 = "o"; $pronP1 = "él"; $detIndP1 = "un"; $neutP1 = "lo";
    }else{
      $artDetP1m = "La"; $artDetP1 = "la"; $oaP1 = "a"; $pronP1 = "ella"; $detIndP1 = "una"; $neutP1 = "la";
    }
    // Personaje 2
    if ($character2->getSexo() == "masculino"){
      $artDetP2m = "El"; $artDetP2 = "el"; $oaP2 = "o"; $pronP2 = "él"; $detIndP2 = "un"; $neutP2 = "lo";
    }else{
      $artDetP2m = "La"; $artDetP2 = "la"; $oaP2 = "a"; $pronP2 = "ella"; $detIndP2 = "una"; $neutP2 = "la";
    }
    // Lugar
    if ($place->getSexo() == "masculino"){
      $artDetLum = "El"; $artDetLu = "el"; $oaLu = "o"; $detIndLu = "un";
    }else{
      $artDetLum = "La"; $artDetLu = "la"; $oaLu = "a"; $detIndLu = "una";
    }
// ENGLISH
} else {
  // character 1
  if ($sexP1 == "male"){
    $pronP1 = "he"; $neutP1 = "his";
  } else{
    $pronP1 = "she"; $neutP1 = "her";
  }
  // character 2
  if ($sexP2 == "male"){
    $pronP2 = "he"; $neutP2 = "his";
  } else{
    $pronP2 = "she"; $neutP2 = "her";
  }
  // Place has no genre
}

// Get random story from DB
if ($readStories) {
  do {
    $rndStory = Historia::random($lang);
  } while (!_isStoryUnique($rndStory->id));
} else {
  $rndStory = Historia::random($lang);
}

// Get specific language
if ($lang == "es") {
  $langTitle = titulo_es;
  $langStory = contenido_es;
} else {
  $langTitle = titulo_en;
  $langStory = contenido_en;
}

$historia = new Historia($rndStory->id, $rndStory->$langTitle, $rndStory->$langStory, $rndStory->autor, $rndStory->fecha);

// Aumentar numero de Cuentos leidos por ese user
// $usuario = new Usuario($usuarioSes,"","","","","");
// $usuario->addNumLeidos();

// Get story info
  $title = $historia->getTitulo();
  $storyText = $historia->getContenido();
  $author = $historia->getAutor();


    // Spanish attributes
    if ( $lang == "es" ) {
      // Character #1
      $title = str_replace("artDetP1m",$artDetP1m,$title);
      $title = str_replace("artDetP1",$artDetP1,$title);
      $title = str_replace("oaP1",$oaP1,$title);
      $title = str_replace("detIndP1",$detIndP1,$title);
      $storyText = str_replace("artDetP1m",$artDetP1m,$storyText);
      $storyText = str_replace("artDetP1",$artDetP1,$storyText);
      $storyText = str_replace("oaP1",$oaP1,$storyText);
      $storyText = str_replace("detIndP1",$detIndP1,$storyText);
      // Character #2
      $title = str_replace("artDetP2m",$artDetP2m,$title);
      $title = str_replace("artDetP2",$artDetP2,$title);
      $title = str_replace("oaP2",$oaP2,$title);
      $title = str_replace("detIndP2",$detIndP2,$title);
      $storyText = str_replace("artDetP2m",$artDetP2m,$storyText);
      $storyText = str_replace("artDetP2",$artDetP2,$storyText);
      $storyText = str_replace("oaP2",$oaP2,$storyText);
      $storyText = str_replace("detIndP2",$detIndP2,$storyText);

      // Place
      $title = str_replace("artDetLum",$artDetLum,$title);
      $title = str_replace("artDetLu",$artDetLu,$title);
      $title = str_replace("oaLu",$oaLu,$title);
      $title = str_replace("detIndLu",$detIndLu,$title);
      $storyText = str_replace("artDetLum",$artDetLum,$storyText);
      $storyText = str_replace("artDetLu",$artDetLu,$storyText);
      $storyText = str_replace("oaLu",$oaLu,$storyText);
      $storyText = str_replace("nomLug",$place,$storyText);
      $storyText = str_replace("detIndLu",$detIndLu,$storyText);
    }
    // Common attributes 
      // Character #1
      $title = str_replace("nombP1i",$nameP1,$title);
      $title = str_replace("tipoP1i",$typeP1,$title);
      $title = str_replace("pronP1",$pronP1,$title);
      $title = str_replace("neutP1",$neutP1,$title);
      $storyText = str_replace("nombP1i",$nameP1,$storyText);
      $storyText = str_replace("tipoP1i",$typeP1,$storyText);
      $storyText = str_replace("pronP1",$pronP1,$storyText);
      $storyText = str_replace("neutP1",$neutP1,$storyText);

      // Character #2
      $title = str_replace("nombP2i",$nameP2,$title);
      $title = str_replace("tipoP2i",$typeP2,$title);
      $title = str_replace("pronP2",$pronP2,$title);
      $title = str_replace("neutP2",$neutP2,$title);
      $storyText = str_replace("nombP2i",$nameP2,$storyText);
      $storyText = str_replace("tipoP2i",$typeP2,$storyText);
      $storyText = str_replace("pronP2",$pronP2,$storyText);
      $storyText = str_replace("neutP2",$neutP2,$storyText);
      // Place
      $title = str_replace("nomLui",$placeName,$title);
      $storyText = str_replace("nomLui",$placeName,$storyText);

  // Send data as array
  $arrayHistoria = array(
      "title" => $title,
      "story" => $storyText,
      "author" => $author,
      "storyID" => $rndStory->id
  );
  header('Content-Type: application/json');

  echo json_encode($arrayHistoria);

// Check if @id parameter is found in array
  function _isStoryUnique($id) {
    foreach ($readStories as &$key) {
      if ($id != $key) {
        return true;
        break;
      } 
    }
  }
