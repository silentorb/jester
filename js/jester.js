MetaHub.import_all(); 
Bloom.import_all();
Vineyard.import_all();

var Jester = Garden.grow('Jester', {
  app_path: 'jest',
  blocks: {
    'blocks': [ 'blocks' ]
  },
  initialize: function() {
    this.listen(this, 'initialize', function() {
      this.quests = Quest_List.create($('.quest-list'));      
    });
    
    this.listen(this, 'other', function() {
      var self = this;
      var query = this.initialize_query('jest/get_root_quests');
      Bloom.get(query, function(response) {
        self.quests.set_seed(response.objects);
      });
    });
    
    this.listen(this, 'edit', function(item) {
      if (item.trellis.name = 'quest') {
        var sidebar = $('.editor .right-sidebar');
        var create_link = sidebar.find('a.create');
        if (!create_link.length) {
          create_link = $('<a class="create">Create Quest</a>');
          sidebar.prepend(create_link);
        }
       
        create_link.attr('href', '/jester/jest/quest/create?parent=' + item.id);
       
        this.quests.set_seed(item.children);
      }
    });
  },
  grow: function() {
    this.content_panel = Content_Panel.create($('.editor .content'));
    this.content_panel.set_garden(this);
  }
});


//var Class_Item = Flower.sub_class('Class_Item', {
//  initialize: function() {
//    this.element = $('<a href="?trellis=quest&id=' + this.seed.id + '"/>');
//    this.element.text(this.seed.name);
//  //    this.click(function() {
//  //      Garden.content_panel.load_index(this.seed.name);
//  //    });
//  }
//});

var Quest_List = Flower.sub_class('Class_Item', {
  set_seed: function(seed) {
    this.seed = seed;
    this.element.empty();
    for(var x = 0; x < seed.length; ++x) {
      var element = $('<a href="?trellis=quest&id=' + seed[x].id + '"/>');
      element.text(seed[x].name);
      this.element.append(element);
    }
  }
});

//var Class_List = List.sub_class('Class_List', {
//  item_type: Class_Item,
//  initialize: function() {
//  }
//});
