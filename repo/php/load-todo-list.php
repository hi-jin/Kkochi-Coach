<?php
session_start();

if (!isset($_SESSION["id"])) {
    echo "login-failed";
    return;
}

echo json_encode(get_todo_list($_SESSION["id"]), JSON_UNESCAPED_UNICODE);


function get_todo_list($id) {
    $file_name = "../../db/" . $id . ".json";
    if (!file_exists($file_name)) {
        return [];
    }
    $file = fopen($file_name, "r");
    if (!$file) return [];

    $result = [];
    while (!feof($file)) {
        $line = fgets($file);
        $todo = json_decode($line);
        array_push($result, $todo);
    }

    fclose($file);
    return $result;
}
?>