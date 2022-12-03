<?php
require("./core.php");

$id = validate($_POST["id"]);
$pw = validate($_POST["pw"]);

if (!check([$id, $pw])) {
    echo "invalid-form";
    return;
}

if (find_user($id)) {
    echo "duplicated";
    return;
}

if (!register($id, $pw)) {
    echo "internal-error";
    return;
}


/**
 * $id, $pw로 회원가입
 * users.json에 기록
 */
function register($id, $pw) {
    clearstatcache();
    $file_name = "../../db/users.json";
    $file = fopen($file_name, "a");
    if (!$file) return false;

    $user = new stdClass();
    $user->id = $id;
    $user->pw = $pw;
    if (filesize($file_name) > 0) {
        fwrite($file, "\n");
    }
    fwrite($file, json_encode($user, JSON_UNESCAPED_UNICODE));

    fclose($file);
    return true;
}

/**
 * 중복되는 아이디가 존재하면 true
 */
function find_user($id) {
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
            $result = true;
            break;
        }
    }

    fclose($file);

    return $result;
}
?>