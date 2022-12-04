<?php
function read_post_list() {
    $file_name = "../../db/post/post.json";
    if (!file_exists(($file_name))) return [];

    $file = file_get_contents($file_name);
    if (!$file) return [];
    
    if (filesize($file_name) === 0) return [];

    $post_list = json_decode($file);
    return $post_list;
}
?>