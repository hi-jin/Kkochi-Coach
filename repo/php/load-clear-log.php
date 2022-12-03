<?php
require("./core.php");
require("./read-clear-log.php");

if (!check_auth()) return;

$clear_log = read_clear_log($_SESSION["id"]);
echo json_encode($clear_log, JSON_UNESCAPED_UNICODE);
?>