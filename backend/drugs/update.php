<?php

header("Content-Type: application/json");

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$sql = "
UPDATE drugs
SET
drug_code = ?,
drug_name = ?,
active_ingredient = ?,
drug_group = ?,
indication = ?,
contraindication = ?,
side_effect = ?
WHERE id = ?
";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "sssssssi",
    $data["drug_code"],
    $data["drug_name"],
    $data["active_ingredient"],
    $data["drug_group"],
    $data["indication"],
    $data["contraindication"],
    $data["side_effect"],
    $data["id"]
);

if($stmt->execute()){

    echo json_encode([
        "success" => true
    ]);

}else{

    echo json_encode([
        "success" => false
    ]);

}