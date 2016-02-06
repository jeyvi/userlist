HeaderView = Backbone.View.extend({
    el: "#header",
    
    initialize: function() {
        this.template = _.template(tpl.get('header'));
    },

    render: function() {
        $(this.el).html(this.template());
        return this;
    }
});
