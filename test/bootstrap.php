<?php

chdir(dirname(__FILE__) . '/../../../../../..');
//print getcwd();
$_SERVER['REMOTE_ADDR'] = '127.0.0.1';
require_once './includes/bootstrap.inc';
drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);
require_once './includes/bootstrap.inc';
module_load_include('inc', 'ground_php', 'test/Ground_Test_Fixtures');
module_load_include('inc', 'ground_drupal', 'test/Drupal_Test_Fixtures');
require_once 'sites/all/modules/custom/jesters_quest/test/Jester_Test_Fixtures.inc';