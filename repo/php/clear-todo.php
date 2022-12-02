<?php
session_start();

$todo_id = validate($_POST["todoId"]);
$date = validate($_POST["date"]);

if (!isset($_SESSION["id"])) {
    echo "login-failed";
    return;
}

if ($todo_id === null || $todo_id === "" || $date === null || $date === "") {
    echo "invalid-form";
    return;
}

if (find_clear_log($todo_id, $date)) {
    echo "already-cleared";
    return;
}

if (!save_clear_log($todo_id, $date)) {
    echo "internal-error";
    return;
}

echo "success";


function save_clear_log($todo_id, $date) {
    $clear_log = new stdClass();
    $clear_log->todo_id = $todo_id;
    $clear_log->date = $date;

    $file_name = "../../db/log/" . $_SESSION["id"] . ".json";
    $file = fopen($file_name, "a");
    if (!$file) return false;

    if (filesize($file_name) > 0) {
        fwrite($file, "\n");
    }
    fwrite($file, json_encode($clear_log, JSON_UNESCAPED_UNICODE));
    fclose($file);

    return true;
}

function find_clear_log($todo_id, $date) {
    $file_name = "../../db/log/" . $_SESSION["id"] . ".json";
    if (!file_exists($file_name)) return false;

    $file = fopen($file_name, "r");
    while (!feof($file)) {
        $line = fgets($file);
        $clear_log = json_decode($line);
        if (strcmp($todo_id, $clear_log->todo_id) === 0 && strcmp($date, $clear_log->date) === 0) {
            return true;
        }
    }

    fclose($file);
    return false;
}

function validate($input) {
    return htmlspecialchars(stripslashes(trim($input)));
}
?>