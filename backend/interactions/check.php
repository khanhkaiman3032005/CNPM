<?php

header("Content-Type: application/json");

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);
$userId = $data["user_id"];

if(
    !isset($data["drug_id"]) ||
    !isset($data["disease_id"])
){
   


    echo json_encode([
        "success" => false
    ]);
    exit;
}

$sql = "
SELECT *
FROM drug_disease_interactions
WHERE drug_id = ?
AND disease_id = ?
";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "ii",
    $data["drug_id"],
    $data["disease_id"]
);

$stmt->execute();

$result = $stmt->get_result();

if($row = $result->fetch_assoc()){

    $severity = $row["severity"];

    $saveSql = "
    INSERT INTO lookup_history(
        user_id,
        drug_id,
        disease_id,
        result
    )
    VALUES(?,?,?,?)
    ";
    
    $saveStmt = $conn->prepare($saveSql);
    
    
    $saveStmt->bind_param(
        "iiis",
        $userId,
        $data["drug_id"],
        $data["disease_id"],
        $severity
    );
    
    $saveStmt->execute();

    if($saveStmt->affected_rows > 0){
        error_log("Luu lich su thanh cong");
    }
    echo json_encode([
        "success" => true,
        "interaction" => $row
    ]);

}else{

    $severity = "Không có tương tác";

    $saveSql = "
    INSERT INTO lookup_history(
        user_id,
        drug_id,
        disease_id,
        result
    )
    VALUES(?,?,?,?)
    ";
    
    $saveStmt = $conn->prepare($saveSql);
    
    
    $saveStmt->bind_param(
        "iiis",
        $userId,
        $data["drug_id"],
        $data["disease_id"],
        $severity
    );
    
    $saveStmt->execute();

    if($saveStmt->affected_rows > 0){
        error_log("Luu lich su thanh cong");
    }

    echo json_encode([
        "success" => true,
        "interaction" => null
    ]);
}