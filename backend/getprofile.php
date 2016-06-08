<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once 'classes/config.class.php';

$config = new Config();
if (isset($config))
{
 if (!$config::$error && $config::check_token($_COOKIE['token']))
     {
         echo $config::get_user_name($_COOKIE['token']);
     }
}

?>