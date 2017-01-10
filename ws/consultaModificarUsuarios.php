<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once '../datos/coneccion.php';
$conn = mysqli_connect(NOMBRE_HOST, USUARIO, CONTRASENA, BASE_DE_DATOS);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$id_usuario=$request->id_usuario;
@$nombre_usuario=$request->nombre_usuario;
@$usuario=$request->usuario;
@$contrasena = $request->contrasena;
@$estado = $request->estado;
@$id_perfil = $request->id_perfil;
$pagina="errorLogin.php";
 $sql = "
UPDATE  usuarios set nombre_usuario='$nombre_usuario', usuario='$usuario',contrasena='$contrasena',estado='$estado',id_perfil='$id_perfil' where id_usuario='$id_usuario'

";
            if (mysqli_connect_errno()) {
                 header('Content-type: application/json; charset=utf-8');
                echo json_encode(array(
                    'status' => 'failure',
                    'message' => 'Could Not connect to database',
                ));
            }
            $data = mysqli_query($conn, $sql);