<?php
require_once BASE_PATH . '/models/Proyecto.php';

class ProyectoController {
    private $model;

    public function __construct() {
        $this->model = new Proyecto();
    }

    public function index() {
        $proyectos = $this->model->all();
        require __DIR__ . '/../views/proyectos/index.php';
    }

    public function store($data) {
        $this->model->create($data['nombre'], $data['enlace']);
        header("Location: admin.php?controller=proyecto&action=index");
    }

    public function update($data) {
        $this->model->update($data['id'], $data['nombre'], $data['enlace']);
        header("Location: admin.php?controller=proyecto&action=index");
    }

    public function destroy($id) {
        $this->model->delete($id);
        header("Location: admin.php?controller=proyecto&action=index");
    }
}
