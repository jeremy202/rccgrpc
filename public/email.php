<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (!$data) {
  parse_str($input, $data);
}

if (!$data) {
  http_response_code(400);
  echo json_encode(["success" => false, "message" => "Invalid request"]);
  exit;
}

$name = htmlspecialchars(trim($data['name'] ?? ''));
$phone = htmlspecialchars(trim($data['phone'] ?? ''));
$rideTime = htmlspecialchars(trim($data['rideTime'] ?? ''));
$address = htmlspecialchars(trim($data['address'] ?? ''));
$passengerInfo = htmlspecialchars(trim($data['passengerInfo'] ?? ''));

if (!$name || !$phone || !$rideTime || !$address || !$passengerInfo) {
  http_response_code(400);
  echo json_encode(["success" => false, "message" => "All fields are required"]);
  exit;
}

$adminEmailList = [
  "transport@rccgrpc.ca",
];

// Message to Admin
$messageToAdmin = "
<html>
<head><style>
  body { font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px; }
  .container { max-width: 600px; background: #fff; padding: 20px; border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin: auto; }
  .header { font-size: 20px; font-weight: bold; color: #6630A8; margin-bottom: 20px; }
  .section { margin-bottom: 12px; }
  .label { font-weight: bold; color: #555; }
  .value { color: #222; }
</style></head>
<body>
  <div class='container'>
    <div class='header'>New Ride Request</div>
    <div class='section'><div class='label'>Full Name:</div><div class='value'>{$name}</div></div>
    <div class='section'><div class='label'>Phone:</div><div class='value'>{$phone}</div></div>
    <div class='section'><div class='label'>Ride Time:</div><div class='value'>{$rideTime}</div></div>
    <div class='section'><div class='label'>Address:</div><div class='value'>{$address}</div></div>
    <div class='section'><div class='label'>Passenger Info:</div><div class='value'>{$passengerInfo}</div></div>
  </div>
</body>
</html>
";

$headersToAdmin  = "MIME-Version: 1.0\r\n";
$headersToAdmin .= "Content-type: text/html; charset=UTF-8\r\n";
$headersToAdmin .= "From: Ride Request <no-reply@transport@rccgrpc.ca>\r\n";

$mailSuccess = true;
foreach ($adminEmailList as $adminEmail) {
  $sent = mail($adminEmail, "🚗 New Ride Request from $name", $messageToAdmin, $headersToAdmin);
  if (!$sent) {
    $mailSuccess = false;
    break;
  }
}

if ($mailSuccess) {
  echo json_encode(["success" => true, "message" => "Ride request submitted successfully"]);
} else {
  http_response_code(500);
  echo json_encode(["success" => false, "message" => "Failed to send email"]);
}
