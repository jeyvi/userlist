// Models
window.Balance = Backbone.Model.extend({
    defaults:{
        "amount":0,
        "comment":null
    },
    initialize:function(options){
    	this.options = options || {};
    },
    url: function(){
    	url = "https://livedemo.xsolla.com/fe/test-task/isaev/users/" + this.options.user_id+
               "/recharge";
        return url;
    },
    idAttribute: "id"
});