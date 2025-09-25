<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contacto - Portfolio</title>
    <link rel="stylesheet" href="style.css?v=1.2">
</head>
<body>
    <div class="admin-container">
        <header class="admin-header">
            <h1>Formulario de Contacto</h1>
        </header>

        <main>
            <section class="form-section">
                <?php if (isset($mensaje)): ?>
                    <div class="msg <?= $mensaje['status'] ?>">
                        <?= $mensaje['msg'] ?>
                    </div>
                <?php endif; ?>

                <form method="POST" action="index.php?controller=correo&action=store">
                    <div class="form-group">
                        <label for="correo">Correo electrónico</label>
                        <input type="email" id="correo" name="correo" placeholder="tu@email.com" required>
                    </div>

                    <div class="form-group">
                        <label for="comentario">Comentario</label>
                        <textarea id="comentario" name="comentario" rows="6" placeholder="Escribe tu mensaje..." required></textarea>
                    </div>

                    <button type="submit">Enviar Mensaje</button>
                </form>
            </section>
        </main>

        <nav>
            <a href="admin.php" class="back-link">Volver al Panel</a>
        </nav>
    </div>
    
<!--
    <audio id="mensajeAudio" preload="auto">
        <source src="../../media/mensaje.mp3" type="audio/mpeg">
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
                }
            });
        }
    </script>
-->
</body>
</html>
