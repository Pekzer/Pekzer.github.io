<?php
require_once __DIR__ . '/../config/database.php';

class Tecnologia {
    private $pdo;
    public function __construct() { $this->pdo = Database::connect(); }

    public function all() {
        return $this->pdo->query("SELECT * FROM tecnologias ORDER BY id_tecnologia DESC")->fetchAll();
    }

    public function create($nombre) {
        $stmt = $this->pdo->prepare("INSERT INTO tecnologias (nombre) VALUES (:nombre)");
        return $stmt->execute(['nombre' => $nombre]);
    }

    public function update($id, $nombre) {
        $stmt = $this->pdo->prepare("UPDATE tecnologias SET nombre=:nombre WHERE id_tecnologia=:id");
        return $stmt->execute(['id' => $id, 'nombre' => $nombre]);
    }

    public function delete($id) {
        $stmt = $this->pdo->prepare("DELETE FROM tecnologias WHERE id_tecnologia=:id");
        return $stmt->execute(['id' => $id]);
    }
}
