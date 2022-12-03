<?php
require("./core.php");
require("./read-todo-list.php");
require("./write-todo-list.php");

if (!check_auth()) return;

$todo_id = validate($_POST["todoId"]);
$end_date = validate($_POST["endDate"]);
if (!check($todo_id, $end_date)) {
    echo "invalid-form";
    return;
}

$todo_list = read_todo_list($_SESSION["id"]);
foreach ($todo_list as $todo) {
    if (strcmp($todo->id, $todo_id) !== 0) continue;

    if ($todo->end_date !== null) {
        echo "already-finished";
        return;
    }
    $todo->end_date = $end_date;
}

if (!write_todo_list($_SESSION["id"], $todo_list)) {
    echo "internal-error";
    return;
}
?>