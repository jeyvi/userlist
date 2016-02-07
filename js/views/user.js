// Views
window.UserListView = Backbone.View.extend({
 
    tagName:'ul',
 
    initialize:function () {
        this.model.bind("reset", this.render, this);

        var self = this;
        this.model.bind("add", function (user) {
            $(self.el).append(new UserListItemView({model:user}).render().el).addClass('collection');
        });
    },
 
    render:function (eventName) {
        _.each(this.model.models, function (user) {
            $(this.el).append(new UserListItemView({model:user}).render().el).addClass('collection');
        }, this);
        return this;
    }
 
});

window.UserListItemView = Backbone.View.extend({
 
    tagName:"li",
 
    initialize:function () {
        this.template = _.template(tpl.get('item'));

        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },
 
    render:function (eventName) {
        $(this.el).addClass('no-padding collection-item').html(this.template(this.model.toJSON()));
        return this;
    },
 
    close:function () {
        $(this.el).unbind();
        $(this.el).remove();
    }
 
});
 
window.UserView = Backbone.View.extend({

     tagName: "div", 
 
    initialize:function () {
        this.template = _.template(tpl.get('details'));
        this.model.bind("change", this.render, this); 
    },

    events: {
        "change input": "change",
        "click .save": "saveUser",
        "click .delete": "deleteUser",
        "click #edit": "operations",
        "click #cancel": "return"
    },

    change: function(event) {
        var target = event.target;
        console.log('changing ' + target.id + ' from: ' + target.defaultValue + ' to: ' + target.value);
     },

    operations:function () {
        $('#editmode').show();    
    },

    return:function () {
        $('#editmode').hide();
    },
 
    render:function (eventName) {
        var json = this.model.toJSON();

        $(this.el).html(this.template(json));
        $(this.el).find('#money').html(json.balance?'attach_money':'money_off');
        var $date = $(this.el).find('#datetime');
        $date.val(json.register_date.replace('+00:00',''));
        $(this.el).find('#enabled')[0].checked = json.enabled;
        if (json.user_id)
        {
            var num = Math.round((json.user_id.replace('user_',''))*1 / 10);
            $(this.el).find(".image-container .circle").attr('src', 'http://lorempixel.com/400/400/people/'+num );
        }
        this.renderOperations();

        this.Balance = new Balance({user_id:json.user_id});
        this.Balance.bind("change", this.renderOperations, this); 

        $('#addcoins').html(new BalanceView({model:this.Balance}).render().el);
        

        return this;
    },

    renderOperations: function(){
        var json = this.model.toJSON();
        this.operationList = new OperationList({user_id:json.user_id, datetime_from:'2015-01-01T00:00:00 UTC', datetime_to:'2017-01-01T00:00:00 UTC'});
        var that = this;
        this.operationList.fetch({success: function() {
            $('#actions').html(new OperationListView({model:that.operationList}).render().el);
        }});
    },

    saveUser: function() {
        this.model.set({
            user_name: $('#user_name').val(),
            user_custom: $('#user_custom').val(),
            email: $('#email').val(),
            enabled: $('#enabled')[0].checked
        });

        if (this.model.isNew()) {
            var self = this;
            app.userList.create(this.model, {
                success: function() {
                    self.model.sync('create', self.model);
                    app.navigate('user/'+self.model.id, false);
                }
            });
        } else {
            this.model.save();
        }

        return false;
    }

 
});
