<?php
require("./core.php");
require("./read-todo-list.php");
require("./write-todo-list.php");

if (!check_auth()) return;

$todo = $_POST["todo"];
$todo = json_decode($todo);

$id = validate($todo->id);
$goal = validate($todo->goal);
$what = validate($todo->what);
$where = validate($todo->where);
$when = validate($todo->when);
$repeat_day_of_week = $todo->repeat_day_of_week;
$desc = validate($todo->desc);
$start_date = validate($todo->start_date);

if (!check([$id, $goal, $what, $where, $when, $repeat_day_of_week, $desc, $start_date])) {
    echo "invalid-form";
    return;
}

if (count($repeat_day_of_week) === 0) {
    echo "invalid-form";
    return;
}

$todo = new stdClass();
$todo->id = $id;
$todo->goal = $goal;
$todo->what = $what;
$todo->where = $where;
$todo->when = $when;
$todo->repeat_day_of_week = $repeat_day_of_week;
$todo->desc = $desc;
$todo->start_date = $start_date;

$todo_list = read_todo_list($_SESSION["id"]);
$new_list = [];
foreach ($todo_list as $todo_of_list) {
    if (strcmp($todo_of_list->id, $todo->id) === 0) {
        $todo_of_list = $todo;
    }
    array_push($new_list, $todo_of_list);
}
if (!write_todo_list($_SESSION["id"], $new_list)) {
    echo "internal-error";
    return;
}

echo $todo->id;
?>
