<?php

include_once 'classes/config.class.php';

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

function folder_exist($folder)
{
    $path = realpath($folder);

    return ($path !== false AND is_dir($path)) ? $path : false;
}

$config = new Config();
if (isset($config))
{
 if (!$config::$error && $config::check_token($_COOKIE['token']))
     {

if ( !empty( $_FILES ) ) {

    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];   

//    $uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'picupload' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
    $temp = explode(".", $_FILES["file"]["name"]);
    $extension = end($temp);
    $realfiledata = str2url($temp[0]).".".$extension;
    $uploadPath = $_SERVER['DOCUMENT_ROOT'] . DIRECTORY_SEPARATOR . $_GET['dir'] . DIRECTORY_SEPARATOR . $realfiledata;

    if (!folder_exist($_SERVER['DOCUMENT_ROOT'] . DIRECTORY_SEPARATOR . $_GET['dir']))
    {
     mkdir($_SERVER['DOCUMENT_ROOT'] . DIRECTORY_SEPARATOR . $_GET['dir'], 0755);
    }
    
    move_uploaded_file( $tempPath, $uploadPath );

    $answer = array( 'answer' => $realfiledata );
    $json = json_encode( $answer );

    echo $json;

} else {

    echo 'No files';

}

}

}

?>