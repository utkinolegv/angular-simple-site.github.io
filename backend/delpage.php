<?php
include_once 'classes/config.class.php';

$config = new Config();
if (isset($config))
{
 if (!$config::$error && $config::check_token($_COOKIE['token']))
     {
         $config::page_delete($_GET['id']);
     }
}
?>