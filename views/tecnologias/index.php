<!DOCTYPE html>
<html>
<head><title>Tecnologías</title></head>
<body>
<h2>Tecnologías</h2>

<form method="POST" action="admin.php?controller=tecnologia&action=store">
    <input type="text" name="nombre" placeholder="Nueva tecnología" required>
    <button type="submit">Agregar</button>
</form>

<table border="1" cellpadding="5">
    <tr><th>ID</th><th>Nombre</th><th>Acciones</th></tr>
    <?php foreach ($tecnologias as $row) { ?>
        <tr>
            <td><?= $row['id_tecnologia'] ?></td>
            <td><?= htmlspecialchars($row['nombre']) ?></td>
            <td>
                <form method="POST" action="admin.php?controller=tecnologia&action=update" style="display:inline;">
                    <input type="hidden" name="id" value="<?= $row['id_tecnologia'] ?>">
                    <input type="text" name="nombre" placeholder="Nuevo nombre">
                    <button type="submit">Editar</button>
                </form>
                <a href="admin.php?controller=tecnologia&action=destroy&id=<?= $row['id_tecnologia'] ?>">Eliminar</a>
            </td>
        </tr>
    <?php } ?>
</table>
</body>
    <a href="admin.php">Volver</a>
</html>
