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
    idAttribute: "user_id"
});
 
window.UserList = Backbone.Collection.extend({
    model:User,
    url:"https://livedemo.xsolla.com/fe/test-task/isaev/users?offset=0&limit=10",
	parse: function(resp, xhr) {
		return resp.data;
	}
});