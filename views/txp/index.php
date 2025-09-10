<!DOCTYPE html>
<html>
<head><title>Asignar Tecnologías a Proyectos</title></head>
<body>
<h2>Asignar Tecnologías a Proyectos</h2>

<form method="POST" action="index.php?controller=txp&action=store">
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
    <button type="submit">Asignar</button>
</form>

<br>
<table border="1" cellpadding="5">
    <tr><th>Proyecto</th><th>Tecnología</th><th>Acciones</th></tr>
    <?php foreach ($relaciones as $row) { ?>
        <tr>
            <td><?= htmlspecialchars($row['proyecto']) ?></td>
            <td><?= htmlspecialchars($row['tecnologia']) ?></td>
            <td><a href="index.php?controller=txp&action=destroy&id=<?= $row['id_txp'] ?>">Eliminar</a></td>
        </tr>
    <?php } ?>
</table>
</body>
</html>
