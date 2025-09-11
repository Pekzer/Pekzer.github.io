<?php
require_once BASE_PATH . '/models/Correo.php';

class CorreoController {
    private $model;

    public function __construct() {
        $this->model = new Correo();
    }

    public function enviar($data) {
        $resultado = $this->model->enviarCorreo(
            $data['nombre'],
            $data['email'],
            $data['mensaje']
        );

        header("Location:public.php?msg=" . urlencode($resultado));
        exit;
    }
}
