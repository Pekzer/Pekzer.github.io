<?php
require_once BASE_PATH . '/config/database.php';

class Txp {
    private $pdo;
    public function __construct() { $this->pdo = Database::connect(); }

    public function all() {
    $stmt = $this->pdo->query("
        SELECT 
            p.id_proyecto,
            p.nombre AS proyecto,
            GROUP_CONCAT(t.nombre SEPARATOR ', ') AS tecnologias,
            GROUP_CONCAT(txp.id_txp SEPARATOR ', ') AS ids_txp
        FROM proyectos p
        LEFT JOIN tecnologiasxproyectos txp ON p.id_proyecto = txp.id_proyecto
        LEFT JOIN tecnologias t ON txp.id_tecnologia = t.id_tecnologia
        GROUP BY p.id_proyecto, p.nombre
        ORDER BY p.id_proyecto DESC
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
    
    public function deleteByProject($id_proyecto) {
        $stmt = $this->pdo->prepare("DELETE FROM tecnologiasxproyectos WHERE id_proyecto = :id_proyecto");
        return $stmt->execute(['id_proyecto' => $id_proyecto]);
    }   

    public function proyectos() {
        return $this->pdo->query("SELECT * FROM proyectos ORDER BY nombre")->fetchAll();
    }

    public function tecnologias() {
        return $this->pdo->query("SELECT * FROM tecnologias ORDER BY nombre")->fetchAll();
    }
}
