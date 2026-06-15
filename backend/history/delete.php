<?php

header("Content-Type: application/json");

require_once "../config/database.php";

$id = $_GET["id"] ?? 0;

$sql = "
DELETE FROM lookup_history
WHERE id = ?
";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "i",
    $id
);

$stmt->execute();

echo json_encode([
    "success" => true
]);