<?php
require_once BASE_PATH . '/models/Userview.php';

class UserviewController {
    private $model;
    public function __construct() { $this->model = new Userview(); }

    public function index() {
        $proyectos = $this->model->all(); // Cambiado de $relaciones a $proyectos
        require BASE_PATH . '/views/userview/index.php';
    }
}