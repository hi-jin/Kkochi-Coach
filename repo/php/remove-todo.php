<?php
require("./core.php");
require("./read-todo-list.php");
require("./write-todo-list.php");
require("./read-clear-log.php");
require("./write-clear-log.php");

if (!check_auth()) return;

$todo_id = validate($_POST["todoId"]);
if (!check([$todo_id])) {
    echo "invalid-form";
    return;
}

$todo_list = read_todo_list($_SESSION["id"]);
$new_list = [];
foreach ($todo_list as $todo) {
    if (strcmp($todo->id, $todo_id) === 0) continue;
    array_push($new_list, $todo);
}
if (!write_todo_list($_SESSION["id"], $new_list)) {
    echo "internal-error";
    return;
}

$clear_log = read_clear_log($_SESSION["id"]);
$new_clear_log = [];
foreach ($clear_log as $log) {
    if (strcmp($log->todo_id, $todo_id) === 0) continue;
    array_push($new_clear_log, $log);
}
if (!write_clear_log($_SESSION["id"], $new_clear_log)) {
    echo "internal-error";
    return;
}
?>