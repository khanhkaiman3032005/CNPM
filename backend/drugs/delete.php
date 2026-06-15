<?php

header("Content-Type: application/json");

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

if(!isset($data["id"])){

    echo json_encode([
        "success" => false,
        "message" => "Missing ID"
    ]);

    exit;
}

$id = $data["id"];

$sql = "DELETE FROM drugs WHERE id = ?";

$stmt = $conn->prepare($sql);

$stmt->bind_param("i", $id);

if($stmt->execute()){

    echo json_encode([
        "success" => true
    ]);

}else{

    echo json_encode([
        "success" => false
    ]);

}