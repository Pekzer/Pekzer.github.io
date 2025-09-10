<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Contacto - Portfolio</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f5f6fa; padding: 40px; }
        form { background: white; padding: 20px; border-radius: 8px; max-width: 400px; margin: auto; }
        input, textarea { width: 100%; margin-bottom: 10px; padding: 8px; border: 1px solid #ccc; border-radius: 5px; }
        button { background: #273c75; color: white; border: none; padding: 10px; border-radius: 5px; cursor: pointer; }
        button:hover { background: #40739e; }
        .msg { padding: 10px; margin-bottom: 15px; border-radius: 5px; }
        .success { background: #4cd137; color: white; }
        .error { background: #e84118; color: white; }
    </style>
</head>
<body>
    <h2>📩 Contacto</h2>

    <?php if (isset($mensaje)): ?>
        <div class="msg <?= $mensaje['status'] ?>">
            <?= $mensaje['msg'] ?>
        </div>
    <?php endif; ?>

    <form method="POST" action="index.php?controller=correo&action=store">
        <label for="correo">Correo electrónico</label>
        <input type="email" id="correo" name="correo" required>

        <label for="comentario">Comentario</label>
        <textarea id="comentario" name="comentario" required></textarea>

        <button type="submit">Enviar</button>
    </form>
</body>
</html>
