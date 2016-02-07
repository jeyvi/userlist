// Views
window.OperationListView = Backbone.View.extend({
 
    tagName:'table',
 
    initialize:function () {
        this.model.bind("reset", this.render, this);

        var self = this;
        this.model.bind("add", function (operation) {
            $(self.el).append(new OperationListItemView({model:operation}).render().el).addClass('responsive-table');
        });
    },
 
    render:function (eventName) {
        $(this.el).append(tpl.get('thead_op'));
        _.each(this.model.models, function (operation) {
            $(this.el).append(new OperationListItemView({model:operation}).render().el).addClass('responsive-table');
        }, this);
        return this;
    }
 
});

window.OperationListItemView = Backbone.View.extend({
 
    tagName:"tr",
 
    initialize:function () {
        this.template = _.template(tpl.get('item_op'));

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