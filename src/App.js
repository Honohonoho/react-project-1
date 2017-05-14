import React, { Component } from 'react';
import 'normalize.css';
import './reset.css';
import './App.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      newTodo: '',
      todoList: []
    }
  }

  render() {
    let willdo = this.state.todoList.map((item,index)=>{
      return ( //多个节点时需要加括号,<li>的数量取决于todoList
        <li key={index}>
          <TodoItem todo={item} onToggle={this.toggle.bind(this)}/>
        </li>
      )
    })


    return (
      <div className="App">
        <h1>我的待办</h1>
        <div className="inputArea">
          <TodoInput content={this.state.newTodo}
            onChange={this.changeTitle.bind(this)}
            onSubmit={this.addTodo.bind(this)}/>
        </div>
        <ol>
          {willdo}
        </ol>
      </div>
    )
  }
  toggle(e,todo){
    todo.status = todo.status === 'completed' ? '' : 'completed'
    this.setState(this.state)
  }
  changeTitle(event){
    this.setState({
      newTodo: event.target.value,
      todoList: this.state.todoList
    })
  }
  addTodo(event){
    this.state.todoList.push({
      id: idMarker(),
      title: event.target.value,
      status: null,
      deleted: false
    })
    this.setState({
      newTodo: '',
      todoList: this.state.todoList
    })
  }
}

export default App;

let id = 0;
function idMarker() {
  id += 1;
  return id;
}
