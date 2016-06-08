<?php
include_once 'classes/config.class.php';
$aRequest = json_decode(file_get_contents("php://input"), true);

$config = new Config();
if (isset($config))
{
 if (!$config::$error && $config::check_token($_COOKIE['token']))
     {
         if ($aRequest['method']==='delete')
          {
           $config::page_delete($aRequest['pageid']);
          }
         else
         if ($aRequest['method']==='switch')
          {
           $config::page_set_switch($aRequest['pageid']);
          } 
     }
}
?>