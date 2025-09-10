<?php
require_once __DIR__ . '/../models/Userview.php';

class UserviewController {
    private $model;
    public function __construct() { $this->model = new Txp(); }

    public function index() {
        $relaciones = $this->model->all();
        $proyectos = $this->model->proyectos();
        $tecnologias = $this->model->tecnologias();
        require __DIR__ . '/../views/txp/index.php';
    }

}