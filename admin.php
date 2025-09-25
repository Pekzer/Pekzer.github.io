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
    <meta name="description" content="Panel de administración del Portfolio de Gonzalo Herrera">

    <title>Panel de Administración - Portfolio</title>
    <link rel="stylesheet" href="style.css?v=1.3">
</head>
<body>
    <main>
        <header>
            <h1>Panel de Administración del Portfolio</h1>
        </header>
        
        <nav class="menu" role="navigation" aria-label="Menú principal de administración">
            <a href="admin.php?controller=proyecto&action=index" title="Gestionar proyectos">
                Proyectos
            </a>
            <a href="admin.php?controller=tecnologia&action=index" title="Gestionar tecnologías">
                Tecnologías
            </a>
            <a href="admin.php?controller=txp&action=index" title="Asignar tecnologías a proyectos">
                Asignar Tecnologías
            </a>
            <a href="index.php" title="Ver sitio público">
                Ver Sitio Público
            </a>
            <a href="logout.php" title="Cerrar sesión y volver al inicio">
                Cerrar Sesión
            </a>
        </nav>
        
        <section class="feliz-jueves">
            <div class="image-container">
                <img src="media/feliz-jueves-asuka.gif" 
                     alt="Feliz Jueves" 
                     class="responsive-image clickable-audio" 
                     title="Haz clic para reproducir audio"
                     onclick="playFelizJueves()">
            </div>
            <audio id="felizJuevesAudio" preload="auto">
                <source src="media/feliz-jueves.mp3" type="audio/mpeg">
            </audio>
        </section>
    </main>
    
    <footer>
        <p>© 2025 Portfolio de Gonzalo Herrera</p>
    </footer>

    <script>
        function playFelizJueves() {
            const audio = document.getElementById('felizJuevesAudio');
            if (!audio.paused) {
                audio.currentTime = 0;
            }
            
            audio.play().catch(function(error) {
                console.log('Error al reproducir el audio:', error);
                alert('No se pudo reproducir el audio. Verifica que el archivo existe.');
            });
        }

        document.addEventListener('DOMContentLoaded', function() {
            const img = document.querySelector('.clickable-audio');
            if (img) {
                img.addEventListener('click', function() {
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 150);
                });
            }
        });
    </script>
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
