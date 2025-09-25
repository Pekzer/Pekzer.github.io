<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Manejar preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

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
                // Obtener datos del POST
                $input = null;
                $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
                
                if (strpos($contentType, 'application/json') !== false) {
                    $input = json_decode(file_get_contents('php://input'), true);
                } else {
                    $input = $_POST;
                }
                
                // Log para debugging
                error_log("API Debug - Input received: " . print_r($input, true));
                
                // Validar datos requeridos
                if (empty($input['nombre']) || empty($input['email']) || empty($input['mensaje'])) {
                    http_response_code(400);
                    echo json_encode([
                        'success' => false, 
                        'error' => 'Todos los campos son requeridos',
                        'received' => $input
                    ]);
                    break;
                }
                
                try {
                    // Cargar directamente el modelo en lugar del controlador
                    require_once BASE_PATH . '/models/Correo.php';
                    $correoModel = new Correo();
                    
                    $resultado = $correoModel->enviarCorreo(
                        $input['nombre'],
                        $input['email'],
                        $input['mensaje']
                    );
                    
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