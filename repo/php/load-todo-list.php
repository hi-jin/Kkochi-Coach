<?php
require("./core.php");
require("./read-todo-list.php");

if (!check_auth()) return;

$todo_list = read_todo_list($_SESSION["id"]);
echo json_encode($todo_list, JSON_UNESCAPED_UNICODE);
?>