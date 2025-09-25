<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

if (!defined('BASE_PATH')) {
    define('BASE_PATH', __DIR__); 
}

$action = $_GET['action'] ?? 'proyectos';

try {
    switch ($action) {
        case 'test':
            echo json_encode(['success' => true, 'message' => 'API funcionando correctamente', 'timestamp' => date('Y-m-d H:i:s')]);
            break;
            
        case 'proyectos':
            require_once BASE_PATH . '/models/Userview.php';
            $model = new Userview();
            $proyectos = $model->all();
            echo json_encode(['success' => true, 'data' => $proyectos]);
            break;
            
        case 'enviar_correo':
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $input = json_decode(file_get_contents('php://input'), true);
                
                if (!$input) {
                    $input = $_POST;
                }
                
                // Log para debugging
                error_log("API Debug - Input received: " . print_r($input, true));
                
                // Validar datos requeridos
                if (empty($input['nombre']) || empty($input['email']) || empty($input['mensaje'])) {
                    http_response_code(400);
                    echo json_encode(['success' => false, 'error' => 'Todos los campos son requeridos', 'debug' => $input]);
                    break;
                }
                
                try {
                    require_once BASE_PATH . '/controllers/CorreoController.php';
                    $correoController = new CorreoController();
                    
                    // Usar el método específico para API
                    $resultado = $correoController->enviarAPI($input);
                    
                    error_log("API Debug - Resultado: " . $resultado);
                    
                    // Verificar si el envío fue exitoso
                    if (strpos($resultado, 'Error') === false && strpos($resultado, 'invalida') === false) {
                        echo json_encode(['success' => true, 'message' => $resultado]);
                    } else {
                        http_response_code(500);
                        echo json_encode(['success' => false, 'error' => $resultado]);
                    }
                } catch (Exception $e) {
                    error_log("API Debug - Exception: " . $e->getMessage());
                    http_response_code(500);
                    echo json_encode(['success' => false, 'error' => 'Error interno: ' . $e->getMessage()]);
                }
            } else {
                http_response_code(405);
                echo json_encode(['success' => false, 'error' => 'Método no permitido']);
            }
            break;
            
        default:
            http_response_code(404);
            echo json_encode(['success' => false, 'error' => 'Acción no encontrada']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>