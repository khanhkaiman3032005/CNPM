<?php

header("Content-Type: application/json");

require_once "../config/database.php";

$sql = "
SELECT
DAYOFWEEK(searched_at) weekday,
COUNT(*) total

FROM lookup_history

GROUP BY DAYOFWEEK(searched_at)
";

$result = mysqli_query($conn,$sql);

$data = [];

while($row = mysqli_fetch_assoc($result)){
    $data[] = $row;
}

echo json_encode($data);