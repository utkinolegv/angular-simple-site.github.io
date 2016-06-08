<?php

session_unset();
session_destroy();	
$_SESSION = array();
setcookie('token', '');
setcookie('PHPSESSID', '');

?>