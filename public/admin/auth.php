<?php
/**
 * GitHub login helper for the website editor (Decap CMS).
 *
 * Secrets are NOT stored in the website code. Create this file on cPanel,
 * one folder ABOVE public_html (e.g. /home/<cpanel-user>/decap-oauth-config.php):
 *
 *   <?php
 *   return [
 *     'client_id'     => 'xxxxxxxxxxxxxxxxxxxx',
 *     'client_secret' => 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
 *   ];
 */

$ALLOWED_ORIGINS = ['https://rccgrpc.ca', 'https://www.rccgrpc.ca'];

function load_config() {
  $candidates = [
    dirname(__DIR__, 2) . '/decap-oauth-config.php', // /home/user/ (outside public_html)
    dirname(__DIR__, 3) . '/decap-oauth-config.php',
  ];
  foreach ($candidates as $file) {
    if (is_readable($file)) {
      $cfg = require $file;
      if (is_array($cfg) && !empty($cfg['client_id']) && !empty($cfg['client_secret'])) return $cfg;
    }
  }
  if (getenv('GITHUB_OAUTH_CLIENT_ID') && getenv('GITHUB_OAUTH_CLIENT_SECRET')) {
    return ['client_id' => getenv('GITHUB_OAUTH_CLIENT_ID'), 'client_secret' => getenv('GITHUB_OAUTH_CLIENT_SECRET')];
  }
  return null;
}

function reply($status, $content) {
  global $ALLOWED_ORIGINS;
  $message = 'authorization:github:' . $status . ':' . json_encode($content);
  header('Content-Type: text/html; charset=utf-8');
  header('Cache-Control: no-store');
  $origins = json_encode($ALLOWED_ORIGINS);
  $msg = json_encode($message);
  echo "<!doctype html><html><body><p>" . ($status === 'success' ? 'Signed in. You can close this window.' : 'Sign-in failed: ' . htmlspecialchars($content['message'] ?? 'unknown error')) . "</p>
<script>
(function () {
  var allowed = {$origins};
  function receive(e) {
    if (allowed.indexOf(e.origin) === -1) return;
    window.opener.postMessage({$msg}, e.origin);
    window.removeEventListener('message', receive, false);
    setTimeout(function () { window.close(); }, 300);
  }
  if (!window.opener) return;
  window.addEventListener('message', receive, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script></body></html>";
  exit;
}

$cfg = load_config();
if (!$cfg) {
  reply('error', ['message' => 'Login is not configured on the server (decap-oauth-config.php missing).']);
}

session_set_cookie_params(['lifetime' => 600, 'path' => '/admin', 'secure' => true, 'httponly' => true, 'samesite' => 'Lax']);
session_start();

$redirectUri = 'https://' . $_SERVER['HTTP_HOST'] . strtok($_SERVER['REQUEST_URI'], '?');

// Step 1: send the editor to GitHub to sign in
if (!isset($_GET['code'])) {
  $state = bin2hex(random_bytes(16));
  $_SESSION['decap_oauth_state'] = $state;
  $scope = (isset($_GET['scope']) && preg_match('/^[a-z:,_ ]+$/i', $_GET['scope'])) ? $_GET['scope'] : 'repo,user';
  $url = 'https://github.com/login/oauth/authorize?' . http_build_query([
    'client_id' => $cfg['client_id'],
    'redirect_uri' => $redirectUri,
    'scope' => $scope,
    'state' => $state,
  ]);
  header('Location: ' . $url);
  exit;
}

// Step 2: GitHub sent the editor back with a code — exchange it for a token
$expected = $_SESSION['decap_oauth_state'] ?? '';
unset($_SESSION['decap_oauth_state']);
if (!$expected || !hash_equals($expected, (string)($_GET['state'] ?? ''))) {
  reply('error', ['message' => 'Sign-in expired or was tampered with. Please try again.']);
}

$post = http_build_query([
  'client_id' => $cfg['client_id'],
  'client_secret' => $cfg['client_secret'],
  'code' => $_GET['code'],
  'redirect_uri' => $redirectUri,
]);

$response = false;
if (function_exists('curl_init')) {
  $ch = curl_init('https://github.com/login/oauth/access_token');
  curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $post,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => ['Accept: application/json', 'User-Agent: rccgrpc-decap-auth'],
    CURLOPT_TIMEOUT => 20,
  ]);
  $response = curl_exec($ch);
  curl_close($ch);
} else {
  $response = @file_get_contents('https://github.com/login/oauth/access_token', false, stream_context_create([
    'http' => [
      'method' => 'POST',
      'header' => "Content-Type: application/x-www-form-urlencoded\r\nAccept: application/json\r\nUser-Agent: rccgrpc-decap-auth\r\n",
      'content' => $post,
      'timeout' => 20,
    ],
  ]));
}

$data = $response ? json_decode($response, true) : null;
if (!is_array($data) || empty($data['access_token'])) {
  $err = is_array($data) ? ($data['error_description'] ?? $data['error'] ?? 'Unknown error') : 'Could not reach GitHub';
  reply('error', ['message' => $err]);
}

reply('success', ['token' => $data['access_token'], 'provider' => 'github']);
