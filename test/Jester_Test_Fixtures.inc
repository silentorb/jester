<?php

class Jester_Test_Fixtures extends Drupal_Test_Fixtures {

  function fixture_load_ground() {
    $this->ground = new Ground('jester_test');
    $this->jester = $this->ground->add_module('Jesters_Quest');
  }

  function populate_database() {
    $this->jester->populate_database();
    $this->insert_object('quest', array(
        'name' => 'MarlothDB',
        'body' => 'Issues for the Marloth Database',
        'quest_type' => 0,
        'status' => 0,
    ));
    $this->insert_object('quest', array(
        'name' => 'Sub Quest',
        'body' => 'Sample Sub Quest for the Marloth Database',
        'quest_type' => 1,
        'status' => 2,
        'parent' => 0,
    ));
  }

}