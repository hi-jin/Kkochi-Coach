<?php
function check_auth() {
    session_start();
    if (!isset($_SESSION["id"])) {
        echo "login-failed";
        return false;
    }
    return true;
}

function check($array) {
    foreach ($array as $elem) {
        if ($elem === null || $elem === "") return false;
    }
    return true;
}

function validate($input) {
    return htmlspecialchars(stripslashes(trim($input)));
}
?>