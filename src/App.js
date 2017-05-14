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
      newTodo: 'text',
      todoList: [
        {id: 1, title: '第一个待办'},
        {id: 2, title: '第二个待办'},
      ]
    }
  }

  render() {
    let willdo = this.state.todoList.map((item,index)=>{
      return ( //多个节点时需要加括号,<li>的数量取决于todoList
        <li>
          <TodoItem todo={item} />
        </li>
      )
    })

    return (
      <div className="App">
        <h1>我的待办</h1>
        <div className="inputArea">
          <TodoInput content={this.state.newTodo} />
        </div>
        <ol>
          {willdo}
        </ol>
      </div>
    )
  }
}

export default App;
