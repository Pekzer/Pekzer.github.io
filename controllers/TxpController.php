<?php
require_once BASE_PATH . '/models/Txp.php';

class TxpController {
    private $model;
    public function __construct() { $this->model = new Txp(); }

    public function index() {
        $relaciones = $this->model->all();
        $proyectos = $this->model->proyectos();
        $tecnologias = $this->model->tecnologias();
        require __DIR__ . '/../views/txp/index.php';
    }

    public function store($data) {
        $this->model->create($data['id_proyecto'], $data['id_tecnologia']);
        header("Location: admin.php?controller=txp&action=index");
    }

public function all() {
    $stmt = $this->pdo->query("
        SELECT 
            p.id_proyecto,  // ← Esto es esencial
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

public function destroyAll() {
    $id_proyecto = $_GET['id_proyecto'] ?? null;
    
    if ($id_proyecto) {
        $this->model->deleteByProject($id_proyecto);
    }
    header("Location: admin.php?controller=txp&action=index");
}
    public function destroy($id) {
        $this->model->delete($id);
        header("Location: admin.php?controller=txp&action=index");
    }
}
