<?php
function write_clear_log($user_id, $clear_log) {
    $file_name = "../../db/log/" . $user_id . ".json";
    $file = fopen($file_name, "w");
    if (!$file) return false;

    $pieces = str_split(json_encode($clear_log, JSON_UNESCAPED_UNICODE), 1024);
    foreach ($pieces as $piece) {
        fwrite($file, $piece, strlen($piece));
    }

    fclose($file);
    return true;
}
?>