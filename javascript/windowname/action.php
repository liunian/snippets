<?php
//sleep(5);

if(isset($_POST['windowname'])) {
?>
<script type="text/javascript">
// alert(window.name);
window.name = "{key: 'happy', value: 'happy'}";
// alert(window.name);
</script>

<?php
} else {
    $callbackName = isset($_GET['callback']) ? $_GET['callback'] : 'callback';
    echo $callbackName . '("{key: \"happy\", value: \"happy\"}")';
}
?>
