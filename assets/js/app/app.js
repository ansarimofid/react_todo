const TodoForm =  ({addTodo}) =>{
    let input;
    return (
        <form onSubmit={(e)=>{
            e.preventDefault();
            addTodo(input.value);
            input.value='';
        }}>
            <input
                ref={node=>{
                    input = node;
                }}/>
        </form>
    );
};

const Todo =({todo,remove}) =>{
    return (<li onClick={()=>remove(todo.id)}>{todo.text}</li>);
};

const TodoList = ({todos,remove}) => {
    const todoNode = todos.map((todo)=>{
        return (<Todo todo={todo} key={todo.id} remove={remove}/>)
    });

    return (<ul>{todoNode}</ul>);
};

const Title = ({todoCount})=>{
    return (<div>
        <div>
            <h1>To-do ({todoCount})</h1>
        </div>
    </div>);
};
window.id = 0;

class TodoApp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        };

        this.apiUrl = 'https://57b1924b46b57d1100a3c3f8.mockapi.io/api/todos';
    }

    componentDidMount(){
        axios.get(this.apiUrl)
            .then((res)=>{
                console.log(res);
                this.setState({data:res.data});
            });
    }

    addTodo(val){
        const todo = {text:val};

        axios.post(this.apiUrl,todo)
            .then((res)=>{
                this.state.data.push(res.data);
                this.setState({data:this.state.data});
            });
        // this.state.data.push(todo);

        // this.setState({data:this.state.data});
    }

    handleRemove(id){
        const remainder = this.state.data.filter((todo)=>{
            if(todo.id!=id) return todo.id;
        });


        axiom.delete(this.apiUrl+'/'+id)
            .then((res)=>{
                this.setState({data:remainder});
            })
    }

    render(){
        return(
            <div>
                <Title todoCount={this.state.data.length}/>
                <TodoForm
                    addTodo={this.addTodo.bind(this)}
                />
                <TodoList
                    todos={this.state.data}
                    remove ={this.handleRemove.bind(this)}
                />
            </div>
        )
    }
}

ReactDOM.render(<TodoApp/>,document.getElementById('app-container'));