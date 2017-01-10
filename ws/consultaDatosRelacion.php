<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once '../datos/coneccion.php';

$conn = mysqli_connect(NOMBRE_HOST, USUARIO, CONTRASENA, BASE_DE_DATOS);

 $sql = "
SELECT perf.id_perfil,perf.nombre_perfil,perf.estado,men.id_menu,men.descripcion_menu,men.estado as menuEstado,men.Padre,men.url,
rel.id_relacion,rel.id_menu as idMenuRelacion,rel.id_perfil as idPefilRelacion from perfiles as perf,menus as men,relacion as rel where perf.id_perfil=rel.id_perfil and men.id_menu=rel.id_menu
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
                    $outp .= '{"id_perfil":"'  .  $row['id_perfil'] . '",';
                    $outp .= '"nombre_perfil":"'.  $row['nombre_perfil'].'",';
                    $outp .= '"estado":"'   .  $row['estado']. '",';
                    $outp .= '"id_menu":"'   .  $row['id_menu']. '",';
                    $outp .= '"descripcion_menu":"'   .  $row['descripcion_menu']. '",';
                    $outp .= '"menuEstado":"'   .  $row['menuEstado']. '",';
                    $outp .= '"Padre":"'   .  $row['Padre']. '",';
                    $outp .= '"url":"'   .  $row['url']. '",';
                    $outp .= '"id_relacion":"'   .  $row['id_relacion']. '",';
                    $outp .= '"idMenuRelacion":"'   .  $row['idMenuRelacion']. '",';
                    $outp .= '"idPefilRelacion":"'   .  $row['idPefilRelacion']. '"}';
                }
                $outp ='{"CONSULTADATOSREALCION":['.$outp.']}';
                $conn->close();
               echo($outp);
            }
?>