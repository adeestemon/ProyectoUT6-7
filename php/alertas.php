<?php
header('Content-Type: application/json');

// Aquí podrías conectar a una base de datos MySQL. 
// Por ahora, simulamos una respuesta del servidor.
$posiblesAlertas = [
    "ALERTA: Juan mato ha matado a su suegra (no estaba infectada).",
    "INFO: Se ha despejado el sector 3 de zombies.",
    "ALERTA: Gato infectado persigue laser rojo por las calles de La Habana.",
    "ALERTA: Horda de michis bloquea el callejón de la calle principal.",
    "INFO: Nuevo refugio seguro abierto en el centro de la ciudad.",

];

// Seleccionamos una aleatoria
$mensaje = $posiblesAlertas[array_rand($posiblesAlertas)];
$timestamp = date("H:i");

echo json_encode([
    "status" => "success",
    "alerta" => "$mensaje"
]);
?>