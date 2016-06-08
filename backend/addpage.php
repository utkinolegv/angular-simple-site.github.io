<?php

$_POST = json_decode(file_get_contents('php://input'), true);
$name = $_POST['name'];
$content = $_POST['content'];
$id = $_POST['id'];
$pagetype = $_POST['pagetype'];
$level = $_POST['level'];
$background = $_POST['background'];
$shortnews = $_POST['shortnews'];

include_once 'classes/config.class.php';

$config = new Config();
$json['success'] = false;
if (isset($config))
{
 if (!$config::$error && $config::check_token($_COOKIE['token']))
     {
      $json['success'] =  $config::page_modify($id, $name, $content, $pagetype, $level, $background, $shortnews);
     }
}

echo json_encode($json);  

?>