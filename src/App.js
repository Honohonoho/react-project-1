import React, { Component } from 'react';
import './App.css';
import 'normalize.css';
import './reset.css';
import todoInput from './todoInput';
import todoItem from './todoItem';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      newTodo: 'text',
      todoList: [
        {id: 1, title: '第一个待办'},
        {id: 2, title: '第二个待办'}
      ]
    }
  }

  render() {
    let willdo = this.state.todoList.map((item,index)=>{
      return ( //多个节点时需要加括号,<li>的数量取决于todoList
        <li>
          <todoItem todo={item} />
        </li>
      )
    })

    return (
      <div className="App">
        <h1>我的待办</h1>
        <div className="inputArea">
          <todoInput content={this.state.newTodo}/>
        </div>
        <ol>
          {willdo}
        </ol>
      </div>
    )
  }
}

export default App;
