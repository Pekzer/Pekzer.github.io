<?php
include 'connection.php';

header('Content-Type: application/json');

// Añadir tecnología a proyecto
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $sql = "INSERT INTO ProyectosxTecnologias (idproyecto, idtecnologia) VALUES (?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$data['idproyecto'], $data['idtecnologia']]);
    echo json_encode(['mensaje' => 'Relación creada']);
}

// Obtener tecnologías de un proyecto
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $pdo->prepare("
        SELECT t.* FROM Tecnologias t
        INNER JOIN ProyectosxTecnologias pt ON t.id = pt.idtecnologia
        WHERE pt.idproyecto = ?
    ");
    $stmt->execute([$_GET['idproyecto']]);
    $result = $stmt->fetchAll();
    echo json_encode($result);
}

// Eliminar tecnología de proyecto
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    $sql = "DELETE FROM ProyectosxTecnologias WHERE idproyecto = ? AND idtecnologia = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$data['idproyecto'], $data['idtecnologia']]);
    echo json_encode(['mensaje' => 'Relación eliminada']);
}
?>