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

        // Si es llamada AJAX (para api.php), devolver resultado directamente
        if (isset($_SERVER['HTTP_CONTENT_TYPE']) && $_SERVER['HTTP_CONTENT_TYPE'] === 'application/json' ||
            isset($_GET['ajax']) || 
            (isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false)) {
            return $resultado;
        }

        // Si es llamada normal (para public.php), hacer redirect
        header("Location: public.php?msg=" . urlencode($resultado));
        exit;
    }

    // Método específico para API
    public function enviarAPI($data) {
        try {
            error_log("CorreoController: Iniciando envío de correo");
            error_log("CorreoController: Datos recibidos: " . print_r($data, true));
            
            $resultado = $this->model->enviarCorreo(
                $data['nombre'],
                $data['email'],
                $data['mensaje']
            );
            
            error_log("CorreoController: Resultado: " . $resultado);
            return $resultado;
            
        } catch (Exception $e) {
            error_log("CorreoController: Error: " . $e->getMessage());
            return "Error en el controlador: " . $e->getMessage();
        }
    }
}
