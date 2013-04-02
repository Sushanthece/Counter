(function()
{

    var _create_fn = function(){};
    var create = function(parent){

        _create_fn.prototype = parent;
        var instance = new _create_fn();
        return instance;
    };

    var global = (function(){return this;})();

    var counter = {};           // Prototype object for Counter.

    var Counter = function(){

        var instance = create(counter);
        instance.__init__.apply(instance, arguments);
        return instance;
    };

    counter.__init__ = function(name){

        this.name = name;
        this.count = 0;
    };

    counter.onclick = function(event){

        this.count ++;
    };

    counter.html = function(parent_id){

        return this.name + ' ' + this.count;
    };

    global.onload = function(){

        var models = [
            Counter('apple'),
            Counter('banana'),
            Counter('cherry'),
            Counter('date')
        ];

        var element = document.getElementById('example');

        element.innerHTML = (
            '<span id="a0">apple 0</span>'
            + '<span id="a1">banana 0</span>'
            + '<span id="a2">cherry 0</span>'
            + '<span id="a3">date 0</span>'
        );

        element.onclick = onclick_factory(models);
        element = undefined;    // Avoid IE memory leak.
    };

    var onclick_factory = function(models){

        var onclick = function(event){

	    event = event || global.event; // For IE event handling.
	    var target = event.target || event.srcElement;
            var id = target.id;
            if (id) {
                var id_num = +id.slice(1);
                var model = models[id_num];
                model.onclick();
                var html = model.html(id);
                if (html){
                    document.getElementById(id).innerHTML = html;
                }
            }
        };
        return onclick;
    };

})();





