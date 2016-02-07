// Models
window.Operation = Backbone.Model.extend({
    defaults:{
        "operation_id":null,
        "transaction_id":"",
        "coupon_id":"",
        "coupon_code":"",
        "transaction_type":"",
        "comment":"",
        "date":(new Date().toISOString()),
        "amount":0,
        "sum":0,
        "currency":0,
        "status":0,
        "user_balance":0,
        "user_id":0
    },
    idAttribute: "operation_id"
});
 
window.OperationList = Backbone.Collection.extend({
    model:Operation,
    initialize:function(options){
    	this.options = options || {};
    },
    url: function(){
    	url = "https://livedemo.xsolla.com/fe/test-task/isaev/users/" + this.options.user_id+
               "/transactions?datetime_from="+this.options.datetime_from+
               "&datetime_to="+this.options.datetime_to;
        return url;
    }
});