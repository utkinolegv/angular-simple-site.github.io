<?php
require_once 'config.php';

function rus2translit($string) {
    $converter = array(
        'а' => 'a',   'б' => 'b',   'в' => 'v',
        'г' => 'g',   'д' => 'd',   'е' => 'e',
        'ё' => 'e',   'ж' => 'zh',  'з' => 'z',
        'и' => 'i',   'й' => 'y',   'к' => 'k',
        'л' => 'l',   'м' => 'm',   'н' => 'n',
        'о' => 'o',   'п' => 'p',   'р' => 'r',
        'с' => 's',   'т' => 't',   'у' => 'u',
        'ф' => 'f',   'х' => 'h',   'ц' => 'c',
        'ч' => 'ch',  'ш' => 'sh',  'щ' => 'sch',
        'ь' => '\'',  'ы' => 'y',   'ъ' => '\'',
        'э' => 'e',   'ю' => 'yu',  'я' => 'ya',
        
        'А' => 'A',   'Б' => 'B',   'В' => 'V',
        'Г' => 'G',   'Д' => 'D',   'Е' => 'E',
        'Ё' => 'E',   'Ж' => 'Zh',  'З' => 'Z',
        'И' => 'I',   'Й' => 'Y',   'К' => 'K',
        'Л' => 'L',   'М' => 'M',   'Н' => 'N',
        'О' => 'O',   'П' => 'P',   'Р' => 'R',
        'С' => 'S',   'Т' => 'T',   'У' => 'U',
        'Ф' => 'F',   'Х' => 'H',   'Ц' => 'C',
        'Ч' => 'Ch',  'Ш' => 'Sh',  'Щ' => 'Sch',
        'Ь' => '\'',  'Ы' => 'Y',   'Ъ' => '\'',
        'Э' => 'E',   'Ю' => 'Yu',  'Я' => 'Ya',
    );
    return strtr($string, $converter);
}

function str2url($str) {
    $str = rus2translit($str);
    $str = strtolower($str);
    $str = preg_replace('~[^-a-z0-9_]+~u', '-', $str);
    $str = trim($str, "-");
    return $str;
}

$conn = create_conn();
if (isset($conn))
{
 if (check_token($conn,$_COOKIE['token']) && !empty( $_FILES)
     {


$allowedExts = array("gif", "jpeg", "jpg", "png");
$temp = explode(".", $_FILES["file"]["name"]);
$extension = end($temp);
$userdir = md5(get_user_name($conn,$_COOKIE['token']));

if ((($_FILES["file"]["type"] == "image/gif")
|| ($_FILES["file"]["type"] == "image/jpeg")
|| ($_FILES["file"]["type"] == "image/jpg")
|| ($_FILES["file"]["type"] == "image/pjpeg")
|| ($_FILES["file"]["type"] == "image/x-png")
|| ($_FILES["file"]["type"] == "image/png"))
&& ($_FILES["file"]["size"] < 200000)
&& in_array($extension, $allowedExts)) {
    if ($_FILES["file"]["error"] > 0) {
        $json['ok'] = '0';  
        $json['answer'] = "Ошибка: " . $_FILES["file"]["error"];
    } else {
        $realfiledata = str2url($temp[0]).".".$extension;
        $real = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . "picupload" . DIRECTORY_SEPARATOR . $userdir. DIRECTORY_SEPARATOR . $realfiledata;
        if (file_exists($real)) {
            if (filesize($real)== $_FILES["file"]["size"])
            {
             $json['ok'] = '1';  
             $json['answer'] = urlencode("picupload" . DIRECTORY_SEPARATOR . $userdir. DIRECTORY_SEPARATOR . $realfiledata);  
            }
            else
            {
              mkdir(dirname( __FILE__ ) . DIRECTORY_SEPARATOR . "picupload" . DIRECTORY_SEPARATOR . $userdir, 0700); 
              move_uploaded_file($_FILES["file"]["tmp_name"],$real);
              $json['ok'] = '1';  
              $json['answer'] = urlencode("picupload" . DIRECTORY_SEPARATOR . $userdir. DIRECTORY_SEPARATOR . $realfiledata);  
            } 
        } else {
             mkdir(dirname( __FILE__ ) . DIRECTORY_SEPARATOR . "picupload" . DIRECTORY_SEPARATOR . $userdir, 0700);
             move_uploaded_file($_FILES["file"]["tmp_name"],$real);
             $json['ok'] = '1';  
             $json['answer'] = urlencode("picupload" . DIRECTORY_SEPARATOR . $userdir. DIRECTORY_SEPARATOR . $realfiledata);  
        }
    }
} else {
        $json['ok'] = '0';  
        $json['answer'] = "Ошибка загрузки файла.";
}

} else
  {
        $json['ok'] = '0';  
        $json['answer'] = "Доступ запрещен.";
  }

} else
  {
        $json['ok'] = '0';  
        $json['src'] = "Ошибка подключения.";
  }
  echo json_encode($json); 


?>