<?php

$_POST = json_decode(file_get_contents('php://input'), true);
$login = $_POST['login'];
$pass = $_POST['pass'];

include_once 'classes/config.class.php';

$config = new Config();
$json['success'] = false;
if (isset($config) && isset($login) && isset($pass))
{
 if (!$config::$error && $config::check_token($_COOKIE['token']))
     {
      $json['success'] = $config::user_change($login,$pass,$_COOKIE['token']);
     }
}

echo json_encode($json);  

?>