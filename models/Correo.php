<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once BASE_PATH . '/vendor/autoload.php';

class Correo {
    public function enviarCorreo($nombre, $email, $mensaje) {
        try {
            $msg="Mensaje enviado correctamente.";
            $mail = new PHPMailer(true);
            $mail->isSMTP();
            $mail->Host       = 'smtp.gmail.com';
            $mail->SMTPAuth   = true;
            $mail->Username   = 'gonzalo.herrera@exa.unsa.edu.ar';
            $mail->Password   = '';             
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = 587;

            $mail->setFrom('gonzalo.herrera@exa.unsa.edu.ar');
            $mail->addAddress('gonzalonherrera9000@gmail.com', 'Gonzalo Herrera');

            if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $mail->addAddress($email, $nombre);
            }
            else{
                $msg="Direccion de correo invalida.";
            }

            $mail->isHTML(true);
            $mail->Subject = "Nuevo mensaje desde Portfolio";
            $mail->Body = "
                <p><strong>Gracias $nombre por tu mensaje</strong></p>
                <strong><p>$mensaje</p></strong>
                <strong><p>Nos comunicaremos en brevedad a $correo</p></strong>
            ";

            $mail->send();
            return $msg;
        } catch (Exception $e) {
            return "Error al enviar correo: {$mail->ErrorInfo}";
        }
    }
}
