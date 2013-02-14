<?php

class Jester extends Ground_Module {
  function initialize($ground) {
    parent::initialize($ground);
    $ground->add_module('Ground_Drupal');
    $history = $ground->add_module('History');
//    $ground->trellises['history_commit']->add_property('comment');
    $path = drupal_get_path('module', 'jester');
    $ground->load_schema_from_file($path . '/json/jester.json');
    $this->load_types($path . '/json/types-medieval.json');
  }

  function load_types($filename) {
    $types = Ground::load_json_from_file($filename);
    $this->quest_types = $types->quest_types;
    $this->status_types = $types->status_types;
  }

  function populate_database() {
    foreach ($this->quest_types as $type) {
      $this->ground->insert_object('quest_type', array(
          'name' => $type,
      ));
    }

    foreach ($this->status_types as $type) {
      $this->ground->insert_object('status', array(
          'name' => $type,
      ));
    }
  }

}
