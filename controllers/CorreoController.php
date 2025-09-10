<?php
require_once __DIR__ . '/../models/Correo.php';

class CorreoController {
    private $model;

    public function __construct() {
        $this->model = new Correo();
    }

    // Mostrar formulario
    public function index() {
        $mensaje = null;
        require __DIR__ . '/../views/correos/index.php';
    }

    // Procesar envío
    public function store($data) {
        $correo = htmlspecialchars($data['correo']);
        $comentario = htmlspecialchars($data['comentario']);

        $mensaje = $this->model->enviar($correo, $comentario);

        require __DIR__ . '/../views/correos/index.php';
    }
}
