<?php
require("./core.php");
require("./read-post-list.php");

if (!check_auth()) return;

$post_list = read_post_list();

echo json_encode($post_list, JSON_UNESCAPED_UNICODE);
?>