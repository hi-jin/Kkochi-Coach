<?php
require("./core.php");
require("./read-post-list.php");
require("./write-post-list.php");

if (!check_auth()) return;

$post = json_decode($_POST["post"]);

if (!check([
    $post->user_id, $post->goal, $post->what,
    $post->where, $post->when, $post->repeat_day_of_week,
    $post->desc, $post->clear_count, $post->fail_count, $post->follower,
])) {
    echo "invalid-form";
    return;
}

$post_list = read_post_list();
if (count($post_list) === 0) {
    $post->id = "0";
} else {
    $post->id = "" . ((int) $post_list[count($post_list)-1]->id + 1);
}
$post->user_id = $_SESSION["id"];

array_push($post_list, $post);

if (!write_post_list($post_list)) {
    echo "internal-error";
    return;
}

echo $post->id;
?>