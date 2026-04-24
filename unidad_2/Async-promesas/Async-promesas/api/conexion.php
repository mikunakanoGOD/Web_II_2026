<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 🔹 Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "webII_2026";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(["error" => "Error de conexión: " . $conn->connect_error]));
}

// 🔹 Método HTTP
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    // ================= GET =================
    case 'GET':
        $id = $_GET['id'] ?? null;

        if ($id) {
            $stmt = $conn->prepare("SELECT * FROM usuarios WHERE id = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            $usuario = $result->fetch_assoc();

            if ($usuario) {
                echo json_encode($usuario);
            } else {
                http_response_code(404);
                echo json_encode(["error" => "Usuario no encontrado"]);
            }
        } else {
            $result = $conn->query("SELECT * FROM usuarios");
            $usuarios = [];

            while ($row = $result->fetch_assoc()) {
                $usuarios[] = $row;
            }

            echo json_encode($usuarios);
        }
    break;

    // ================= POST =================
    case 'POST':
        $input = json_decode(file_get_contents("php://input"), true);

        if (!isset($input['nombre']) || !isset($input['email'])) {
            http_response_code(400);
            echo json_encode(["error" => "Faltan datos"]);
            break;
        }

        $nombre = $input['nombre'];
        $email = $input['email'];

        $stmt = $conn->prepare("INSERT INTO usuarios (nombre, email) VALUES (?, ?)");
        $stmt->bind_param("ss", $nombre, $email);

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode([
                "message" => "Usuario creado",
                "id" => $conn->insert_id
            ]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al crear: " . $stmt->error]);
        }
    break;

    // ================= PUT =================
    case 'PUT':
        $input = json_decode(file_get_contents("php://input"), true);

        if (!isset($input['id'], $input['nombre'], $input['email'])) {
            http_response_code(400);
            echo json_encode(["error" => "Faltan datos"]);
            break;
        }

        $id = $input['id'];
        $nombre = $input['nombre'];
        $email = $input['email'];

        $stmt = $conn->prepare("UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?");
        $stmt->bind_param("ssi", $nombre, $email, $id);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Usuario actualizado"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al actualizar: " . $stmt->error]);
        }
    break;

    // ================= DELETE =================
    case 'DELETE':
        $id = $_GET['id'] ?? null;

        if (!$id) {
            http_response_code(400);
            echo json_encode(["error" => "ID no proporcionado"]);
            break;
        }

        $stmt = $conn->prepare("DELETE FROM usuarios WHERE id = ?");
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Usuario eliminado"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al eliminar: " . $stmt->error]);
        }
    break;

    // ================= ERROR =================
    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
}

$conn->close();
?>