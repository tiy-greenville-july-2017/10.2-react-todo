import React, { Component } from 'react';


// Smart components are just for managing state
class Todo extends Component{
  constructor(){
    super();
    this.state = {
      todos: [
        {title: 'Test Todo'},
        {title: 'Another Todo'}
      ],
      isEdit: false,
      todoToEdit: null
    };
  }

  addTodo = (todo) => {
    let todos = this.state.todos;
    todos.push(todo);
    this.setState({todos: todos});
  }

  removeTodo = (index) => {
    // e.preventDefault();

    let todos = this.state.todos;
    todos.splice(index, 1);
    this.setState({todos: todos});
  }

  updateTodo = (index, todo) => {
    let todos = this.state.todos;
    todos.splice(index, 1, todo);
    this.setState({todos: todos});

    this.hideEditMode();
  }

  hideEditMode = () => {
    this.setState({isEdit: false, todoToEdit: null});
  }

  showEditMode = (todoIndex) => {
    this.setState({isEdit: true, todoToEdit: todoIndex});
  }

  render(){
    return (
      <div>
        <TodoForm
          isEdit={this.state.isEdit}
          todoToEdit={this.state.todoToEdit}
          addTodo={this.addTodo}
          updateTodo={this.updateTodo}
          todos={this.state.todos}
        />
        <TodoList showEditMode={this.showEditMode} todos={this.state.todos} removeTodo={this.removeTodo}/>
      </div>
    )
  }
}


class TodoForm extends Component{
  constructor(){
    super();

    // Setup the initial state
    this.state = {todoTitle: ''};
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.isEdit){
      let todo = nextProps.todos[nextProps.todoToEdit];
      this.setState({todoTitle: todo.title});
    }
  }

  handleChange = (e) => {
    // track the todo title to the state
    this.setState({todoTitle: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if(this.props.isEdit){
      // Update existing todo
      this.props.updateTodo(this.props.todoToEdit, {title: this.state.todoTitle});

    }else{
      // Add the todo
      this.props.addTodo({title: this.state.todoTitle});
    }

    this.setState({todoTitle: ''});
  }
  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.handleChange} value={this.state.todoTitle} type="text" name="todo-title" placeholder="Todo Title"/>
        <input type="submit" className="btn btn-primary" value={(this.props.isEdit ? "Edit" : "Add") + " Todo"}/>
      </form>
    );
  }
}

// Dumb component named after UI noun: only uses props (no state)
// function TodoList(props){
//   let todosHtml = props.todos.map(function(todo){
//     return (
//       <li className="list-group-item" key={todo.title}>
//         {todo.title} <a className="btn btn-danger" onClick={props.removeTodo}>Delete</a>
//       </li>
//     );
//   });
//
//   return (
//     <ul className="list-group">
//       {todosHtml}
//     </ul>
//   );
// }


class TodoList extends Component{
  render(){
    let todosHtml = this.props.todos.map((todo, index) => {
      return (
        <li className="list-group-item clearfix" key={todo.title}>
          {todo.title}
          <span className="pull-right">
            <button className="btn btn-danger" onClick={(e) => {e.preventDefault(); this.props.removeTodo(index); }}>Delete</button>
            <button className="btn btn-success" onClick={(e) => {e.preventDefault(); this.props.showEditMode(index); }}>Edit</button>
          </span>
        </li>
      );
    });

    return (
      <ul className="list-group">
        {todosHtml}
      </ul>
    );
  }
}


export default Todo;
