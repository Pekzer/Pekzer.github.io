<?php
define('BASE_PATH', __DIR__);
session_start();


$CLAVE_ADMIN = "43694099"; 

if (!empty($_SESSION['admin']) && $_SESSION['admin'] === true) {
    header('Location: admin.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $claveIngresada = $_POST['clave'] ?? '';

    if ($claveIngresada === $CLAVE_ADMIN) {
        $_SESSION['admin'] = true;
        header("Location: admin.php");
        exit;
    } else {
        $error = "Clave incorrecta, intente nuevamente.";
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>Portfolio - Inicio</title>
<link rel="stylesheet" href="style.css?v=1.1">
</head>
<body>
<div class="box">
    <h1>Bienvenido</h1>
    <p><a class="button" href="public.php">Ver sitio público</a></p>

    <hr>

    <h3>Acceso administrador</h3>
    <form method="post" style="margin-top:10px;">
        <input type="password" name="clave" placeholder="Ingrese la clave" required>
        <button type="submit">Ingresar</button>
    </form>

</div>
</body>
</html>

