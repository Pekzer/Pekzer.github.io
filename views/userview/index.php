<?php
if (!defined('BASE_PATH')) {
    define('BASE_PATH', dirname(__DIR__, 2)); 
}
require_once BASE_PATH . '/models/Userview.php';

$model = new Userview();
$proyectos = $model->all(); 
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Mi Portfolio</title>
    <link rel="stylesheet" href="style.css?v=1.2">
</head>
<body>

<section id=userview>

<section id="proyectos">
    <h2>📊 Proyectos y Tecnologías</h2>
    <table>
        <tr>
            <th>Proyecto</th>
            <th>Tecnologías</th>
            <th>Enlace</th>
        </tr>
        <?php foreach ($proyectos as $p): ?>
            <tr>
                <td><?= htmlspecialchars($p['proyecto']) ?></td>
                <td><?= $p['tecnologias'] ? htmlspecialchars($p['tecnologias']) : "Sin tecnologías" ?></td>
                <td><a href="<?= htmlspecialchars($p['enlace']) ?>" target="_blank"><?= htmlspecialchars($p['enlace']) ?></a></td>
            </tr>
        <?php endforeach; ?>
    </table>
</section>

<section id="aboutme">
    <h1>Sobre mí</h1>
    <div>Herrera Gonzalo Nicolas</div>
    <div>Telefono: 3874118679</div>
    <div>Correo: gonzalonherrera9000@gmail.com</div>
    <div>Linkedin: https://www.linkedin.com/in/pekzer/</div>
</section>

<section id="correo">
    <?php if (isset($_GET['msg'])): ?>
    <p style="color: green;"><?= htmlspecialchars($_GET['msg']) ?></p>
    <?php endif; ?>

    <h2>✉️ Contacto</h2>
        <form method="POST" action="public.php?controller=correo&action=enviar">
        <input type="text" name="nombre" placeholder="Tu nombre" required>
        <input type="email" name="email" placeholder="Tu correo" required>
        <textarea name="mensaje" rows="5" placeholder="Escribe tu mensaje..." required></textarea>
        <button type="submit">Enviar</button>
    </form>
</section>

</section>

</body>
</html>