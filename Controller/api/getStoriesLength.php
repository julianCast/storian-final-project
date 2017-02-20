<?php
/*
 * Get stories collection length
 */
require_once '../../Model/Historia.php';

$collectionLength = Historia::storiesLength();

echo json_encode($collectionLength);


