<?php

header("Content-Type: application/json");

require_once "../config/database.php";

$sql = "
SELECT
    lh.searched_at,
    lh.result,
    u.fullname,
    dr.drug_name,
    ds.disease_name

FROM lookup_history lh

LEFT JOIN users u
ON lh.user_id = u.id

LEFT JOIN drugs dr
ON lh.drug_id = dr.id

LEFT JOIN diseases ds
ON lh.disease_id = ds.id

ORDER BY lh.id DESC
LIMIT 5
";

$result = mysqli_query($conn,$sql);

$data = [];

while($row = mysqli_fetch_assoc($result)){
    $data[] = $row;
}

echo json_encode($data);