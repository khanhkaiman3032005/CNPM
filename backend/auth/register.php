<?php

header("Content-Type: application/json");

require_once "../config/database.php";

// Lấy dữ liệu từ form
$fullname = $_POST["fullname"] ?? "";
$username = $_POST["username"] ?? "";
$email = $_POST["email"] ?? "";
$password = $_POST["password"] ?? "";

// Kiểm tra dữ liệu rỗng
if (
    empty($fullname) ||
    empty($username) ||
    empty($email) ||
    empty($password)
) {
    echo json_encode([
        "success" => false,
        "message" => "Vui lòng nhập đầy đủ thông tin"
    ]);
    exit;
}

// Kiểm tra username hoặc email đã tồn tại chưa
$check = mysqli_query(
    $conn,
    "SELECT * FROM users
     WHERE username='$username'
     OR email='$email'"
);

if (mysqli_num_rows($check) > 0) {

    echo json_encode([
        "success" => false,
        "message" => "Tài khoản đã tồn tại"
    ]);

    exit;
}

// Thêm tài khoản mới
$sql = "
INSERT INTO users (
    fullname,
    username,
    email,
    password,
    role
)
VALUES (
    '$fullname',
    '$username',
    '$email',
    '$password',
    'doctor'
)
";

if (mysqli_query($conn, $sql)) {

    echo json_encode([
        "success" => true,
        "message" => "Đăng ký thành công"
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => mysqli_error($conn)
    ]);
}