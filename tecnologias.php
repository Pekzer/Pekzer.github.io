<?php
require 'connection.php';

// Agregar tecnología
if (isset($_POST['add'])) {
    $stmt = $pdo->prepare("INSERT INTO tecnologias(nombre) VALUES(:nombre)");
    $stmt->execute(['nombre' => $_POST['nombre']]);
}

// Eliminar tecnología
if (isset($_GET['delete'])) {
    $stmt = $pdo->prepare("DELETE FROM tecnologias WHERE id_tecnologia=:id");
    $stmt->execute(['id' => $_GET['delete']]);
}

// Editar tecnología
if (isset($_POST['edit'])) {
    $stmt = $pdo->prepare("UPDATE tecnologias SET nombre=:nombre WHERE id_tecnologia=:id");
    $stmt->execute(['nombre' => $_POST['nombre'], 'id' => $_POST['id']]);
}

// Obtener lista
$stmt = $pdo->query("SELECT * FROM tecnologias ORDER BY id_tecnologia DESC");
$tecnologias = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html>
<head>
    <title>Tecnologías</title>
</head>
<body>
<h2>Tecnologías</h2>
<form method="POST">
    <input type="text" name="nombre" placeholder="Nueva tecnología" required>
    <button type="submit" name="add">Agregar</button>
</form>
<table border="1" cellpadding="5">
    <tr><th>ID</th><th>Nombre</th><th>Acciones</th></tr>
    <?php foreach ($tecnologias as $row) { ?>
        <tr>
            <td><?= $row['id_tecnologia'] ?></td>
            <td><?= htmlspecialchars($row['nombre']) ?></td>
            <td>
                <a href="?delete=<?= $row['id_tecnologia'] ?>">Eliminar</a>
                <form method="POST" style="display:inline;">
                    <input type="hidden" name="id" value="<?= $row['id_tecnologia'] ?>">
                    <input type="text" name="nombre" placeholder="Nuevo nombre">
                    <button type="submit" name="edit">Editar</button>
                </form>
            </td>
        </tr>
    <?php } ?>
</table>
</body>
</html>

