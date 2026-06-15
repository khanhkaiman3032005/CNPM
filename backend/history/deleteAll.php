<?php

header("Content-Type: application/json");

require_once "../config/database.php";

mysqli_query(
    $conn,
    "TRUNCATE TABLE lookup_history"
);

echo json_encode([
    "success" => true
]);