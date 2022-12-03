<?php
require("./core.php");
require("./read-todo-list.php");
require("./write-todo-list.php");

if (!check_auth()) return;

$goal = validate($_POST["goal"]);
$what = validate($_POST["what"]);
$where = validate($_POST["where"]);
$when = validate($_POST["when"]);
$repeat_day_of_week = json_decode($_POST["repeatDayOfWeek"]);
$desc = validate($_POST["desc"]);
$start_date = validate($_POST["startDate"]);

if (!check([$goal, $what, $where, $when, $repeat_day_of_week, $desc, $start_date])) {
    echo "invalid-form";
    return;
}

if (count($repeat_day_of_week) === 0) {
    echo "invalid-form";
    return;
}

$todo_list = read_todo_list($_SESSION["id"]);

$todo = new stdClass();
if (count($todo_list) === 0) {
    $todo->id = "0";
} else {
    $todo->id = "" . ((int) $todo_list[count($todo_list)-1]->id + 1);
}
$todo->goal = $goal;
$todo->what = $what;
$todo->where = $where;
$todo->when = $when;
$todo->repeat_day_of_week = $repeat_day_of_week;
$todo->desc = $desc;
$todo->start_date = $start_date;

array_push($todo_list, $todo);

if (!write_todo_list($_SESSION["id"], $todo_list)) {
    echo "internal-error";
    return;
}

echo $todo->id;
?>