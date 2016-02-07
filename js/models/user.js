// Models
window.User = Backbone.Model.extend({
    urlRoot:"https://livedemo.xsolla.com/fe/test-task/isaev/users",
    defaults:{
        "user_id":null,
        "user_name":"",
        "user_custom":"",
        "email":"",
        "register_date":(new Date().toISOString()),
        "balance":0,
        "enabled":false
    },
    sync: function (method, model, options) {
        
        if (method=='create'){ 
            this.idAttribute = "id";
            model.set({'user_id':"user_"+Math.round(Math.random()*100)});
        }
        return Backbone.sync.apply(this, arguments);
    },    
    idAttribute: "user_id"
});
 
window.UserList = Backbone.Collection.extend({
    model:User,
    url:"https://livedemo.xsolla.com/fe/test-task/isaev/users?offset=0&limit=100",
	parse: function(resp, xhr) {
		return resp.data;
	}
});