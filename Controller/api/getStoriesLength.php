<?php
/*
 * Get stories collection length
 */
require_once '../../Model/Historia.php';

$collectionLength = Historia::storiesLength();
header('Content-Type: application/json');
echo json_encode($collectionLength);


