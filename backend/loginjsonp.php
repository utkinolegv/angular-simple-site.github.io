<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$cb = $_GET['callback'];
$myData = json_decode($_GET['data']);

include_once 'classes/config.class.php';
$json['success'] = false;

$config = new Config();
if (isset($config))
{
  $json['success'] = $config::user_auth($myData->login,$myData->password);
}
echo $cb.' ('.json_encode($json).');';  

?>