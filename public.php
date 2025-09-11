<?php
define('BASE_PATH', __DIR__);
$controller = $_GET['controller'] ?? 'userview';
$action = $_GET['action'] ?? 'index';

$controllerName = ucfirst($controller) . 'Controller';
$controllerFile = __DIR__ . "/controllers/{$controllerName}.php";

if (!file_exists($controllerFile)) {
    die("Controlador no encontrado: $controllerFile");
}

require_once $controllerFile;
$controllerObj = new $controllerName();

if (!method_exists($controllerObj, $action)) {
    die("Acción no encontrada: $action");
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $controllerObj->$action($_POST);
} else {
    $controllerObj->$action();
}
