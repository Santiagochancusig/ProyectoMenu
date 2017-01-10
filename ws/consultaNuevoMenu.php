<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once '../datos/coneccion.php';
$conn = mysqli_connect(NOMBRE_HOST, USUARIO, CONTRASENA, BASE_DE_DATOS);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$descripcion_menu=$request->descripcion_menu;
@$estado=$request->estado;
@$Padre=$request->Padre;
@$url = $request->url;
$pagina="errorLogin.php";
 $sql = "
INSERT INTO menus (descripcion_menu,estado,Padre,url)VALUES  ('$descripcion_menu','$estado','$Padre','$url')
";
            if (mysqli_connect_errno()) {
                 header('Content-type: application/json; charset=utf-8');
                echo json_encode(array(
                    'status' => 'failure',
                    'message' => 'Could Not connect to database',
                ));
            }
            $data = mysqli_query($conn, $sql);