<?php
header('Content-Type: application/json');

$directorio_fisico = "../img/img_subidas/"; // Para que PHP guarde el archivo
$directorio_web = "img/img_subidas/";     // Para que el Navegador encuentre la foto

if (!file_exists($directorio_fisico)) {
    mkdir($directorio_fisico, 0777, true);
}

$nombre_archivo = basename($_FILES["foto"]["name"]);
$ruta_destino = $directorio_fisico . $nombre_archivo;

if (move_uploaded_file($_FILES["foto"]["tmp_name"], $ruta_destino)) {
    // IMPORTANTE: Devolvemos la ruta que el HTML entiende (sin los ..)
    echo json_encode([
        "status" => "success", 
        "url" => $directorio_web . $nombre_archivo 
    ]);
} else {
    echo json_encode(["status" => "error"]);
}
?>