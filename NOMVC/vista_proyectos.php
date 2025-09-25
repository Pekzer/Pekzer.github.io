<?php
require 'connection.php';

$stmt = $pdo->query("
    SELECT p.id_proyecto, p.nombre AS proyecto, p.enlace, 
           GROUP_CONCAT(t.nombre ORDER BY t.nombre SEPARATOR ', ') AS tecnologias
    FROM proyectos p
    LEFT JOIN tecnologiasxproyectos txp ON p.id_proyecto = txp.id_proyecto
    LEFT JOIN tecnologias t ON txp.id_tecnologia = t.id_tecnologia
    GROUP BY p.id_proyecto, p.nombre, p.enlace
    ORDER BY p.id_proyecto DESC
");
$proyectos = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
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
