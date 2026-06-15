<?php

header("Content-Type: application/json");

require_once "../config/database.php";

$drugCount =
mysqli_fetch_assoc(
    mysqli_query(
        $conn,
        "SELECT COUNT(*) total FROM drugs"
    )
)["total"];

$diseaseCount =
mysqli_fetch_assoc(
    mysqli_query(
        $conn,
        "SELECT COUNT(*) total FROM diseases"
    )
)["total"];

$interactionCount =
mysqli_fetch_assoc(
    mysqli_query(
        $conn,
        "SELECT COUNT(*) total FROM drug_disease_interactions"
    )
)["total"];

$searchCount =
mysqli_fetch_assoc(
    mysqli_query(
        $conn,
        "SELECT COUNT(*) total FROM lookup_history"
    )
)["total"];


echo json_encode([
    "drugs" => $drugCount,
    "diseases" => $diseaseCount,
    "interactions" => $interactionCount,
    "searches" => $searchCount,

]);

