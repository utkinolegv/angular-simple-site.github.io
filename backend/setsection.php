<?php

include_once 'classes/config.class.php';

$config = new Config();
$json['success'] = false;
if (isset($config))
{
 if (!$config::$error && $config::check_token($_COOKIE['token']))
     {
      $json['success'] = $config::set_section(json_decode(file_get_contents('php://input'), true));
     }
}

echo json_encode($json);  

?>