<?php

header("Content-Type: application/json");

require_once "../config/database.php";

$username =
    $_POST["username"] ?? "";

$password =
    $_POST["password"] ?? "";

$sql =
"SELECT * FROM users
WHERE username = ?";

$stmt =
mysqli_prepare(
    $conn,
    $sql
);

mysqli_stmt_bind_param(
    $stmt,
    "s",
    $username
);

mysqli_stmt_execute(
    $stmt
);

$result =
mysqli_stmt_get_result(
    $stmt
);

if(mysqli_num_rows($result) > 0){

    $user =
    mysqli_fetch_assoc(
        $result
    );

    if(
        $password ===
        $user["password"]
    ){

        echo json_encode([
            "success" => true,
            "user" => $user
        ]);

    }else{

        echo json_encode([
            "success" => false,
            "message" => "Sai mật khẩu"
        ]);

    }

}else{

    echo json_encode([
        "success" => false,
        "message" => "Tài khoản không tồn tại"
    ]);

}