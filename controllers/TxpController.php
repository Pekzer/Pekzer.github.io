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
