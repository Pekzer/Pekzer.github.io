<?php
require_once __DIR__ . '/../models/Tecnologia.php';

class TecnologiaController {
    private $model;
    public function __construct() { $this->model = new Tecnologia(); }

    public function index() {
        $tecnologias = $this->model->all();
        require __DIR__ . '/../views/tecnologias/index.php';
    }

    public function store($data) {
        $this->model->create($data['nombre']);
        header("Location: index.php?controller=tecnologia&action=index");
    }

    public function update($data) {
        $this->model->update($data['id'], $data['nombre']);
        header("Location: index.php?controller=tecnologia&action=index");
    }

    public function destroy($id) {
        $this->model->delete($id);
        header("Location: index.php?controller=tecnologia&action=index");
    }
}
