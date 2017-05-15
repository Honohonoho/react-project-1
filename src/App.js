import React, { Component } from 'react';
import 'normalize.css';
import './reset.css';
import './App.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import * as localStore from './localStore';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      newTodo: '',
      todoList: localStore.load('todoList') || []
    }
  }

  render() {
    let willdo = this.state.todoList
      .filter((item)=> !item.deleted)
      .map((item,index)=>{
      return ( //多个节点时需要加括号,<li>的数量取决于todoList
        <li key={index}>
          <TodoItem 
            todo={item} 
            onToggle={this.toggle.bind(this)}
            onDelete={this.delete.bind(this)}/>
        </li>
      )
    })

    return (
      <div className="App">
        <h1>我的待办</h1>
        <div className="inputArea">
          <TodoInput 
            content={this.state.newTodo}
            onChange={this.changeTitle.bind(this)}
            onSubmit={this.addTodo.bind(this)}/>
        </div>
        <ol className="todoList">
          {willdo}
        </ol>
      </div>
    )
  }
  
  componentDidUpdate(){  // componentDidUpdate 会在组件更新之后调用
    localStore.save('todoList',this.state.todoList)
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
  delete(event,todo){
    todo.deleted = true;
    this.setState(this.state)
  }
}

export default App;

let id = 0;
function idMarker() {
  id += 1;
  return id;
}
