<?php
require 'connection.php';

// Asignar tecnología a proyecto
if (isset($_POST['add'])) {
    $stmt = $pdo->prepare("
        INSERT INTO tecnologiasxproyectos(id_proyecto, id_tecnologia) 
        VALUES(:id_proyecto, :id_tecnologia)
    ");
    $stmt->execute([
        'id_proyecto' => $_POST['id_proyecto'],
        'id_tecnologia' => $_POST['id_tecnologia']
    ]);
}

// Eliminar relación
if (isset($_GET['delete'])) {
    $stmt = $pdo->prepare("DELETE FROM tecnologiasxproyectos WHERE id_txp=:id");
    $stmt->execute(['id' => $_GET['delete']]);
}

// Listas desplegables
$proyectos = $pdo->query("SELECT * FROM proyectos ORDER BY nombre")->fetchAll(PDO::FETCH_ASSOC);
$tecnologias = $pdo->query("SELECT * FROM tecnologias ORDER BY nombre")->fetchAll(PDO::FETCH_ASSOC);

// Relación con id_txp
$stmt = $pdo->query("
    SELECT txp.id_txp, p.nombre AS proyecto, t.nombre AS tecnologia
    FROM tecnologiasxproyectos txp
    JOIN proyectos p ON p.id_proyecto = txp.id_proyecto
    JOIN tecnologias t ON t.id_tecnologia = txp.id_tecnologia
    ORDER BY txp.id_txp DESC
");
$relaciones = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Asignar Tecnologías a Proyectos</title>
</head>
<body>
<h2>Asignar Tecnologías a Proyectos</h2>
<form method="POST">
    <select name="id_proyecto" required>
        <option value="">-- Proyecto --</option>
        <?php foreach ($proyectos as $p) { ?>
            <option value="<?= $p['id_proyecto'] ?>"><?= htmlspecialchars($p['nombre']) ?></option>
        <?php } ?>
    </select>
    <select name="id_tecnologia" required>
        <option value="">-- Tecnología --</option>
        <?php foreach ($tecnologias as $t) { ?>
            <option value="<?= $t['id_tecnologia'] ?>"><?= htmlspecialchars($t['nombre']) ?></option>
        <?php } ?>
    </select>
    <button type="submit" name="add">Asignar</button>
</form>
<br>

<table border="1" cellpadding="5">
    <tr><th>Proyecto</th><th>Tecnología</th><th>Acciones</th></tr>
    <?php foreach ($relaciones as $row) { ?>
        <tr>
            <td><?= htmlspecialchars($row['proyecto']) ?></td>
            <td><?= htmlspecialchars($row['tecnologia']) ?></td>
            <td><a href="?delete=<?= $row['id_txp'] ?>">Eliminar</a></td>
        </tr>
    <?php } ?>
</table>
</body>
</html>
