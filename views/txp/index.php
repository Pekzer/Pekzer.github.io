<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Asignar Tecnologías - Panel de Administración</title>
    <link rel="stylesheet" href="style.css?v=1.2">
</head>
<body>
    <div class="admin-container">
        <header class="admin-header">
            <h1>Asignar Tecnologías a Proyectos</h1>
        </header>

        <main>
            <section class="form-section">
                <h2>Nueva Asignación</h2>
                <form method="POST" action="admin.php?controller=txp&action=store">
                    <div class="form-group">
                        <label for="id_proyecto">Seleccionar Proyecto</label>
                        <select id="id_proyecto" name="id_proyecto" required>
                            <option value="">-- Selecciona un Proyecto --</option>
                            <?php foreach ($proyectos as $p): ?>
                                <option value="<?= $p['id_proyecto'] ?>"><?= htmlspecialchars($p['nombre']) ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="id_tecnologia">Seleccionar Tecnología</label>
                        <select id="id_tecnologia" name="id_tecnologia" required>
                            <option value="">-- Selecciona una Tecnología --</option>
                            <?php foreach ($tecnologias as $t): ?>
                                <option value="<?= $t['id_tecnologia'] ?>"><?= htmlspecialchars($t['nombre']) ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <button type="submit">Asignar Tecnología</button>
                </form>
            </section>

            <section class="table-section">
                <h2>Relaciones Actuales</h2>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Proyecto</th>
                                <th>Tecnologías Asignadas</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($relaciones as $row): 
                                $ids = !empty($row['ids_txp']) ? explode(', ', $row['ids_txp']) : [];
                                $techs = !empty($row['tecnologias']) ? explode(', ', $row['tecnologias']) : [];
                            ?>
                                <tr>
                                    <td><strong><?= htmlspecialchars($row['proyecto']) ?></strong></td>
                                    <td>
                                        <?php if (!empty($techs)): ?>
                                            <div class="tech-list">
                                                <?php foreach ($techs as $index => $tech): ?>
                                                    <div class="tech-item">
                                                        <span class="tech-name"><?= htmlspecialchars($tech) ?></span>
                                                        <a href="admin.php?controller=txp&action=destroy&id=<?= $ids[$index] ?>" 
                                                           class="action-link" 
                                                           onclick="return confirm('¿Eliminar esta tecnología del proyecto?')">
                                                           Quitar
                                                        </a>
                                                    </div>
                                                <?php endforeach; ?>
                                            </div>
                                        <?php else: ?>
                                            <em>Sin tecnologías asignadas</em>
                                        <?php endif; ?>
                                    </td>
                                    <td>
                                        <?php if (!empty($techs)): ?>
                                            <a href="admin.php?controller=txp&action=destroyAll&id_proyecto=<?= $row['id_proyecto'] ?>" 
                                               class="action-link" 
                                               onclick="return confirm('¿Eliminar todas las tecnologías de este proyecto?')">
                                               Eliminar Todas
                                            </a>
                                        <?php endif; ?>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </section>
        </main>

        <nav>
            <a href="admin.php" class="back-link">Volver al Panel</a>
        </nav>
    </div>
</body>
</html>