<?php
require 'connection.php';

// Agregar proyecto
if (isset($_POST['add'])) {
    $stmt = $pdo->prepare("INSERT INTO proyectos(nombre, enlace) VALUES(:nombre, :enlace)");
    $stmt->execute(['nombre' => $_POST['nombre'], 'enlace' => $_POST['enlace']]);
}

// Eliminar
if (isset($_GET['delete'])) {
    $stmt = $pdo->prepare("DELETE FROM proyectos WHERE id_proyecto=:id");
    $stmt->execute(['id' => $_GET['delete']]);
}

// Editar
if (isset($_POST['edit'])) {
    $stmt = $pdo->prepare("UPDATE proyectos SET nombre=:nombre, enlace=:enlace WHERE id_proyecto=:id");
    $stmt->execute([
        'nombre' => $_POST['nombre'],
        'enlace' => $_POST['enlace'],
        'id' => $_POST['id']
    ]);
}

// Obtener lista
$stmt = $pdo->query("SELECT * FROM proyectos ORDER BY id_proyecto DESC");
$proyectos = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html>
<head>
    <title>Proyectos</title>
</head>
<body>
<h2>Proyectos</h2>
<form method="POST">
    <input type="text" name="nombre" placeholder="Nuevo proyecto" required>
    <input type="text" name="enlace" placeholder="Enlace" required>
    <button type="submit" name="add">Agregar</button>
</form>
<table border="1" cellpadding="5">
    <tr><th>ID</th><th>Nombre</th><th>Enlace</th><th>Acciones</th></tr>
    <?php foreach ($proyectos as $row) { ?>
        <tr>
            <td><?= $row['id_proyecto'] ?></td>
            <td><?= htmlspecialchars($row['nombre']) ?></td>
            <td><a href="<?= htmlspecialchars($row['enlace']) ?>" target="_blank"><?= htmlspecialchars($row['enlace']) ?></a></td>
            <td>
                <a href="?delete=<?= $row['id_proyecto'] ?>">Eliminar</a>
                <form method="POST" style="display:inline;">
                    <input type="hidden" name="id" value="<?= $row['id_proyecto'] ?>">
                    <input type="text" name="nombre" placeholder="Nuevo nombre">
                    <input type="text" name="enlace" placeholder="Nuevo enlace">
                    <button type="submit" name="edit">Editar</button>
                </form>
            </td>
        </tr>
    <?php } ?>
</table>
</body>
</html>
