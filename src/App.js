import React, { Component } from 'react';
import './App.css';
import todoInput from './todoInput';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      newTodo: 'text',
      todoList: [
        {id: 1, title: '第一个待办'}
      ]
    }
  }

  render() {
    let willdo = this.state.newTodo.map((item,index)=>{
      return <li>{item.title}</li>
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
