<?php
// Start the session
session_start();
?>
<!DOCTYPE html>
<html>
<body>

<?php
// Set session variables
include 'coneccion.php';
$consulta= mysql_query("SELECT id_imagen,direccion,estado,id_usuario FROM imagenes" );
$row = mysql_fetch_array($consulta);
$_SESSION['id_usuario']= $file['id_usuario'];
?>

</body>
</html>