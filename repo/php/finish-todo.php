<?php
session_start();
if (!isset($_SESSION["id"])) {
    echo "login-failed";
    return;
}

$todo_id = validate($_POST["todoId"]);
$end_date = validate($_POST["endDate"]);
if ($todo_id === null || $todo_id === "" || $end_date === null || $end_date === "") {
    echo "invalid-form";
    return;
}

echo write_end_date_of_todo($todo_id, $end_date);


function write_end_date_of_todo($todo_id, $end_date) {
    $file_name = "../../db/" . $_SESSION["id"] . ".json";
    if (!file_exists($file_name)) {
        return "internal-error";
    }

    $file = fopen($file_name, "r");
    if (!$file) return "internal-error";
    
    $todo_list = [];
    $selected_todo = null;
    while (!feof($file)) {
        $line = fgets($file);
        $todo = json_decode($line);
        if (strcmp($todo->id, $todo_id) === 0) {
            $selected_todo = $todo;
            if ($selected_todo->end_date !== null) {
                return "already-finished";
            }
            $todo->end_date = $end_date;
        }
        array_push($todo_list, $todo);
    }
    fclose($file);
    if ($selected_todo === null) return "invalid-form";
    

    $file = fopen($file_name, "w");
    if (!$file) return "internal-error";
    foreach ($todo_list as $todo) {
        clearstatcache();
        if (filesize($file_name) > 0) {
            fwrite($file, "\n");
        }
        fwrite($file, json_encode($todo, JSON_UNESCAPED_UNICODE));
    }
    fclose($file);
}

function validate($input) {
    return htmlspecialchars(stripslashes(trim($input)));
}
?>