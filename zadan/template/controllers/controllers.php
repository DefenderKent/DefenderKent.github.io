<?php

$a = filter_input(INPUT_GET, 'r'); //проверяем, нет ли GET параметра r 

if (!$a) //если GET параметра 'r' нет - следовательно подключаем Shablon1.php
{
   include 'view/index.php';
}
else //если GET параметра r, есть - подключаем Shablon2.php
{
    include 'view/Shablon2.php';
}
?>