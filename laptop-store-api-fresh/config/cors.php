<?php

// Drop this in as config/cors.php in the Laravel backend project
// (replacing the default Laravel ships with) so the React dev
// server (localhost:5173) is allowed to call the API with an
// Authorization header.

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'http://localhost:5173',   // Vite dev server
        'http://127.0.0.1:5173',
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false, // bearer-token auth, no cookies needed
];
