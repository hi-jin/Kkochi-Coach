<?php
function read_todo_list($user_id) {
    $file_name = "../../db/" . $user_id . ".json";
    $file = file_get_contents($file_name);
    if (!$file) return [];
    
    if (filesize($file_name) === 0) return [];

    $todo_list = json_decode($file);
    return $todo_list;
}
?>