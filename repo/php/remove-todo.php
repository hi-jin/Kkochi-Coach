<?php
session_start();
if (!isset($_SESSION["id"])) {
    echo "login-failed";
    return;
}

$todo_id = validate($_POST["todoId"]);
if ($todo_id === null || $todo_id === "") {
    echo "invalid-form";
    return;
}

$todo_list = read_todo_list_without_selected($todo_id);
if (!write_todo_list($todo_list)) {
    echo "internal-error";
    return;
}


function write_todo_list($todo_list) {
    $file_name = "../../db/" . $_SESSION["id"] . ".json";
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

function read_todo_list_without_selected($todo_id) {
    $file_name = "../../db/" . $_SESSION["id"] . ".json";
    if (!file_exists($file_name)) {
        return [];
    }
    $file = fopen($file_name, "r");
    if (!$file) {
        return [];
    }

    $result = [];
    while (!feof($file)) {
        $line = fgets($file);
        $todo = json_decode($line);
        if ($todo === null) continue;
        if (strcmp($todo->id, $todo_id) === 0) continue;

        array_push($result, $todo);
    }

    fclose($file);
    return $result;
}

function validate($input) {
    return htmlspecialchars(stripslashes(trim($input)));
}
?>