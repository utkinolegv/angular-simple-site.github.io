<?php
ini_set('display_errors', 0);
error_reporting(); 
define("MYSQL_CONN_ERROR", "Unable connect to database."); 
mysqli_report(MYSQLI_REPORT_STRICT); 

class Config {
   public static $conn = NULL;
   public static $error = false;
   
   function __construct() {
    
    $dbname = ""; // setup Database name
    $dbuser = ""; // setup Database user
    $dbpasswd = ""; // setup Database password
    
    try {
     self::$conn = new mysqli("localhost", $dbuser, $dbpasswd, $dbname);
    }
    catch (exception $e)
    {
     self::$conn = NULL;
     self::$error = true;
     echo "Service unavailable";
    }
   }
   
   function __destruct() {
    if (isset(self::$conn))
    {
     self::$conn->close();
    }
   }

   // User auth
   public static function user_auth($login,$pass)
   {
    try 
    {
           // Check exist user
	   $res = self::$conn->query("SELECT * FROM users WHERE username='".$login."' AND password='".md5($pass)."' LIMIT 1;");
	   if($res->num_rows!=0) 
     {	
          
          $token = md5(time().$login);
          setcookie('token', $token, time() + 60 * 60 * 24 * 14);
          
          self::$conn->query("UPDATE users SET token='$token' WHERE username='".$login."'AND password='".md5($pass)."'");
    
          session_start(); 

  	  $_SESSION['login'] = $login;	
  	  $_SESSION['pass'] = md5($pass);

          return true;
   	 } 
     else
     {
      return false;
     }  
    }
    catch (exception $e)
    {
     echo "Service unavailable";
    }
   }

   // user auth - change data
   public static function user_change($login,$pass,$token)
   {
    try 
    {
      self::$conn->query("UPDATE users SET username='".$login."', password='".md5($pass)."' WHERE token='$token';");
  	  $_SESSION['login'] = $login;	
  	  $_SESSION['pass'] = md5($pass);
      return true;
    }
    catch (exception $e)
    {
     echo "Service unavailable";
    }
   }

