<?php
class Database {
    private static $host = "mysql-pekzer.alwaysdata.net"; //localhost
    private static $db = "pekzer_portfolio"; //portfolio
    private static $user = "pekzer"; //root
    private static $pass = "portafolio123"; //''
    private static $charset = "utf8mb4";

    public static function connect() {
        $dsn = "mysql:host=" . self::$host . ";dbname=" . self::$db . ";charset=" . self::$charset;
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];
        return new PDO($dsn, self::$user, self::$pass, $options);
    }
}
?>