<?php
function write_todo_list($user_id, $todo_list) {
    $file_name = "../../db/" . $user_id . ".json";
    $file = fopen($file_name, "w");
    if (!$file) return false;

    $pieces = str_split(json_encode($todo_list, JSON_UNESCAPED_UNICODE), 1024);
    foreach ($pieces as $piece) {
        fwrite($file, $piece, strlen($piece));
    }

    fclose($file);
    return true;
}
?>