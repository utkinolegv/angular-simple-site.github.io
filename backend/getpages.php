<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once 'classes/config.class.php';

$config = new Config();
if (isset($config))
{
  if (!empty($_GET['l']))
  {
   if (!empty($_GET['o']))
    echo $config::newses($_GET['l'],$_GET['o'],$_GET['id']);
   else
    echo $config::newses($_GET['l'],0,$_GET['id']);
  }
  else
  {
   echo $config::page_get_all($_GET['id'],$_GET['z'],$_GET['t'],$_GET['i']);
  }
}
?>