<?php

class Quest_Test extends Jester_Test_Fixtures {

  function setUp() {
    $this->fixture_load_ground();
    $this->prepare_database();
    $this->populate_database();
  }

//  function test_quest_types() {
//    $objects = $this->ground->create_query('quest_type')->run();
//    $this->assertTrue(count($objects) > 0);
//    $this->assertEquals('kingdom', $objects[0]->name);
//  }

  function test_quests() {
    $objects = $this->ground->create_query('quest')->run();
    print_r($objects);
    $this->assertTrue(count($objects) > 0);
    $this->assertEquals('MarlothDB', $objects[0]->name);
    $this->assertInstanceOf('stdClass', $objects[0]->quest_type);
    $this->assertEquals('kingdom', $objects[0]->quest_type->name);
  }

}
