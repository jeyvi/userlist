var ApplicationRouter = Backbone.Router.extend({
	routes: {
		"": "list",
        "new":"addUser",
    	"user/:id":"userDetails",
        "balance/:id":"changeBalance"
	},
	initialize: function() {
		this.headerView = new HeaderView();
		this.headerView.render();
        $(".button-collapse").sideNav();
	},
 
    list:function () {
        this.userList = new UserList();
        
        this.userList.fetch({success: function() {
            $('#sidebar').html(new UserListView({model:app.userList}).render().el);
        }});
        
    },
 
    operationList:function (id) {
        this.operationList = new OperationList({user_id:id, datetime_from:'2015-01-01T00:00:00 UTC', datetime_to:'2017-01-01T00:00:00 UTC'});
  
        this.operationList.fetch({success: function() {
               $('#actions').html(new OperationListView({model:app.operationList}).render().el);
        }});
    },

    addUser:function (id) {
        this.checkClass(function(){
            this.userView = new UserView({model:new User});
            $('#content').html(this.userView.render().el);
            $('#editmode').show();  
        });
    },

    changeBalance:function (id) {
    },    
 
    userDetails:function (id) {
    	this.checkClass(function(){
	        app.user = app.userList.get(id);
	        app.userView = new UserView({model:app.user});
	        $('#content').html(app.userView.render().el);
            $('.modal-trigger').leanModal();
    	});
    },

    checkClass: function(callback) {
        if (this.userList) {
            if (callback) callback();
        } else {
            this.userList = new UserList();
       		this.userList.fetch({success: function() {
               $('#sidebar').html( new UserListView({model: app.userList}).render().el );
               if (callback) callback();
            }});
        }
    }
});


tpl.loadTemplates(['header', 'details', 'item', 'thead', 'item_op', 'thead_op', 'balance'], function() {
	window.app = new ApplicationRouter();
	Backbone.history.start();
});


