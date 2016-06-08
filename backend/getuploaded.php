<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once 'classes/config.class.php';

$outp = "";

$config = new Config();
if (isset($config))
{
 if (!$config::$error && $config::check_token($_COOKIE['token']))
     {
      
      $files = scandir($_SERVER['DOCUMENT_ROOT'] . DIRECTORY_SEPARATOR . $_GET['dir']);
      $allowedExts = array("gif", "jpeg", "jpg", "png");
      
      foreach ($files as $key => $value)       
      { 
       if (!in_array($value,array(".",".."))) 
       { 
         if (!is_dir($_SERVER['DOCUMENT_ROOT'] . DIRECTORY_SEPARATOR . $_GET['dir'] . DIRECTORY_SEPARATOR . $value)) 
         {
           $temp = explode(".", $value);
           $extension = strtolower(end($temp));

           if ($outp != "") {$outp .= ",";}

           $outp .= '{"name":"' . $value . '",';
           $fs = filesize($_SERVER['DOCUMENT_ROOT'] . DIRECTORY_SEPARATOR . $_GET['dir'] . DIRECTORY_SEPARATOR . $value);
           if ($fs<1024768)
           {
            if ($fs<1024)
             $fs0 = $fs . 'б';
            else
             $fs0 = round($fs/1024,2) . 'Кб';
           }
           else 
           {
            $fs0 = round($fs/1024765,2) . 'Мб';
           }
           $outp .= '"size":"'.$fs.'",';
           $outp .= '"namesize":"'.$value.' ('. $fs0.')",';
           $outp .= '"dateModified":"",';

           if ($extension==='gif')
           { $type = 'image/gif'; }
           else
           if ($extension==='jpg' || $extension==='jpeg')
           { $type = 'image/jpeg'; }
           else
           if ($extension==='png')
           { $type = 'image/png'; }

           $outp .= '"type":"'.$type.'"}'; 
         }
       }
      }
       echo '{"records":['.$outp.']}';
     }
}

?>