<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Listado de Proyectos</title>
</head>
<body>
<h1>Proyectos y Tecnologías Usadas</h1>
<table border="1" cellpadding="5">
    <tr>
        <th>Proyecto</th>
        <th>Enlace</th>
        <th>Tecnologías</th>
    </tr>
    <?php foreach ($proyectos as $p) { ?>
        <tr>
            <td><?= htmlspecialchars($p['proyecto']) ?></td>
            <td><a href="<?= htmlspecialchars($p['enlace']) ?>" target="_blank"><?= htmlspecialchars($p['enlace']) ?></a></td>
            <td><?= $p['tecnologias'] ? htmlspecialchars($p['tecnologias']) : "Sin tecnologías asignadas" ?></td>
        </tr>
    <?php } ?>
</table>
</body>
</html>
