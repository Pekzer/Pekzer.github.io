<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Contacto - Portfolio</title>
    <link rel="stylesheet" href="style.css?v=1.1">
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
