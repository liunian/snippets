<?php
    # do not need anymore
    if(isset($_GET['sleep'])) {
        sleep($_GET['sleep']);
    }

    if(isset($_GET['t'])) {
        echo 'gt=' . $_GET['t'];
    } else if(isset($_POST['key']) && isset($_POST['value'])){
        echo $_POST['key'] . '=' . $_POST['value'];
    } else {
        echo "get/post ajax.php";
    }
?>
