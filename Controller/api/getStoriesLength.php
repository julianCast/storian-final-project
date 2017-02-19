<?php
/*
 * Get stories collection length
 */
require_once '../Model/Historia.php';
require_once '../Controller/sesionCheck.php';

$collectionLength = Historia::storiesLength();
return json_encode($collectionLength);


