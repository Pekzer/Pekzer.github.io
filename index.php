<?php
if (!defined('BASE_PATH')) {
    define('BASE_PATH', __DIR__); 
}
require_once BASE_PATH . '/models/Userview.php';

$model = new Userview();
$proyectos = $model->all(); 

$controller = $_GET['controller'] ?? null;
$action = $_GET['action'] ?? null;

if ($controller === 'correo' && $action === 'enviar') {
    require_once BASE_PATH . '/controllers/CorreoController.php';
    $correoController = new CorreoController();
    $correoController->enviar($_POST);
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Portfolio">
    <meta name="keywords" content="portfolio">
    <meta name="author" content="Gonzalo Herrera">
    <title>Portfolio - Gonzalo Herrera</title>
    <link rel="stylesheet" href="style.css?v=1.3">
</head>
<body>

    <header style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
            Bienvenido
        </h1>
    </header>

    <main id="userview">
        <section id="proyectos">
            <header>
                <h2>Proyectos y Tecnologías</h2>
            </header>
            
            <?php if (empty($proyectos)): ?>
                <div class="msg" style="background: #f39c12; color: white;">
                    No hay proyectos disponibles en este momento.
                </div>
            <?php else: ?>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Proyecto</th>
                                <th>Tecnologías</th>
                                <th>Enlace</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($proyectos as $p): ?>
                                <tr>
                                    <td>
                                        <strong><?= htmlspecialchars($p['proyecto']) ?></strong>
                                    </td>
                                    <td>
                                        <?php if ($p['tecnologias']): ?>
                                            <span class="tecnologias"><?= htmlspecialchars($p['tecnologias']) ?></span>
                                        <?php else: ?>
                                            <em style="color: #7f8c8d;">Sin tecnologías</em>
                                        <?php endif; ?>
                                    </td>
                                    <td>
                                        <?php if ($p['enlace']): ?>
                                            <a href="<?= htmlspecialchars($p['enlace']) ?>" 
                                               target="_blank" 
                                               rel="noopener noreferrer"
                                               title="Ver proyecto: <?= htmlspecialchars($p['proyecto']) ?>">
                                                Ver Proyecto
                                            </a>
                                        <?php else: ?>
                                            <em style="color: #7f8c8d;">Sin enlace</em>
                                        <?php endif; ?>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            <?php endif; ?>
        </section>

        <aside id="aboutme">
            <header>
                <h1>Sobre mí</h1>
            </header>
            
            <div class="about-content">
                <div class="about-info">
                    <div class="profile-info">
                        <div class="info-item">
                            <strong>Nombre:</strong> Herrera Gonzalo Nicolas
                        </div>
                        <div class="info-item">
                            <strong>Teléfono:</strong> 
                            <a href="tel:+543874118679" style="color: white; text-decoration: none;">
                                3874118679
                            </a>
                        </div>
                        <div class="info-item">
                            <strong>Correo:</strong> 
                            <a href="mailto:gonzalonherrera9000@gmail.com" style="color: white; text-decoration: none;">
                                gonzalonherrera9000@gmail.com
                            </a>
                        </div>
                        <div class="info-item">
                            <strong>LinkedIn:</strong> 
                            <a href="https://www.linkedin.com/in/pekzer/" 
                               target="_blank" 
                               rel="noopener noreferrer" 
                               style="color: white; text-decoration: none;">
                                https://www.linkedin.com/in/pekzer/
                            </a>
                        </div>
                    </div>
                </div>
                <div class="about-image">
                    <!--<img src="media/yo.png">-->
                </div>
            </div>
        </aside>

        <section id="correo">
            <header>
                <h2>Contacto</h2>
            </header>
            
            <?php if (isset($_GET['msg'])): ?>
                <div class="msg success">
                    <?= htmlspecialchars($_GET['msg']) ?>
                </div>
            <?php endif; ?>

            <form method="POST" action="index.php?controller=correo&action=enviar" novalidate>
                <div class="form-group">
                    <label for="nombre">Nombre</label>
                    <input type="text" 
                           id="nombre"
                           name="nombre" 
                           placeholder="Tu nombre" 
                           required 
                           minlength="2">
                </div>
                
                <div class="form-group">
                    <label for="email">Correo electrónico</label>
                    <input type="email" 
                           id="email"
                           name="email" 
                           placeholder="Tu correo" 
                           required>
                </div>
                
                <div class="form-group">
                    <label for="mensaje">Mensaje</label>
                    <textarea id="mensaje"
                              name="mensaje" 
                              rows="5" 
                              placeholder="Escribe tu mensaje..." 
                              required 
                              minlength="10"></textarea>
                </div>
                
                <button type="submit">
                    Enviar
                </button>
            </form>
        </section>
        
        <div style>
            <a href="login.php" 
                class="admin-button"
                title="Acceso de administrador">
                Acceso a edición
            </a>
        </div>
    </main>

    <footer style="text-align: center; margin-top: 50px; padding: 20px;">
        <p style="color: white;">© 2025 Gonzalo Herrera</p>
    </footer>
<!--
    <audio id="mensajeAudio" preload="auto">
        <source src="media/mensaje.mp3" type="audio/mpeg">
    </audio>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const mensajeDiv = document.querySelector('.msg.success');
            
            if (mensajeDiv) {
                setTimeout(function() {
                    playMensajeAudio();
                }, 500);
            }
        });

        function playMensajeAudio() {
            const audio = document.getElementById('mensajeAudio');
            
            if (audio) {
                audio.play().catch(function(error) {
                    console.log('Error al reproducir el audio del mensaje:', error);
                });
            }
        }

        const form = document.querySelector('form');
        if (form) {
            form.addEventListener('submit', function() {
                const button = this.querySelector('button[type="submit"]');
                if (button) {
                    button.style.transform = 'scale(0.95)';
                    button.textContent = 'Enviando...';
                    button.disabled = true;
                    
                    setTimeout(function() {
                        button.style.transform = '';
                        button.textContent = 'Enviar';
                        button.disabled = false;
                    }, 3000);
                }
            });
        }
    </script>
-->
</body>
</html>