   // Get news
   public static function newses($limit, $offset, $id)
   {
    try 
    {
      $outp = "";
      if (!empty($id))
       $result = self::$conn->query("SELECT * FROM pages WHERE pagetype='news' AND onoff=1 AND id<>".$id." ORDER BY id DESC LIMIT ".$offset.", ".$limit.";");
      else
       $result = self::$conn->query("SELECT * FROM pages WHERE pagetype='news' AND onoff=1 ORDER BY id DESC LIMIT ".$offset.", ".$limit.";");
// $result = self::$conn->query("SELECT * FROM pages WHERE pagetype='news' AND onoff=1 ORDER BY id DESC;");
      while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
        if ($outp != "") {$outp .= ",";}
        $outp .= '{"Id":"' . $rs["id"] . '",';
        $outp .= '"Name":"' . base64_decode($rs["name"]) . '",';
        $outp .= '"News":"' . base64_decode($rs["shortnews"]) . '",';
        $outp .= '"urlPicture":"' . $rs["background"] . '",';
        $outp .= '"Date":"'. date("d-m-Y", strtotime($rs["ndate"])) .'"}'; 
      }
      return '{"records":['.$outp.']}';
    }
    catch (exception $e)
    {
     echo "Service unavailable";
    }
   }

   // Get pages
   public static function page_get_all($zeroid, $zero, $type, $parentid)
   {
    try 
    {
      if (empty($type))
      {
       $type = 'page';
      }
      
      $outp = "";
      if (!empty($zero))
      {
       $outp .= '{"Id":"0",';
       $outp .= '"Name":"Zero"}';
      }
      if (empty($parentid))
      {
        $result = self::$conn->query("SELECT * FROM pages WHERE level=0 ORDER BY FIELD(pagetype, 'folder','page','news'), id ASC;");
      }
      else
      {
       $result = self::$conn->query("SELECT * FROM pages WHERE id=".$parentid." LIMIT 1;");
       $rs = $result->fetch_array(MYSQLI_ASSOC);
       $outp .= '{"Id":"' . $rs["level"] . '",';
       $outp .= '"Type":"' . $rs["pagetype"] . '",';
       $outp .= '"Name":"..",';
       $outp .= '"On":"true"}';
        
       $result = self::$conn->query("SELECT * FROM pages WHERE level=".$parentid." ORDER BY FIELD(pagetype, 'folder','page','news'), id ASC;");
      }
      
      while($rs = $result->fetch_array(MYSQLI_ASSOC)) {

      if ($rs["id"]!=$zeroid)
      {
        if ($outp != "") {$outp .= ",";}
  
        $outp .= '{"Id":"' . $rs["id"] . '",';
        $outp .= '"Type":"' . $rs["pagetype"] . '",';

        if (!empty($zero))
        {
         $outp .= '"Name":"' . base64_decode($rs["name"]) . '"}';
        }
        else
        {
          $outp .= '"Name":"' . base64_decode($rs["name"]) . '",';
        
       
         $outp .= '"Model": "pageswitch' . $rs["id"] . '",';
         if ($rs["onoff"]==1) $m = 'true'; else $m = 'false;';
         $outp .= '"On":"'.$m.'",';
         if ($rs["onoff"]==0) $m = 'true'; else $m = 'false;';
         $outp .= '"Off":"'.$m.'",';
         $outp .= '"Date":"'. date("d-m-Y", strtotime($rs["ndate"]))     . '"}'; 
        }
       }
      }
      return '{"records":['.$outp.']}';
    }
    catch (exception $e)
    {
     echo "Service unavailable";
    }
   }

   // Get single page
   public static function page_view($id,$access)
   {
    try 
    {
     if ($access)
      $result = self::$conn->query("SELECT * FROM pages WHERE id=".$id." LIMIT 1;");
     else
      $result = self::$conn->query("SELECT * FROM pages WHERE id=".$id." AND onoff=1 LIMIT 1;");
     $rs = $result->fetch_array(MYSQLI_ASSOC);
     if (!empty($rs))
     {
      $outp ='{"name":"'.$rs["name"].'", "content":"'.$rs["content"].'", "parentid":"'.$rs["level"].'", "pagetype":"'.$rs["pagetype"].'", "background":"'.$rs["background"].'", "shortnews":"'.$rs["shortnews"].'"';
      $outp .= ',"date":"'. date("d-m-Y", strtotime($rs["ndate"])) .'"'; 
      if ($rs["level"]===0)
      {
       $outp.=', "parentname":""}';
      }
      else
      {
       $result2 = self::$conn->query("SELECT name FROM pages WHERE id=".$rs["level"]." LIMIT 1;");
       $rs2 = $result2->fetch_array(MYSQLI_ASSOC);
       $outp.=', "parentname":"'.$rs2["name"].'"}';
      }
     }
     else
     {
       $outp ='{"name":"'.base64_encode('Страница не найдена').'", "content":"'.base64_encode('').'", "parentid":"0", "pagetype":"notfound", "background":"", "shortnews":"'.base64_encode('').'"';
       $outp.=', "parentname":""}';
     }
     return $outp;
    }
    catch (exception $e)
    {
     echo "Service unavailable";
    }
   }

   // Menu generator  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   public static function gen_submenu($id)
   {
    try 
    {
        $subout = "";
        $result2 = self::$conn->query("SELECT * FROM pages WHERE level=".$id." AND onoff=1 ORDER BY FIELD(pagetype, 'folder','page','news'), id ASC;");
        while($rs2 = $result2->fetch_array(MYSQLI_ASSOC)){
         if ($subout != "") {$subout .= ",";}
         
         if ($rs2["pagetype"]=='page')
          $subout .= '{"href":"#/site/page/' . $rs2["id"] . '",';
         else
         if ($rs2["pagetype"]=='news')
          $subout .= '{"href":"#/site/news/' . $rs2["id"] . '",';
         else
         if ($rs2["pagetype"]=='folder')
          $subout .= '{"href":"#",';
         
         if ($rs2["pagetype"]=='folder')
         {
          $subout .= '"children":'.self::gen_submenu($rs2["id"]).',';
         }
         else
         {
          $subout .= '"children":[],';
         }
         $subout .= '"display":"' . base64_decode($rs2["name"]) . '"}';
        } 
        return '['.$subout.']';
    }
    catch (exception $e)
    {
     echo "Service unavailable";
    }
   }

   public static function gen_menu($level)
   {
    try 
    {
      $outp = "";
      $result = self::$conn->query("SELECT * FROM pages WHERE level=".$level." AND onoff=1 ORDER BY FIELD(pagetype, 'folder','page','news'), id ASC;");
      while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
        if ($outp != "") {$outp .= ",";}

        if ($rs["pagetype"]=='page')
          $outp .= '{"href":"#/site/page/' . $rs["id"] . '",';
        else
        if ($rs["pagetype"]=='news')
          $outp .= '{"href":"#/site/news/' . $rs["id"] . '",';
        else
        if ($rs["pagetype"]=='folder')
          $outp .= '{"href":"#",';
        
        if ($rs["pagetype"]=='folder')
        {
        // $outp .= '"Child":"true",';
         $outp .= '"children":'.self::gen_submenu($rs["id"]).',';
        }
        else
        {
          $outp .= '"children":[],';
    //     $outp .= '"Child":"false",';
        }
        $outp .= '"display":"' . base64_decode($rs["name"]) . '"}';
      }
      return '['.$outp.']';
    }
    catch (exception $e)
    {
     echo "Service unavailable";
    }
   }

   // Add or modify page
   public static function page_modify($id, $name, $content, $pagetype, $level, $background, $shortnews)
   {
    try 
    {
      if ($id===0) // Add page
      {
        return self::$conn->query("INSERT INTO pages VALUES (0,
                                        '$name',
                                        '$content',
                                        NOW(),
                                        '$pagetype',
                                        $level,
                                        0,
                                        '$background',
                                        '$shortnews')");      
      }
      else // Update page
      {
       return self::$conn->query("UPDATE pages SET name='".$name."', content='".$content."', level=".$level.", background='".$background."', shortnews='".$shortnews."' WHERE id=".$id);      
      }
    }
    catch (exception $e)
    {
     echo "Service unavailable";
    }
   }

   // Move page or folder
   public static function page_move($id,$move,$parentid,$type)
   {
    try 
    {
        if ($move==1) // up record
         $result1 = self::$conn->query("SELECT * FROM pages WHERE id>".$id." AND level=".$parentid." AND pagetype='".$type."' ORDER BY id LIMIT 1;");
        else
        if ($move==0) // down record
         $result1 = self::$conn->query("SELECT * FROM pages WHERE id<".$id." AND level=".$parentid." AND pagetype='".$type."' ORDER BY id DESC LIMIT 1;");
        $rs1 = $result1->fetch_array(MYSQLI_ASSOC);
        if (!empty($rs1))
        {
         $result0 = self::$conn->query("SELECT * FROM pages WHERE id=".$id." AND level=".$parentid." AND pagetype='".$type."' LIMIT 1;");
         $rs0 = $result0->fetch_array(MYSQLI_ASSOC);
         if (!empty($rs0))
         {
          self::$conn->query("UPDATE pages SET name='".$rs1['name']."', content='".$rs1['content']."', level=".$rs1['level'].", background='".$rs1['background']."', shortnews='".$rs1['shortnews']."' WHERE id=".$rs0['id']);      
          self::$conn->query("UPDATE pages SET name='".$rs0['name']."', content='".$rs0['content']."', level=".$rs0['level'].", background='".$rs0['background']."', shortnews='".$rs0['shortnews']."' WHERE id=".$rs1['id']);      
         }
        }  
    }
    catch (exception $e)
    {
     echo "Service unavailable";
    }
   }

   // Set page visible
   public static function page_set_switch($id)
   {
    try 
    {
        $result = self::$conn->query("SELECT onoff FROM pages WHERE id=".$id." LIMIT 1;");
        $rs = $result->fetch_array(MYSQLI_ASSOC);
        if ($rs["onoff"]==1) {$m=0;} else {$m=1;}
        self::$conn->query("UPDATE pages SET onoff=".$m." WHERE id=".$id);
    }
    catch (exception $e)
    {
     echo "Service unavailable";
    }
   }

   // Delete page
   public static function page_delete($id)
   {
    try 
    {
      self::$conn->query("DELETE FROM pages WHERE id=".$id." LIMIT 1;");
    }
    catch (exception $e)
    {
     echo "Service unavailable";
    }
   }
   
   // Chack user token
   public static function check_token($token)
   {
    if (isset($token))
    {
     $token = htmlspecialchars($token); 
     $restoken = self::$conn->query(sprintf("SELECT * FROM users WHERE token='%s' LIMIT 1;",$token));
     if ($restoken->num_rows!=0)
     {
      return true;
     }
     else
     {
      return false;
     }
    }
    else
    {
     return false;
    } 
   }

   // Get user name
   public static function get_user_name($token)
   {
    if (isset($token))
    {
     $token = htmlspecialchars($token); 
     $restoken = self::$conn->query(sprintf("SELECT * FROM users WHERE token='%s' LIMIT 1;",$token));
     if ($restoken->num_rows!=0)
     {
      $rs = $restoken->fetch_array(MYSQLI_ASSOC);
      return '{"login":"'.base64_encode($rs["username"]).'", "pass":"'.base64_encode($rs["password"]).'"}';
     }
     else
     {
      return "";
     }
    }
    else
    {
     return "";
    } 
   }
   
   // Front page setup setter  
   public static function set_section($post)
   {
    try 
    {
      $id = $post['id']; 
      $param0 = $post['param0']; 
      $param1 = $post['param1']; 
      $param2 = $post['param2'];
      $param3 = $post['param3'];
      $param4 = $post['param4']; 
      $param5 = $post['param5']; 

      $restoken = self::$conn->query(sprintf("SELECT * FROM sections WHERE id='%s' LIMIT 1;",$id));
      if ($restoken->num_rows!=0)
      {
        return self::$conn->query("UPDATE sections SET param0='".$param0."',
        param1='".$param1."',
        param2='".$param2."',
        param3='".$param3."',
        param4='".$param4."',
        param5='".$param5."' WHERE id=".$id);
      }
      else
      {
        return self::$conn->query("INSERT INTO sections VALUES (0,
                                        '$param0',
                                        '$param1',
                                        '$param2',
                                        '$param3',
                                        '$param4',
                                        '$param5'
                                        );");      
      }
    }
    catch (exception $e)
    {
     echo "Service unavailable";
    }
   }
   
   // Front page getter
   public static function get_section($id)
   {
    if (isset($id))
    {
     $restoken = self::$conn->query(sprintf("SELECT * FROM sections WHERE id='%s' LIMIT 1;",$id));
     if ($restoken->num_rows!=0)
     {
      $outp = '';
      $rs = $restoken->fetch_array(MYSQLI_ASSOC);
      $outp = '{"param0":"'.base64_encode($rs["param0"]).'"';
      if (!empty($rs["param1"]))
       $outp .= ',"param1":"'.base64_encode($rs["param1"]).'"'; 
      if (!empty($rs["param2"]))
       $outp .= ',"param2":"'.base64_encode($rs["param2"]).'"';
      if (!empty($rs["param3"]))
       $outp .= ',"param3":"'.base64_encode($rs["param3"]).'"';
      if (!empty($rs["param4"]))
       $outp .= ',"param4":"'.base64_encode($rs["param4"]).'"';
      if (!empty($rs["param5"]))
       $outp .= ',"param5":"'.base64_encode($rs["param5"]).'"';
      $outp .= '}'; 
      return $outp;
     }
     else
     {
      return "";
     }
    }
    else
    {
     return "";
    } 
   }   
}  
  
?>
