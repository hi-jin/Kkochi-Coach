<?php
session_start();

if (!isset($_SESSION["id"])) {
    echo "login-failed";
    return;
}

echo json_encode(load_clear_log(), JSON_UNESCAPED_UNICODE);


function load_clear_log() {
    $file_name = "../../db/log/" . $_SESSION["id"] . ".json";
    if (!file_exists($file_name)) return [];

    $result = [];
    $file = fopen($file_name, "r");
    while (!feof($file)) {
        $line = fgets($file);
        $clear_log = json_decode($line);
        array_push($result, $clear_log);
    }

    fclose($file);
    return $result;
}
?>