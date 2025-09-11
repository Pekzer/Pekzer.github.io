<?php
define('BASE_PATH', __DIR__);
session_start();

if (empty($_SESSION['admin'])) {
    header("Location: index.php");
    exit;
}

$controller = $_GET['controller'] ?? null;
$action     = $_GET['action'] ?? null;

if ((!$controller && !$action)): 
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="title" content="Portfolio Herrera Gonzalo">
    <title>Panel de Administración</title>
    <link rel="stylesheet" href="style.css?v=1.1">
</head>
<body>
    <h1>Panel de Administración del Portfolio</h1>
    <div class="menu">
        <a href="admin.php?controller=proyecto&action=index">📁 Proyectos</a>
        <a href="admin.php?controller=tecnologia&action=index">⚙️ Tecnologías</a>
        <a href="admin.php?controller=txp&action=index">🔗 Asignar Tecnologías</a>
        <a href="logout.php">🚪 Volver al inicio</a>
    </div>
    <footer>© 2025 Portfolio de Gonzalo Herrera</footer>
</body>
</html>
<?php
else:
    $controllerName = ucfirst($controller) . "Controller";
    $controllerFile = __DIR__ . "/controllers/{$controllerName}.php";

    if (file_exists($controllerFile)) {
        require_once $controllerFile;

        if (class_exists($controllerName)) {
            $objController = new $controllerName();

            if (method_exists($objController, $action)) {
                if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                    $objController->$action($_POST);
                } elseif (isset($_GET['id'])) {
                    $objController->$action($_GET['id']);
                } else {
                    $objController->$action();
                }
            } else {
                echo "Acción '$action' no encontrada en el controlador '$controllerName'.";
            }
        } else {
            echo "Clase '$controllerName' no encontrada en el archivo.";
        }
    } else {
        echo "Controlador '$controllerName' no encontrado.";
    }
endif;
?>
