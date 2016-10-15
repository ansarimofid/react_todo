"use strict";

var TodoForm = function TodoForm(_ref) {
    var addTodo = _ref.addTodo;

    var input = void 0;
    return React.createElement("div", null, React.createElement("input", {
        ref: function ref(node) {
            input = node;
        },
        type: "text" }), React.createElement("button", { onClick: function onClick() {
            addTodo(input.value);
            input.value = '';
        } }, "+"));
};

//# sourceMappingURL=app-compiled.js.map

//# sourceMappingURL=app-compiled-compiled.js.map