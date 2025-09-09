<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="title" content="Portfolio Herrera Gonzalo">
    <title>Correos</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <body>
    <?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    use PHPMailer\PHPMailer\SMTP;
    require 'vendor/autoload.php';

    $mensaje = "";
    $claseMensaje = "";

    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        $correo = htmlspecialchars($_POST['correo']);
        $comentario = htmlspecialchars($_POST['comentario']);

        $mail = new PHPMailer(true);

        try {
            // Configuración del servidor SMTP
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com'; 
            $mail->SMTPAuth = true;
            $mail->Username = 'gonzalo.herrera@exa.unsa.edu.ar'; 
            $mail->Password = 'asd';  
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            $mail->setFrom('gonzalo.herrera@exa.unsa.edu.ar', 'Mensaje desde el portafolio');
            $mail->addAddress('gonzalonherrera9000@gmail.com', 'Gonzalo Herrera'); 
            if (filter_var($correo, FILTER_VALIDATE_EMAIL)) {
                $mail->addAddress($correo); // solo si es válido
            } else {
                $comentario .= " <br><em>El correo ingresado no es válido: $correo</em>";
            } 

            $mail->isHTML(true);
            $mail->Subject = "Correo enviado con exito";
            $mail->Body = "
                <p><strong>Gracias</strong> $correo por tu mensaje</p>
                <p><strong></strong> $comentario</p>
                Nos comunicaremos en breve
            ";

            $mail->send();
            $mensaje = "El formulario se ha enviado con éxito.";
            $claseMensaje = "success";
        } catch (Exception $e) {
            $mensaje = "Error al enviar el mensaje: {$mail->ErrorInfo}";
            $claseMensaje = "error";
        }
        

    }
    ?>

    <div class="floating-form">
        <div class="form-container" id="formContainer">
            <div class="form-header">
                <h2>Contacto</h2>
                <p>Envíame un mensaje</p>
                <button class="close-btn" id="closeBtn">×</button>
            </div>
            
            <div class="form-body">
                <?php if ($mensaje): ?>
                    <div class="message <?php echo $claseMensaje; ?>">
                        <?php echo $mensaje; ?>
                    </div>
                <?php endif; ?>
                
                <form method="post">
                    <div class="form-group">
                        <label for="correo">Correo electrónico</label>
                        <input type="email" id="correo" name="correo" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="comentario">Comentario</label>
                        <textarea id="comentario" name="comentario" required></textarea>
                    </div>
                    
                    <button type="submit" class="submit-btn">Enviar mensaje</button>
                </form>
            </div>
        </div>
        
        <div class="toggle-form" id="toggleBtn">
            ✉️
        </div>
    </div>

</body>
</html>

