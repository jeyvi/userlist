var ApplicationRouter = Backbone.Router.extend({
	routes: {
		"": "list",
    	"user/:id":"userDetails",
        "operation/:id":"operationList"
	},
	initialize: function() {
		this.headerView = new HeaderView();
		this.headerView.render();
	},
 
    list:function () {
        this.userList = new UserList();
        
        this.userList.fetch({success: function() {
            $('#sidebar').html(new UserListView({model:app.userList}).render().el);
        }});

        $('.two-side-card').removeClass('actions').removeClass('active');
        
    },
 
    operationList:function (id) {
        this.operationList = new OperationList({user_id:id, datetime_from:'2015-01-01T00:00:00 UTC', datetime_to:'2017-01-01T00:00:00 UTC'});
        this.operationListView = new OperationListView({model:this.operationList});
        console.log(this.operationList);
        this.operationList.fetch({success: function() {
               console.log(this);
            }});
        $('.two-side-card').addClass('actions');
        $('#actions').html(this.operationListView.render().el);
    },
 
    userDetails:function (id) {
    	this.checkClass(function(){
	        this.user = app.userList.get(id);
	        console.log(app.userList);
	        this.userView = new UserView({model:this.user});
            $('.two-side-card').removeClass('actions');
	        $('#content').html(this.userView.render().el);
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


tpl.loadTemplates(['header', 'details', 'item', 'thead', 'item_op', 'thead_op', 'actions'], function() {
	app = new ApplicationRouter();
	Backbone.history.start();
});


