<!DOCTYPE html>
<html>
<head><title>Proyectos</title></head>
<body>
<h2>Proyectos</h2>

<form method="POST" action="index.php?controller=proyecto&action=store">
    <input type="text" name="nombre" placeholder="Nuevo proyecto" required>
    <input type="text" name="enlace" placeholder="Enlace" required>
    <button type="submit">Agregar</button>
</form>

<table border="1" cellpadding="5">
    <tr><th>ID</th><th>Nombre</th><th>Enlace</th><th>Acciones</th></tr>
    <?php foreach ($proyectos as $row) { ?>
        <tr>
            <td><?= $row['id_proyecto'] ?></td>
            <td><?= htmlspecialchars($row['nombre']) ?></td>
            <td><a href="<?= htmlspecialchars($row['enlace']) ?>" target="_blank"><?= htmlspecialchars($row['enlace']) ?></a></td>
            <td>
                <form method="POST" action="index.php?controller=proyecto&action=update" style="display:inline;">
                    <input type="hidden" name="id" value="<?= $row['id_proyecto'] ?>">
                    <input type="text" name="nombre" placeholder="Nuevo nombre">
                    <input type="text" name="enlace" placeholder="Nuevo enlace">
                    <button type="submit">Editar</button>
                </form>
                <a href="index.php?controller=proyecto&action=destroy&id=<?= $row['id_proyecto'] ?>">Eliminar</a>
            </td>
        </tr>
    <?php } ?>
</table>
</body>
</html>
