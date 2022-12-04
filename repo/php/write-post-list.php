<?php
function write_post_list($post_list) {
    $file_name = "../../db/post/post.json";
    $file = fopen($file_name, "w");
    if (!$file) return false;

    $pieces = str_split(json_encode($post_list, JSON_UNESCAPED_UNICODE), 1024);
    foreach ($pieces as $piece) {
        fwrite($file, $piece, strlen($piece));
    }

    fclose($file);
    return true;
}
?>