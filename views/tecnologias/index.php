<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tecnologías - Panel de Administración</title>
    <link rel="stylesheet" href="style.css?v=1.2">
</head>
<body>
    <div class="admin-container">
        <header class="admin-header">
            <h1>Gestión de Tecnologías</h1>
        </header>

        <main>
            <section class="form-section">
                <h2>Agregar Nueva Tecnología</h2>
                <form method="POST" action="admin.php?controller=tecnologia&action=store">
                    <div class="form-group">
                        <label for="nombre">Nombre de la Tecnología</label>
                        <input type="text" id="nombre" name="nombre" placeholder="Nueva tecnología" required>
                    </div>
                    <button type="submit">Agregar Tecnología</button>
                </form>
            </section>

            <section class="table-section">
                <h2>Lista de Tecnologías</h2>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($tecnologias as $row): ?>
                                <tr>
                                    <td><?= $row['id_tecnologia'] ?></td>
                                    <td><?= htmlspecialchars($row['nombre']) ?></td>
                                    <td>
                                        <form method="POST" action="admin.php?controller=tecnologia&action=update" class="inline-form">
                                            <input type="hidden" name="id" value="<?= $row['id_tecnologia'] ?>">
                                            <input type="text" name="nombre" placeholder="Nuevo nombre" value="<?= htmlspecialchars($row['nombre']) ?>">
                                            <button type="submit">Actualizar</button>
                                        </form>
                                        <a href="admin.php?controller=tecnologia&action=destroy&id=<?= $row['id_tecnologia'] ?>" 
                                           class="action-link" 
                                           onclick="return confirm('¿Estás seguro de eliminar esta tecnología?')">
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
