<?php
// Newcomer's form handler — sends each submission to the church inbox.
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(["success" => false, "message" => "Method not allowed"]);
  exit;
}

$RECIPIENTS = ["rccgrpc@gmail.com"];

$input = file_get_contents("php://input");
$data = json_decode($input, true);
if (!is_array($data)) {
  parse_str($input, $data);
}
if (!is_array($data)) {
  http_response_code(400);
  echo json_encode(["success" => false, "message" => "Invalid request"]);
  exit;
}

// Spam trap: real people never fill this hidden field.
if (!empty($data['website'])) {
  echo json_encode(["success" => true]);
  exit;
}

function clean($v, $max = 500) {
  $v = is_string($v) ? trim($v) : '';
  $v = mb_substr($v, 0, $max);
  return htmlspecialchars($v, ENT_QUOTES, 'UTF-8');
}

$name   = clean($data['name'] ?? '', 120);
$emailRaw = trim((string)($data['email'] ?? ''));
$phone  = clean($data['phone'] ?? '', 40);
$heard  = clean($data['heardFrom'] ?? '', 60);
$heardOther = clean($data['heardFromOther'] ?? '', 200);
$prayer = clean($data['prayerRequest'] ?? '', 3000);
$helpOther = clean($data['helpOther'] ?? '', 1000);

$allowedHeard = ["A friend", "A family member", "Social Media", "Other"];
$allowedHelp = [
  "I'm new to the church",
  "I'm new to Calgary",
  "I'd like to speak to a Pastor",
  "I need Prayer",
  "I'd like to know more about being a Christian",
  "Other",
];

if (!$name || !$emailRaw || !$phone) {
  http_response_code(400);
  echo json_encode(["success" => false, "message" => "Name, email and phone number are required"]);
  exit;
}
if (!filter_var($emailRaw, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(["success" => false, "message" => "Please enter a valid email address"]);
  exit;
}
$email = htmlspecialchars($emailRaw, ENT_QUOTES, 'UTF-8');

if ($heard && !in_array(html_entity_decode($heard, ENT_QUOTES, 'UTF-8'), $allowedHeard, true)) {
  $heard = '';
}
$help = [];
if (isset($data['help']) && is_array($data['help'])) {
  foreach ($data['help'] as $h) {
    if (is_string($h) && in_array($h, $allowedHelp, true)) {
      $help[] = htmlspecialchars($h, ENT_QUOTES, 'UTF-8');
    }
  }
}

$heardText = $heard ?: '—';
if ($heard === 'Other' && $heardOther) $heardText = "Other: {$heardOther}";

$helpHTML = '—';
if ($help) {
  $items = '';
  foreach ($help as $h) {
    $label = ($h === 'Other' && $helpOther) ? "Other: {$helpOther}" : $h;
    $items .= "<li style='margin:2px 0;'>{$label}</li>";
  }
  $helpHTML = "<ul style='margin:0;padding-left:18px;'>{$items}</ul>";
}
$prayerHTML = $prayer ? nl2br($prayer) : '—';

function row($label, $value) {
  return "
    <div style='margin-bottom:18px;'>
      <span style='display:block;font-weight:600;font-size:13px;color:#777;margin-bottom:5px;text-transform:uppercase;letter-spacing:0.5px;'>{$label}</span>
      <div style='font-size:15px;color:#111;background:#f5fbf2;padding:10px 14px;border-radius:6px;border-left:4px solid #41B51E;'>{$value}</div>
    </div>";
}

$body = "
<html><head><meta charset='UTF-8'></head>
<body style='background:#f7f8fa;font-family:Segoe UI,Arial,sans-serif;margin:0;padding:32px 0;color:#333;'>
  <div style='max-width:600px;background:#fff;margin:auto;border-radius:10px;box-shadow:0 6px 20px rgba(0,0,0,0.08);overflow:hidden;'>
    <div style='background:linear-gradient(74deg,#00AFEF,#41B51E);color:#fff;text-align:center;padding:22px 20px;'>
      <h1 style='font-size:21px;margin:0;color:#fff;'>New Newcomer's Form Submission</h1>
    </div>
    <div style='padding:28px 24px;'>
      " . row('Name', $name) . "
      " . row('Email', "<a href='mailto:{$email}'>{$email}</a>") . "
      " . row('Phone', "<a href='tel:{$phone}'>{$phone}</a>") . "
      " . row('How did you hear about us?', $heardText) . "
      " . row('How can we help?', $helpHTML) . "
      " . row('Prayer request', $prayerHTML) . "
    </div>
    <div style='text-align:center;font-size:12px;color:#aaa;padding:12px 0 18px;'>
      Sent from the newcomer's form on rccgrpc.ca — reply to this email to respond to {$name}.
    </div>
  </div>
</body></html>";

$plainName = preg_replace('/[\r\n]+/', ' ', html_entity_decode($name, ENT_QUOTES, 'UTF-8'));
$subject = "=?UTF-8?B?" . base64_encode("New Newcomer: {$plainName}") . "?=";

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: RPC Website <no-reply@rccgrpc.ca>\r\n";
$headers .= "Reply-To: {$emailRaw}\r\n";

$ok = true;
foreach ($RECIPIENTS as $to) {
  if (!mail($to, $subject, $body, $headers)) {
    $ok = false;
  }
}

if ($ok) {
  echo json_encode(["success" => true, "message" => "Thank you! Your details have been sent."]);
} else {
  http_response_code(500);
  echo json_encode(["success" => false, "message" => "We couldn't send your form right now. Please try again later."]);
}
