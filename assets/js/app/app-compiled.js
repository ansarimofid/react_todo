'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TodoForm = function TodoForm(_ref) {
    var addTodo = _ref.addTodo;

    var input = void 0;
    return React.createElement(
        'form',
        { onSubmit: function onSubmit(e) {
                e.preventDefault();
                addTodo(input.value);
                input.value = '';
            } },
        React.createElement('input', {
            ref: function ref(node) {
                input = node;
            } })
    );
};

var Todo = function Todo(_ref2) {
    var todo = _ref2.todo;
    var remove = _ref2.remove;

    return React.createElement(
        'li',
        { onClick: function onClick() {
                return remove(todo.id);
            } },
        todo.text
    );
};

var TodoList = function TodoList(_ref3) {
    var todos = _ref3.todos;
    var remove = _ref3.remove;

    var todoNode = todos.map(function (todo) {
        return React.createElement(Todo, { todo: todo, key: todo.id, remove: remove });
    });

    return React.createElement(
        'ul',
        null,
        todoNode
    );
};

var Title = function Title(_ref4) {
    var todoCount = _ref4.todoCount;

    return React.createElement(
        'div',
        null,
        React.createElement(
            'div',
            null,
            React.createElement(
                'h1',
                null,
                'To-do (',
                todoCount,
                ')'
            )
        )
    );
};
window.id = 0;

var TodoApp = function (_React$Component) {
    _inherits(TodoApp, _React$Component);

    function TodoApp(props) {
        _classCallCheck(this, TodoApp);

        var _this = _possibleConstructorReturn(this, (TodoApp.__proto__ || Object.getPrototypeOf(TodoApp)).call(this, props));

        _this.state = {
            data: []
        };

        _this.apiUrl = 'https://57b1924b46b57d1100a3c3f8.mockapi.io/api/todos';
        return _this;
    }

    _createClass(TodoApp, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            axios.get(this.apiUrl).then(function (res) {
                console.log(res);
                _this2.setState({ data: res.data });
            });
        }
    }, {
        key: 'addTodo',
        value: function addTodo(val) {
            var _this3 = this;

            var todo = { text: val };

            axios.post(this.apiUrl, todo).then(function (res) {
                _this3.state.data.push(res.data);
                _this3.setState({ data: _this3.state.data });
            });
            // this.state.data.push(todo);

            // this.setState({data:this.state.data});
        }
    }, {
        key: 'handleRemove',
        value: function handleRemove(id) {
            var _this4 = this;

            var remainder = this.state.data.filter(function (todo) {
                if (todo.id != id) return todo.id;
            });

            axiom.delete(this.apiUrl + '/' + id).then(function (res) {
                _this4.setState({ data: remainder });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(Title, { todoCount: this.state.data.length }),
                React.createElement(TodoForm, {
                    addTodo: this.addTodo.bind(this)
                }),
                React.createElement(TodoList, {
                    todos: this.state.data,
                    remove: this.handleRemove.bind(this)
                })
            );
        }
    }]);

    return TodoApp;
}(React.Component);

ReactDOM.render(React.createElement(TodoApp, null), document.getElementById('app-container'));

//# sourceMappingURL=app-compiled.js.map