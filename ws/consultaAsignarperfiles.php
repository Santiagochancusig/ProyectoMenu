<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once '../datos/coneccion.php';
$conn = mysqli_connect(NOMBRE_HOST, USUARIO, CONTRASENA, BASE_DE_DATOS);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$id_perfil=$request->id_perfil;
@$nombre_perfil=$request->nombre_perfil;
@$estado=$request->estado;
$pagina="errorLogin.php";
 $sql = "
UPDATE perfiles set nombre_perfil='$nombre_perfil',estado='$estado' WHERE id_perfil='$id_perfil'
";
            if (mysqli_connect_errno()) {
                 header('Content-type: application/json; charset=utf-8');
                echo json_encode(array(
                    'status' => 'failure',
                    'message' => 'Could Not connect to database',
                ));
            }
            $data = mysqli_query($conn, $sql);