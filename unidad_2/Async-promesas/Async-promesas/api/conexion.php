<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// conexion a la base de datos
$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "webII_2026";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(["error" => "Error de conexion: " . $conn->connect_error]));
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    // ================= GET =================
    case 'GET':
        $id = $_GET['id'] ?? null;

        if ($id) {
            $stmt = $conn->prepare("SELECT * FROM clientes WHERE id = ?");
            $stmt->bind_param("s", $id);
            $stmt->execute();
            $result  = $stmt->get_result();
            $cliente = $result->fetch_assoc();

            if ($cliente) {
                echo json_encode($cliente);
            } else {
                http_response_code(404);
                echo json_encode(["error" => "Cliente no encontrado"]);
            }
        } else {
            $result   = $conn->query("SELECT * FROM clientes");
            $clientes = [];
            while ($row = $result->fetch_assoc()) {
                $clientes[] = $row;
            }
            echo json_encode($clientes);
        }
    break;

    // ================= POST =================
    case 'POST':
        $input = json_decode(file_get_contents("php://input"), true);

        if (!isset($input['nombre'], $input['email'])) {
            http_response_code(400);
            echo json_encode(["error" => "Faltan datos"]);
            break;
        }

        $nombre = $input['nombre'];
        $email  = $input['email'];

        $stmt = $conn->prepare("INSERT INTO clientes (nombre, email) VALUES (?, ?)");
        $stmt->bind_param("ss", $nombre, $email);

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["message" => "Cliente creado", "id" => $conn->insert_id]);
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

        $id     = $input['id'];
        $nombre = $input['nombre'];
        $email  = $input['email'];

        $stmt = $conn->prepare("UPDATE clientes SET nombre = ?, email = ? WHERE id = ?");
        $stmt->bind_param("sss", $nombre, $email, $id);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Cliente actualizado"]);
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

        $stmt = $conn->prepare("DELETE FROM clientes WHERE id = ?");
        $stmt->bind_param("s", $id);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Cliente eliminado"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al eliminar: " . $stmt->error]);
        }
    break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Metodo no permitido"]);
}

$conn->close();
?>
