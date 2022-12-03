<?php
require("./core.php");
require("./read-clear-log.php");
require("./write-clear-log.php");

if (!check_auth()) return;

$todo_id = validate($_POST["todoId"]);
$date = validate($_POST["date"]);

if (!check([$todo_id, $date])) {
    echo "invalid-form";
    return;
}

$clear_log = read_clear_log($_SESSION["id"]);
foreach ($clear_log as $log) {
    if (strcmp($log->todo_id, $todo_id) === 0) {
        if (strcmp($log->date, $date) === 0) {
            echo "already-cleared";
            return;
        }
    }
}
$log = new stdClass();
$log->todo_id = $todo_id;
$log->date = $date;
array_push($clear_log, $log);
if (!write_clear_log($_SESSION["id"], $clear_log)) {
    echo "internal-error";
    return;
}
echo "success";
?>