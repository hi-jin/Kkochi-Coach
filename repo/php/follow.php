<?php
require("./core.php");
require("./read-post-list.php");
require("./write-post-list.php");

if (!check_auth()) return;

$post_id = $_POST["postId"];
if (!check([$post_id])) {
    echo "invalid-form";
    return;
}

$post_list = read_post_list();
foreach ($post_list as $post) {
    if (strcmp($post->id, $post_id) === 0) {
        $post->follower = $post->follower + 1;
    }
}
if (!write_post_list($post_list)) {
    echo "internal-error";
    return;
}

echo "success";
?>