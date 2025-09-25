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
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Login de administrador - Portfolio">
    <meta name="author" content="Gonzalo Herrera">
    <title>Login Administrador - Portfolio</title>
    <link rel="stylesheet" href="style.css?v=1.2">
</head>
<body>
    <main>
        <div class="box">
            <header>
                <h1>Acceso de Administrador</h1>
            </header>
            
            <section class="admin-access">
                <?php if (isset($error)): ?>
                    <div class="msg error"><?= htmlspecialchars($error) ?></div>
                <?php endif; ?>
                
                <form method="post">
                    <div class="form-group">
                        <label for="clave">Clave de administrador</label>
                        <input type="password" id="clave" name="clave" placeholder="Ingrese la clave" required>
                    </div>
                    <button type="submit">Ingresar</button>
                </form>
                
                <div style="margin-top: 20px;">
                    <a href="index.php" class="back-link">← Volver al Portfolio</a>
                </div>
            </section>
        </div>
    </main>
    
    <footer>
        <p>© 2025 Portfolio de Gonzalo Herrera</p>
    </footer>
</body>
</html>