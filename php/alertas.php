<?php
// Define el encabezado para que el navegador sepa que es un objeto JSON y no texto plano/HTML
header('Content-Type: application/json');

// Array que actúa como base de datos local con los mensajes que emitirá la radio
$posiblesAlertas = [
    "ALERTA: Juan mato ha matado a su suegra (no estaba infectada).",
    "INFO: Se ha despejado el sector 3 de zombies.",
    "ALERTA: Gato infectado persigue laser rojo por las calles de La Habana.",
    "ALERTA: Horda de michis bloquea el callejón de la calle principal.",
    "INFO: Nuevo refugio seguro abierto en el centro de la ciudad.",
];

// Array aleatorio que escoge entre alertas
$mensaje = $posiblesAlertas[array_rand($posiblesAlertas)];
$timestamp = date("H:i");

// Convierte un array asociativo de PHP en un string con formato JSON
echo json_encode([
    "status" => "success",
    "alerta" => "$mensaje"
]);
