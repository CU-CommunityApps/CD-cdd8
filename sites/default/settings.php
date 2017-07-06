<?php

/**
 * Load services definition file.
 */
$settings['container_yamls'][] = __DIR__ . '/services.yml';

/**
 * Include the Pantheon-specific settings file.
 *
 * n.b. The settings.pantheon.php file makes some changes
 *      that affect all envrionments that this site
 *      exists in.  Always include this file, even in
 *      a local development environment, to insure that
 *      the site settings remain consistent.
 */
include __DIR__ . "/settings.pantheon.php";

/**
 * If there is a local settings file, then include it
 */
$local_settings = __DIR__ . "/settings.local.php";
if (file_exists($local_settings)) {
  include $local_settings;
}
$settings['install_profile'] = 'minimal';

if (defined('PANTHEON_ENVIRONMENT')){
  # Provide universal absolute path to the installation.
  $ps = json_decode($_SERVER['PRESSFLOW_SETTINGS'], TRUE);
  $settings['simplesamlphp_dir'] = $_ENV['HOME'] .'/code/private/simplesamlphp-1.14.2';
}
$databases['default']['default'] = array (
  'database' => 'doggo',
  'username' => 'doggo',
  'password' => 'pass',
  'prefix' => '',
  'host' => 'localhost',
  'port' => '3306',
  'namespace' => 'Drupal\\Core\\Database\\Driver\\mysql',
  'driver' => 'mysql',
);
$settings['hash_salt'] = '-j_G7VHqFaYzgOPi2aoncBom9UuJ6iWT2wv_qdSF3OW1bjygOOCjtlBelkVzkipmx5_SNKF56w';
