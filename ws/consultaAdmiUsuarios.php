<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once '../datos/coneccion.php';

$conn = mysqli_connect(NOMBRE_HOST, USUARIO, CONTRASENA, BASE_DE_DATOS);

 $sql = "
SELECT users.id_usuario,users.nombre_usuario,users.usuario,users.contrasena,users.estado, per.nombre_perfil as perfil FROM usuarios as users, perfiles as per where users.id_perfil=per.id_perfil
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
                    $outp .= '{"id_usuario":"'  .  $row['id_usuario'] . '",';
                    $outp .= '"nombre_usuario":"'.  $row['nombre_usuario'].'",';
                    $outp .= '"usuario":"'   .  $row['usuario']. '",';
                    $outp .= '"contrasena":"'   .  $row['contrasena']. '",';
                    $outp .= '"estado":"'   .  $row['estado']. '",';
                    $outp .= '"perfil":"'   .  $row['perfil']. '"}';
                }
                $outp ='{"CONSULTAADMIUSUARIOS":['.$outp.']}';
                $conn->close();
               echo($outp);
            }
?>

