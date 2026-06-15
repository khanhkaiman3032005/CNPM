<?php

header("Content-Type: application/json");

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

if(
    !isset($data["drug_code"])
){

    echo json_encode([
        "success" => false,
        "message" => "No data received"
    ]);

    exit;
}

$sql = "INSERT INTO drugs
(
    drug_code,
    drug_name,
    active_ingredient,
    drug_group,
    indication,
    contraindication,
    side_effect
)
VALUES
(
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?
)";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "sssssss",
    $data["drug_code"],
    $data["drug_name"],
    $data["active_ingredient"],
    $data["drug_group"],
    $data["indication"],
    $data["contraindication"],
    $data["side_effect"]
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