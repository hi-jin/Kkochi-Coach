<?php
require("./core.php");

$id = validate($_POST["id"]);
$pw = validate($_POST["pw"]);

if (!check([$id, $pw])) {
    echo "invalid-form";
    return;
}

if (!login($id, $pw)) {
    echo "login-failed";
    return;
}

session_start();
$_SESSION["id"] = $id;


function login($id, $pw) {
    $file_name = "../../db/users.json";
    if (!file_exists($file_name)) {
        return false;
    }

    $file = fopen($file_name, "r");
    if (!$file) {
        return false;
    }

    $result = false;
    while (!feof($file)) {
        $line = fgets($file);
        $user = json_decode($line);
        if (strcmp($user->id, $id) === 0) {
            if (strcmp($user->pw, $pw) === 0) {
                $result = true;
                break;
            }
        }
    }

    fclose($file);

    return $result;
}
?>