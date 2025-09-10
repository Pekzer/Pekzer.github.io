<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/../vendor/autoload.php';

class Correo {
    private $mail;

    public function __construct() {
        $this->mail = new PHPMailer(true);

        // Configuración general SMTP
        $this->mail->isSMTP();
        $this->mail->Host = 'smtp.gmail.com';
        $this->mail->SMTPAuth = true;
        $this->mail->Username = 'gonzalo.herrera@exa.unsa.edu.ar'; 
        $this->mail->Password = '';
        $this->mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $this->mail->Port = 587;

        $this->mail->setFrom('gonzalo.herrera@exa.unsa.edu.ar', 'Mensaje desde el portafolio');
    }

    public function enviar($correo, $comentario) {
        try {
            $this->mail->addAddress('gonzalonherrera9000@gmail.com', 'Gonzalo Herrera');

            if (filter_var($correo, FILTER_VALIDATE_EMAIL)) {
                $this->mail->addReplyTo($correo);
            } else {
                $comentario .= " <br><em>El correo ingresado no es válido: $correo</em>";
            }

            $this->mail->isHTML(true);
            $this->mail->Subject = "Nuevo mensaje desde el Portfolio";
            $this->mail->Body = "
                <p><strong>Correo:</strong> $correo</p>
                <p><strong>Mensaje:</strong></p>
                <p>$comentario</p>
            ";

            $this->mail->send();
            return ["status" => "success", "msg" => "El formulario se envió con éxito."];
        } catch (Exception $e) {
            return ["status" => "error", "msg" => "Error al enviar el mensaje: {$this->mail->ErrorInfo}"];
        }
    }
}
