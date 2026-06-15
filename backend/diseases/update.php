<?php

header("Content-Type: application/json");

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$sql = "
UPDATE diseases
SET
disease_code = ?,
disease_name = ?,
description = ?,
symptoms = ?,
disease_group = ?
WHERE id = ?
";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "sssssi",
    $data["disease_code"],
    $data["disease_name"],
    $data["description"],
    $data["symptoms"],
    $data["disease_group"],
    $data["id"]
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