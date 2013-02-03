MetaHub.import_all(); 
Bloom.import_all();
Vineyard.import_all();

var Garden = {
  blocks: {
    'blocks': [ 'blocks' ]
  },
  initialize: function() {
    Bloom.output = Garden.print;
    var request = Bloom.get_url_properties();
    if (request.book) {
      Garden.book = request.book;
    }
    
    Bloom.get('model.json', function(response) {
      Garden.vineyard = Vineyard.create(response.middle_model.trellises, response.bloom_model.trellises);
      Garden.vineyard.update_url = '/jester/jest/update';
      Garden.vineyard.get_url = '/jester/jest/get';
      Quest_List.create($('.quest-list'));      
    
      Garden.content_panel = Content_Panel.create($('.editor .content'));
      if (request.trellis) {
        if (request.action == 'create') {
          Garden.content_panel.load_create(Garden.vineyard.trellises[request.trellis]);
        }
        else if (request.id) {
          Garden.goto_item(request.trellis, request.id);
        }
        else {
          Garden.content_panel.load_index(request.trellis);
        }
      }
    }); 
  },
  initialize_query: function(query) {
    if (Garden.book) {
      return query + '&book=' + Garden.book;
    }
    
    return query;
  },
  goto_item: function(trellis_name, id) {
    var query = Garden.initialize_query('/marlothdb/ground/get?trellis=' + trellis_name + '&id=' + id);
    Bloom.get(query, function(response) {
      var item = Garden.vineyard.trellises[trellis_name].create_seed(response.objects[0]);
      Garden.load_edit(item);
    });
  },
  load_index: function(name) {
    Garden.content_panel.load_index(name);
  },
  load_edit: function(item) {
    Garden.content_panel.load_edit(item);
  },
  print: function(response) {
    if (!response.message)
      return;
    
    var container = $('.messages');
    if (!container.length) {
      container = $('<div class="messages status"/>');
      $('.breadcrumb').after(container);
    }
    else {
      container.empty();
    }
    
    container.append($('<div>' + response.message + '</div>'));
  }
}

Bloom.landscape(Garden);

var Class_Item = Flower.sub_class('Class_Item', {
  initialize: function() {
    this.element = $('<a href="?trellis=' + this.seed.name + '"/>');
    this.element.text(this.seed.name);
  //    this.click(function() {
  //      Garden.content_panel.load_index(this.seed.name);
  //    });
  }
});

var Quest_List = Flower.sub_class('Class_Item', {
  initialize: function() {
    this.element = $('<a href="?trellis=' + this.seed.name + '"/>');
    this.element.text(this.seed.name);
  //    this.click(function() {
  //      Garden.content_panel.load_index(this.seed.name);
  //    });
  },
set_seed: function(seed) {
this.seed = seed;
this.element.empty();
for(var x = 0; x < seed.length; ++x) {
  var element = $('<a href="?trellis=' + seed[x].name + '"/>');
element.text(seed[x].name);
this.element.append(element);
}
});

var Class_List = List.sub_class('Class_List', {
  item_type: Class_Item,
  initialize: function() {
  }
});

var Index_Item = Flower.sub_class('Index_Item', {
  initialize: function() {
    this.element = $('<div><a href="">' + this.seed.name + '</a></div>');
    this.element.find('a').attr('href', '?trellis=' + this.seed.trellis.name + '&id=' + this.seed.id);
  }
});

var Child_Item = Index_Item.sub_class('Child_Item', {
  initialize: function() {
    var self = this;
    this.element.append('<a class="delete" href="">X</a>');
    this.element.find('a.delete').click(function(e) {
      e.preventDefault();
      self.seed.disconnect_all();
      self.disconnect_all();
    });
  }
});

var Index_List = List.sub_class('Index_List', {
  item_type: Index_Item
});

var Children_List = List.sub_class('Children_List', {
  block: 'list',
  item_type: Child_Item
});

List_Vine.properties.list_type = Children_List;

var Edit_Flower = Vineyard.Arbor.sub_class('Edit_Flower', {
  block: 'edit-form',
  initialize: function() {
    var self = this;
    this.element.find('input[type=submit], button[type=submit]').click(function(e) {
      self.seed.plant();
    });
  }
});

var Content_Panel = Flower.sub_class('Content_Panel', {
  load_index: function(name) {
    this.element.empty();
    var seed = Seed_List.create(Garden.vineyard.trellises[name]);
    seed.query = function() {
      return Garden.initialize_query('/marlothdb/ground/get?trellis=' + name);
    };
    var list = Index_List.create(seed);
    this.append(list);
    seed.update();
    var query = Garden.initialize_query('?action=create&trellis=' + name);
    var create = $('<div class="create"><a href="'+ query + '">Create</a></div>');
    this.element.prepend(create);
  },
  load_create: function(trellis) {
    this.element.empty();

    var item = trellis.create_seed({});
    
    var edit = Edit_Flower.create({
      seed: item,
      trellis: item.trellis
    });
    this.append(edit);
  //    edit.update();
  },
  load_edit: function(item) {
    this.element.empty();
    if (!item.trellis)
      throw new Error('item.trellis = null!');
    
    var edit = Edit_Flower.create({
      seed: item,
      trellis: item.trellis
    });
    this.append(edit);
  //    edit.update();
  }
});
