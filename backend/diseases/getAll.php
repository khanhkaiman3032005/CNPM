<?php

header("Content-Type: application/json");

require_once "../config/database.php";

$sql = "SELECT * FROM diseases ORDER BY id DESC";

$result = mysqli_query($conn, $sql);

$data = [];

while($row = mysqli_fetch_assoc($result))
{
    $data[] = $row;
}

echo json_encode($data);

?>