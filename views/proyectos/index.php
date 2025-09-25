<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Proyectos - Panel de Administración</title>
    <link rel="stylesheet" href="style.css?v=1.2">
</head>
<body>
    <div class="admin-container">
        <header class="admin-header">
            <h1>Gestión de Proyectos</h1>
        </header>

        <main>
            <section class="form-section">
                <h2>Agregar Nuevo Proyecto</h2>
                <form method="POST" action="admin.php?controller=proyecto&action=store">
                    <div class="form-group">
                        <label for="nombre">Nombre del Proyecto</label>
                        <input type="text" id="nombre" name="nombre" placeholder="Nuevo proyecto" required>
                    </div>
                    <div class="form-group">
                        <label for="enlace">Enlace del Proyecto</label>
                        <input type="text" id="enlace" name="enlace" placeholder="https://...">
                    </div>
                    <button type="submit">Agregar Proyecto</button>
                </form>
            </section>

            <section class="table-section">
                <h2>Lista de Proyectos</h2>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Enlace</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($proyectos as $row): ?>
                                <tr>
                                    <td><?= $row['id_proyecto'] ?></td>
                                    <td><?= htmlspecialchars($row['nombre']) ?></td>
                                    <td>
                                        <?php if ($row['enlace']): ?>
                                            <a href="<?= htmlspecialchars($row['enlace']) ?>" target="_blank" title="Ver proyecto">
                                                <?= htmlspecialchars($row['enlace']) ?>
                                            </a>
                                        <?php else: ?>
                                            <em>Sin enlace</em>
                                        <?php endif; ?>
                                    </td>
                                    <td>
                                        <form method="POST" action="admin.php?controller=proyecto&action=update" class="inline-form">
                                            <input type="hidden" name="id" value="<?= $row['id_proyecto'] ?>">
                                            <input type="text" name="nombre" value="<?= htmlspecialchars($row['nombre']) ?>" title="Editar nombre">
                                            <input type="text" name="enlace" value="<?= htmlspecialchars($row['enlace']) ?>" title="Editar enlace">
                                            <button type="submit">Actualizar</button>
                                        </form>
                                        <a href="admin.php?controller=proyecto&action=destroy&id=<?= $row['id_proyecto'] ?>" 
                                           class="action-link" 
                                           onclick="return confirm('¿Estás seguro de eliminar este proyecto?')">
                                           Eliminar
                                        </a>
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
