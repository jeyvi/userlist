// Views
window.UserListView = Backbone.View.extend({
 
    tagName:'table',
 
    initialize:function () {
        this.model.bind("reset", this.render, this);

        var self = this;
        this.model.bind("add", function (user) {
            $(self.el).append(new UserListItemView({model:user}).render().el).addClass('mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp');
        });
    },
 
    render:function (eventName) {
        $(this.el).append(tpl.get('thead'));
        _.each(this.model.models, function (user) {
            $(this.el).append(new UserListItemView({model:user}).render().el).addClass('mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp');
        }, this);
        return this;
    }
 
});

window.UserListItemView = Backbone.View.extend({
 
    tagName:"tr",
 
    initialize:function () {
        this.template = _.template(tpl.get('item'));

        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },
 
    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },
 
    close:function () {
        $(this.el).unbind();
        $(this.el).remove();
    }
 
});
 
window.UserView = Backbone.View.extend({
 
    initialize:function () {
        this.template = _.template(tpl.get('details'));
        this.model.bind("change", this.render, this);        
    },

    events: {
        "click #edit": "operations",
        "click #cancel": "return"
    },

    operations:function () {
        $('.two-side-card').addClass('actions');    
    },

    return:function () {
        $('.two-side-card').removeClass('actions');    
    },
 
    render:function (eventName) {
        $('.two-side-card').removeClass('active');
        $(this.el).html(this.template(this.model.toJSON()));
        $(this.el).find('#money').html(this.model.toJSON().balance?'attach_money':'money_off');
        var $date = $(this.el).find('#date-time input');
        $date.val(this.model.toJSON().register_date.replace('+00:00',''));
        
        setTimeout(function(){$('.two-side-card').addClass('active')}, 300);

        return this;
    }

 
});
