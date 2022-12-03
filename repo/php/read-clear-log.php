<?php
function read_clear_log($user_id) {
    $file_name = "../../db/log/" . $user_id . ".json";
    $file = file_get_contents($file_name);
    if (!$file) return [];

    if (filesize($file_name) === 0) return [];

    $clear_log = json_decode($file);
    return $clear_log;
}
?>