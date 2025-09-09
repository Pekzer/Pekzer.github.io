<?php
include 'connection.php';

header('Content-Type: application/json');

// CREATE
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $sql = "INSERT INTO Proyectos (nombre, enlace) VALUES (?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$data['nombre'], $data['enlace']]);
    echo json_encode(['id' => $pdo->lastInsertId()]);
}

// READ
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {
        $stmt = $pdo->prepare("SELECT * FROM Proyectos WHERE id = ?");
        $stmt->execute([$_GET['id']]);
        $result = $stmt->fetch();
    } else {
        $stmt = $pdo->query("SELECT * FROM Proyectos");
        $result = $stmt->fetchAll();
    }
    echo json_encode($result);
}

// UPDATE
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    $sql = "UPDATE Proyectos SET nombre = ?, enlace = ? WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$data['nombre'], $data['enlace'], $data['id']]);
    echo json_encode(['mensaje' => 'Actualizado correctamente']);
}

// DELETE
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $pdo->prepare("DELETE FROM Proyectos WHERE id = ?");
    $stmt->execute([$data['id']]);
    echo json_encode(['mensaje' => 'Eliminado correctamente']);
}
?>