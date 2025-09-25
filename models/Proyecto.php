<?php
require_once BASE_PATH . '/config/database.php';

class Proyecto {
    private $pdo;

    public function __construct() {
        $this->pdo = Database::connect();
    }

    public function all() {
        return $this->pdo->query("SELECT * FROM proyectos ORDER BY id_proyecto DESC")->fetchAll();
    }

    public function create($nombre, $enlace) {
        $stmt = $this->pdo->prepare("INSERT INTO proyectos (nombre, enlace) VALUES (:nombre, :enlace)");
        return $stmt->execute(['nombre' => $nombre, 'enlace' => $enlace]);
    }

    public function update($id, $nombre, $enlace) {
        $stmt = $this->pdo->prepare("UPDATE proyectos SET nombre=:nombre, enlace=:enlace WHERE id_proyecto=:id");
        return $stmt->execute(['id' => $id, 'nombre' => $nombre, 'enlace' => $enlace]);
    }

    public function delete($id) {
        $stmt = $this->pdo->prepare("DELETE FROM proyectos WHERE id_proyecto=:id");
        return $stmt->execute(['id' => $id]);
    }
}
?>