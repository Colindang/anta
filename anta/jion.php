<?php
header("Content-type:text/html;charset=utf-8");

$username = $_REQUEST["username"];
$pwd = $_REQUEST["pwd"];

$conn = mysql_connect("localhost", "root", "root");

if ($conn) {
    // echo "注册成功!" . "<br>";
    mysql_select_db("hao");
} else {
    // echo "连接失败!";
}



$result = mysql_query("select * from user where username = '$username'", $conn);

if (mysql_num_rows($result) == 1) {
    echo 1;
} else {
    mysql_query("insert into user values('$username','$pwd')", $conn);
    echo 0;
}
mysql_close($conn);
