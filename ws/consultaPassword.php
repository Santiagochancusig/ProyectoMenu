<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once '../datos/coneccion.php';
$conn = mysqli_connect(NOMBRE_HOST, USUARIO, CONTRASENA, BASE_DE_DATOS);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$usuario = $request->usuario;
@$id_perfil = $request->id_perfil;
@$contrasena=$request->contrasena;
@$pagina = $request->pagina;
$pagina="errorLogin.php";
$sql = "
SELECT usuarios.id_perfil FROM usuarios WHERE usuarios.usuario='$usuario' AND usuarios.contrasena='$contrasena'";
if (mysqli_connect_errno()) {
    header('Content-type: application/json; charset=utf-8');
    echo json_encode(array(
        'status' => 'failure',
        'message' => 'Could Not connect to database',
    ));
}
$data = mysqli_query($conn, $sql);
if ($data) {
    $outp = "";
    while ($row = mysqli_fetch_array($data)) {
        if ($outp != "") {$outp .= ",";}
        $outp .= '{"id_perfil":"'  .  $row['id_perfil'] . '"}';
    }
    $outp ='{"CONSULTALOGIN":['.$outp.']}';
    $conn->close();
    echo($outp);
}
?>