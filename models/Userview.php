<?php
require_once __DIR__ . '/../config/database.php';

class Userview {
    private $pdo;
    public function __construct() { $this->pdo = Database::connect(); }

    public function all() {
        $stmt = $this->pdo->query("
            SELECT 
                p.id_proyecto,
                p.nombre AS proyecto, 
                p.enlace as enlace, 
                GROUP_CONCAT(t.nombre SEPARATOR ', ') AS tecnologias
            FROM proyectos p
            LEFT JOIN tecnologiasxproyectos txp ON p.id_proyecto = txp.id_proyecto
            LEFT JOIN tecnologias t ON t.id_tecnologia = txp.id_tecnologia
            GROUP BY p.id_proyecto, p.nombre, p.enlace
            ORDER BY p.id_proyecto DESC
        ");
        return $stmt->fetchAll();
    }
    
    public function proyectos() {
        return $this->pdo->query("SELECT * FROM proyectos ORDER BY nombre")->fetchAll();
    }

    public function tecnologias() {
        return $this->pdo->query("SELECT * FROM tecnologias ORDER BY nombre")->fetchAll();
    }
}