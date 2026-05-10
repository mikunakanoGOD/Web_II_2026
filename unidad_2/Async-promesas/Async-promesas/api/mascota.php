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
        $id_mascota = $_GET['id'] ?? null;

        if ($id_mascota) {
            $stmt = $conn->prepare("SELECT * FROM mascotas WHERE id_mascota = ?");
            $stmt->bind_param("i", $id_mascota);
            $stmt->execute();
            $result  = $stmt->get_result();
            $mascota = $result->fetch_assoc();

            if ($mascota) {
                echo json_encode($mascota);
            } else {
                http_response_code(404);
                echo json_encode(["error" => "Mascota no encontrada"]);
            }
        } else {
            $result   = $conn->query("SELECT * FROM mascotas");
            $mascotas = [];
            while ($row = $result->fetch_assoc()) {
                $mascotas[] = $row;
            }
            echo json_encode($mascotas);
        }
    break;

    // ================= POST =================
    case 'POST':
        $input = json_decode(file_get_contents("php://input"), true);

        if (!isset($input['nombre'], $input['raza'], $input['edad'], $input['peso'], $input['id'])) {
            http_response_code(400);
            echo json_encode(["error" => "Faltan datos"]);
            break;
        }

        $nombre   = $input['nombre'];
        $raza     = $input['raza'];
        $edad     = $input['edad'];
        $peso     = $input['peso'];
        $id_dueno = $input['id'];

        $stmt = $conn->prepare("INSERT INTO mascotas (nombre, raza, edad, peso, id) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssi", $nombre, $raza, $edad, $peso, $id_dueno);

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["message" => "Mascota creada", "id_mascota" => $conn->insert_id]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al crear: " . $stmt->error]);
        }
    break;

    // ================= PUT =================
    case 'PUT':
        $input = json_decode(file_get_contents("php://input"), true);

        if (!isset($input['id_mascota'], $input['nombre'], $input['raza'], $input['edad'], $input['peso'], $input['id'])) {
            http_response_code(400);
            echo json_encode(["error" => "Faltan datos"]);
            break;
        }

        $id_mascota = $input['id_mascota'];
        $nombre     = $input['nombre'];
        $raza       = $input['raza'];
        $edad       = $input['edad'];
        $peso       = $input['peso'];
        $id_dueno   = $input['id'];

        $stmt = $conn->prepare("UPDATE mascotas SET nombre = ?, raza = ?, edad = ?, peso = ?, id = ? WHERE id_mascota = ?");
        $stmt->bind_param("ssssii", $nombre, $raza, $edad, $peso, $id_dueno, $id_mascota);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Mascota actualizada"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al actualizar: " . $stmt->error]);
        }
    break;

    // ================= DELETE =================
    case 'DELETE':
        $id_mascota = $_GET['id'] ?? null;

        if (!$id_mascota) {
            http_response_code(400);
            echo json_encode(["error" => "ID no proporcionado"]);
            break;
        }

        $stmt = $conn->prepare("DELETE FROM mascotas WHERE id_mascota = ?");
        $stmt->bind_param("i", $id_mascota);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Mascota eliminada"]);
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
