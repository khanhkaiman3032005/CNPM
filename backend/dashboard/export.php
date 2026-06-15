<?php

require_once "../config/database.php";

header(
"Content-Type: application/vnd.ms-excel"
);

header(
"Content-Disposition: attachment; filename=bao_cao.xls"
);

echo
"Thoi gian\tNguoi tra cuu\tNoi dung\tKet qua\n";

$sql = "
SELECT
u.fullname,
dr.drug_name,
ds.disease_name,
lh.result,
lh.searched_at
FROM lookup_history lh
LEFT JOIN users u
ON lh.user_id = u.id
LEFT JOIN drugs dr
ON lh.drug_id = dr.id
LEFT JOIN diseases ds
ON lh.disease_id = ds.id
ORDER BY lh.id DESC
";

$result =
mysqli_query($conn,$sql);

while(
$row =
mysqli_fetch_assoc($result)
){

echo
$row["searched_at"] . "\t" .
$row["fullname"] . "\t" .
$row["drug_name"] .
" -> " .
$row["disease_name"] . "\t" .
$row["result"] .
"\n";

}