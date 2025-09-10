<?php
require_once __DIR__ . '/../config/database.php';

class Txp {
    private $pdo;
    public function __construct() { $this->pdo = Database::connect(); }

    public function all() {
        $stmt = $this->pdo->query("
            SELECT txp.id_txp, p.nombre AS proyecto, t.nombre AS tecnologia
            FROM tecnologiasxproyectos txp
            JOIN proyectos p ON p.id_proyecto = txp.id_proyecto
            JOIN tecnologias t ON t.id_tecnologia = txp.id_tecnologia
            ORDER BY txp.id_txp DESC
        ");
        return $stmt->fetchAll();
    }

    public function create($id_proyecto, $id_tecnologia) {
        $stmt = $this->pdo->prepare("INSERT INTO tecnologiasxproyectos (id_proyecto, id_tecnologia) VALUES (:id_proyecto, :id_tecnologia)");
        return $stmt->execute(['id_proyecto' => $id_proyecto, 'id_tecnologia' => $id_tecnologia]);
    }

    public function delete($id) {
        $stmt = $this->pdo->prepare("DELETE FROM tecnologiasxproyectos WHERE id_txp=:id");
        return $stmt->execute(['id' => $id]);
    }

    public function proyectos() {
        return $this->pdo->query("SELECT * FROM proyectos ORDER BY nombre")->fetchAll();
    }

    public function tecnologias() {
        return $this->pdo->query("SELECT * FROM tecnologias ORDER BY nombre")->fetchAll();
    }
}
