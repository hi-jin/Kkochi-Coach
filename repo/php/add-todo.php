<?php
session_start();
if (!isset($_SESSION["id"])) {
    echo "login-failed";
    return;
}

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

$todo = new stdClass();
$todo->id = "".get_todo_id();
$todo->goal = $goal;
$todo->what = $what;
$todo->where = $where;
$todo->when = $when;
$todo->repeat_day_of_week = $repeat_day_of_week;
$todo->desc = $desc;
$todo->start_date = $start_date;

if (!save_todo($todo)) {
    echo "internal-error";
    return;
}

echo $todo->id;


function save_todo($todo) {
    clearstatcache();
    $file_name = "../../db/" . $_SESSION["id"] . ".json";
    $file = fopen($file_name, "a");
    if (!$file) return false;

    if (filesize($file_name) > 0) {
        fwrite($file, "\n");
    }
    fwrite($file, json_encode($todo, JSON_UNESCAPED_UNICODE));

    fclose($file);
    return true;
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
