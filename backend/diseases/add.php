<?php

header("Content-Type: application/json");

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

if(
    !isset($data["disease_code"])
)
{
    echo json_encode([
        "success" => false
    ]);

    exit;
}

$sql = "INSERT INTO diseases
(
    disease_code,
    disease_name,
    description,
    symptoms,
    disease_group
)
VALUES
(
    ?,
    ?,
    ?,
    ?,
    ?
)";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "sssss",
    $data["disease_code"],
    $data["disease_name"],
    $data["description"],
    $data["symptoms"],
    $data["disease_group"]
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