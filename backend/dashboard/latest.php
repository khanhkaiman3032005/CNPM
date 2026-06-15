<?php

header("Content-Type: application/json");

require_once "../config/database.php";

$sql = "
SELECT
dr.drug_name,
ds.disease_name,
lh.result,
lh.searched_at
FROM lookup_history lh
LEFT JOIN drugs dr
ON lh.drug_id = dr.id
LEFT JOIN diseases ds
ON lh.disease_id = ds.id
ORDER BY lh.id DESC
LIMIT 1
";

$result = mysqli_query($conn,$sql);

$data = mysqli_fetch_assoc($result);

echo json_encode($data);