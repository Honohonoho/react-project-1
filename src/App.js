import React, { Component } from 'react';
import 'normalize.css';
import './reset.css';
import './App.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import UserDialog from './UserDialog';
import {getCurrentUser, signOut, saveToDoList, updateToDoList} from './leanCloud';


class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			user: getCurrentUser() || {},
			newTodo: '',
			todoList: []
		}
	}
	render(){
		let todos = this.state.todoList
			.filter((item)=> !item.deleted)
			.map((item,index)=>{
			return (
				<li key={index}>
					<TodoItem todo={item} onToggle={this.toggle.bind(this)}
						onDelete={this.delete.bind(this)} />
				</li>
			)
		})
		return (
			<div className="App">
				<h1>{this.state.user.username || '我'}的待办事项
					
				</h1>
				{this.state.user.id ? <button onClick={this.signOut.bind(this)}>注销</button> : null}
				<div className="inputWrapper">
					<TodoInput content={this.state.newTodo}
						onChange={this.changeTitle.bind(this)}
						onSubmit={this.addTodo.bind(this)} />
				</div>
				<ol className="todoList">
					{todos}
				</ol>
					{this.state.user.id ?
						null :
                        <UserDialog 
                            onSignUp={this.onSignUpOrSignIn.bind(this)}
                            onSignIn={this.onSignUpOrSignIn.bind(this)}
                    />}
			</div>
		)
	}
	signOut(){
		signOut()
		let stateCopy = JSON.parse(JSON.stringify(this.state))
		stateCopy.user = {}
		this.setState(stateCopy)
	}
    onSignUpOrSignIn(user){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.user = user
        this.setState(stateCopy)
    }
	componentDidUpdate(){

	}
	toggle(e,todo){
		todo.status = todo.status === 'completed' ? '' : 'completed'
		this.setState(this.state)
		console.log('调用toggle：')
        console.log(this.state.user)
		console.log('要调用update了')
		updateToDoList(this.state.user,todo.id,'status',todo.status)
	}
	changeTitle(event){
		this.setState({
			newTodo: event.target.value,
			todoList: this.state.todoList
		})
	}
	addTodo(event){ //添加调用saveList()
		var newItem = {
			id: '',
			title: event.target.value,
			status: null,
			deleted: false
		}
		let success = (objId)=>{
			console.log(event)
			newItem.id = objId
			this.state.todoList.push(newItem) //先保存至leanCloud，后添加至todoList
			this.setState({
				newTodo: '',
				todoList: this.state.todoList
			})
			console.log('已添加')
		}
		function error(){
		}
		saveToDoList(newItem,this.state.user,success,error)
	}
	delete(event,todo){ //删除和标记已完成都是调用updateList()
		todo.deleted = true;
		this.setState(this.state)
		console.log('要调用update了')
		updateToDoList(this.state.user,todo.id,'deleted',todo.deleted)
	}
	
}

export default App;

let id = 0;
function idMaker(){
	id +=1;
	return id
}
