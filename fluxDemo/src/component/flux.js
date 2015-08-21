var Fluxxor = require("fluxxor");

var constants = {
    ADD_TODO: "ADD_TODO",
    TOGGLE_TODO: "TOGGLE_TODO",
    CLEAR_TODOS: "CLEAR_TODOS"
};

var TodoStore = Fluxxor.createStore({
    initialize: function() {
        this.todoId = 0;
        this.todos = {};

        this.bindActions(
            constants.ADD_TODO, this.onAddTodo,
            constants.TOGGLE_TODO, this.onToggleTodo,
            constants.CLEAR_TODOS, this.onClearTodos
        );
    },

    onAddTodo: function(payload) {
        var id = this._nextTodoId();
        var todo = {
            id: id,
            text: payload.text,
            complete: false
        };
        this.todos[id] = todo;
        this.emit("change");
    },

    onToggleTodo: function(payload) {
        var id = payload.id;
        this.todos[id].complete = !this.todos[id].complete;
        this.emit("change");
    },

    onClearTodos: function() {
        var todos = this.todos;

        Object.keys(todos).forEach(function(key) {
            if(todos[key].complete) {
                delete todos[key];
            }
        });

        this.emit("change");
    },

    getState: function() {
        return {
            todos: this.todos
        };
    },

    _nextTodoId: function() {
        return ++this.todoId;
    }
});

//Let's create a few semantic actions to go along with our action types.

var actions = {
    addTodo: function(text) {
        this.dispatch(constants.ADD_TODO, {text: text});
    },

    toggleTodo: function(id) {
        this.dispatch(constants.TOGGLE_TODO, {id: id});
    },

    clearTodos: function() {
        this.dispatch(constants.CLEAR_TODOS);
    }
};

//Now we can instantiate our store and build a Flux instance:

var stores = {
    TodoStore: new TodoStore()
};

var flux = new Fluxxor.Flux(stores, actions);

//Finally, let's use the "dispatch" event to add some logging:

flux.on("dispatch", function(type, payload) {
    if (console && console.log) {
        console.log("[Dispatch]", type, payload);
    }
});

// Adaptando al react-init (exportando el objeto flux)
module.exports = flux;
