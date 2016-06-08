<?php
include_once 'classes/config.class.php';

$config = new Config();
if (isset($config))
{
 if (!$config::$error && $config::check_token($_COOKIE['token']))
     {
         rename($_SERVER['DOCUMENT_ROOT'] . DIRECTORY_SEPARATOR . $_GET['f'], $_SERVER['DOCUMENT_ROOT'] . DIRECTORY_SEPARATOR . $_GET['d']);
         //unlink($_SERVER['DOCUMENT_ROOT'] . DIRECTORY_SEPARATOR . $_GET['f']);
     }
}
?>