
 
window.BalanceView = Backbone.View.extend({

     tagName: "div", 
 
    initialize:function () {
        this.template = _.template(tpl.get('balance'))
        this.model.bind("change", this.render, this); 
    },

    events: {
        "change input": "change",
        "click .saveBalance": "saveBalance"
    },

    change: function(event) {
        var target = event.target;
        this.val = target.value;
        console.log('changing ' + target.id + ' from: ' + target.defaultValue + ' to: ' + target.value);
     },
 
    render:function (eventName) {
        var json = this.model.toJSON();
        $(this.el).html(this.template(json));
        if (json.amount && json.amount!=this.val) {
            $('#coins').val(json.amount);
            $('#'+json.user_id+'_amount').html(json.amount);
            $('#money').html('attach_money');
        }

        return this;
    },

    saveBalance: function() {
        this.model.set({
            amount: $('#amount').val(),
            comment: $('#comment').val()
        });

        this.model.save();

        return false;
    }

 
});
