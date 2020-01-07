<?php
header("Content-type:text/html;charset=utf-8");

$username = $_POST["username"];
$pwd = $_POST["pwd"];

$conn = mysql_connect("localhost", "root", "root");

if ($conn) {
    // echo "连接成功!" . "<br>";
    mysql_select_db("hao");
} else {
    echo "连接失败!";
}

$result = mysql_query("select * from user where username='$username' and pwd='$pwd'");
$row = mysql_num_rows($result);

if ($row >= 1) {
    echo 1;
} else {
    echo 0;
}
mysql_close($conn);
