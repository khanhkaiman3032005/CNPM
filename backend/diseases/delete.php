<?php

header("Content-Type: application/json");

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"];

$sql = "DELETE FROM diseases WHERE id = ?";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "i",
    $id
);

if($stmt->execute())
{
    echo json_encode([
        "success" => true
    ]);
}
else
{
    echo json_encode([
        "success" => false
    ]);
}

?>