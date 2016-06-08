<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once 'classes/config.class.php';

$config = new Config();
if (isset($config))
{
 if (!$config::$error && $config::check_token($_COOKIE['token']))
     {
         $config::page_set_switch($_GET['id']);
     }
}

?>