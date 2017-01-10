<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once '../datos/coneccion.php';

$conn = mysqli_connect(NOMBRE_HOST, USUARIO, CONTRASENA, BASE_DE_DATOS);

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$id_usuario = $request->id_usuario;

$pagina="errorLogin.php";
 $sql = "
SELECT id_imagen,direccion,estado,id_usuario FROM imagenes  WHERE id_usuario='$id_usuario' AND  estado='1'
";
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
                    $outp .= '{"id_imagen":"'  .  $row['id_imagen'] . '",';
                    $outp .= '"direccion":"'   .  $row['direccion']. '",';
                    $outp .= '"estado":"'   .  $row['estado']. '",';
                    $outp .= '"id_usuario":"'   .  $row['id_usuario']. '"}';
                }
                $outp ='{"GRAFICOS":['.$outp.']}';
                $conn->close();
               echo($outp);
            }
?>