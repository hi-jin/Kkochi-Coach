<?php
session_start();
if (!isset($_SESSION["id"])) {
    echo "login-failed";
    return;
}

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

if (!modify_todo($_SESSION["id"], $todo)) {
    echo "internal-error";
    return;
}

echo $todo->id;

function modify_todo($user_id, $todo) {
    $todo_list = get_and_modify_todo_list($user_id, $todo);
    if (!save_todo_list($user_id, $todo_list)) {
        return false;
    }
    return true;
}

function save_todo_list($user_id, $todo_list) {
    $file_name = "../../db/" . $user_id . ".json";
    $file = fopen($file_name, "w");
    if (!$file) return false;

    foreach ($todo_list as $todo) {
        clearstatcache();
        if (filesize($file_name) > 0) {
            fwrite($file, "\n");
        }
        fwrite($file, json_encode($todo, JSON_UNESCAPED_UNICODE));
    }

    fclose($file);
    return true;
}

function get_and_modify_todo_list($user_id, $todo) {
    $file_name = "../../db/" . $user_id . ".json";
    if (!file_exists($file_name)) {
        return [];
    }
    $file = fopen($file_name, "r");
    if (!$file) return [];

    $result = [];
    while (!feof($file)) {
        $line = fgets($file);
        $objTodo = json_decode($line);
        if (strcmp($objTodo->id, $todo->id) === 0) {
            $objTodo = $todo;
        }
        array_push($result, $objTodo);
    }

    fclose($file);
    return $result;
}

function get_todo_id() {
    clearstatcache();
    $file_name = "../../db/" . $_SESSION["id"] . ".json";
    if (!file_exists($file_name)) return 0;

    $file = fopen($file_name, "r");
    if (!$file) return 0;
    
    $last_obj = null;
    while (!feof($file)) {
        $line = fgets($file);
        if ($line === "") continue;
        $last_obj = json_decode($line);
    }

    fclose($file);
    
    if ($last_obj === null) return 0;
    return (int) $last_obj->id + 1;
}


function check($array) {
    foreach ($array as $elem) {
        if ($elem === null || $elem === "") return false;
    }
    return true;
}

function validate($input) {
    return htmlspecialchars(stripslashes(trim($input)));
}
?>
