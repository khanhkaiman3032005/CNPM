<?php

header("Content-Type: application/json");

require_once "../config/database.php";

$sql = "
SELECT COUNT(*) total
FROM lookup_history
WHERE result='Nghiêm trọng'
";

$result =
mysqli_query($conn,$sql);

$row =
mysqli_fetch_assoc($result);

echo json_encode($row);