<?php
require_once __DIR__ . '/../models/Txp.php';

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
        header("Location: index.php?controller=txp&action=index");
    }

    public function destroy($id) {
        $this->model->delete($id);
        header("Location: index.php?controller=txp&action=index");
    }
}
