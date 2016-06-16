<?php

/**
 * Description of StorianDB
 * Clase que contiene la conexion a la base de datos.
 * @author Julian Garcia Castillo
 */

abstract class StorianDB {
    private static $server = 'localhost';
    private static $db = 'Storian';
    private static $user = 'root';
    private static $password = 'root';
    
    public static function connectDB() {
    try {
      $connection = new PDO("mysql:host=".self::$server.";dbname=".self::$db.";charset=utf8", self::$user, self::$password);
    } catch (PDOException $e) {
      echo "No se ha podido establecer conexión con el servidor de bases de datos.<br>";
      die ("Error: " . $e->getMessage());
    }
 
    return $connection;
  }

}
