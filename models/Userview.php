<?php
require_once __DIR__ . '/../config/database.php';

class Txp {
    private $pdo;
    public function __construct() { $this->pdo = Database::connect(); }

    public function all() {
        $stmt = $this->pdo->query("
            SELECT p.nombre AS proyecto, p.enlace as enlace, t.nombre AS tecnologia
            FROM tecnologiasxproyectos txp
            JOIN proyectos p ON p.id_proyecto = txp.id_proyecto
            JOIN tecnologias t ON t.id_tecnologia = txp.id_tecnologia
            ORDER BY txp.id_txp DESC
        ");
        return $stmt->fetchAll();
    }
}
