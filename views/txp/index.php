<!DOCTYPE html>
<html>
<head><title>Asignar Tecnologías a Proyectos</title></head>
<body>
<h2>Asignar Tecnologías a Proyectos</h2>

<form method="POST" action="admin.php?controller=txp&action=store">
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
    <tr><th>Proyecto</th><th>Tecnologías</th><th>Acciones</th></tr>
    <?php foreach ($relaciones as $row) { 
        $ids = !empty($row['ids_txp']) ? explode(', ', $row['ids_txp']) : [];
        $techs = !empty($row['tecnologias']) ? explode(', ', $row['tecnologias']) : [];
    ?>
        <tr>
            <td><?= htmlspecialchars($row['proyecto']) ?></td>
            <td>
                <?php foreach ($techs as $index => $tech) { ?>
                    <?= htmlspecialchars($tech) ?>
                    <a href="admin.php?controller=txp&action=destroy&id=<?= $ids[$index] ?>">
                        [Eliminar]
                    </a><br>
                <?php } ?>
            </td>
            <td>
                <a href="admin.php?controller=txp&action=destroyAll&id_proyecto=<?= $row['id_proyecto'] ?>">
                    Eliminar Todas
                </a>
            </td>
        </tr>
    <?php } ?>
</table>
    <a href="admin.php">Volver</a>
</body>
</html>