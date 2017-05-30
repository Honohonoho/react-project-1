import React, { Component } from 'react';
import 'normalize.css';
import './reset.css';
import './App.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import UserDialog from './UserDialog';
import {DeepCopy} from './DeepCopy';
import {getCurrentUser, signOut, Todomodel, updateToDoList, loadToDoList} from './leanCloud';


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
	componentWillMount(){
		if(this.state.user){
			this.resetToDoList.call(this)
		}
	}
	resetToDoList(){
		function success(list){
			this.state.todoList = list
			this.setState({
				todoList: this.state.todoList
			})
		}
		function error(){
		}
		loadToDoList(this.state.user,success.bind(this),error) //success.bind(this)和addToDo中success箭头函数实现的效果一样。。。
	}
	signOut(){
		signOut()
		let stateCopy = DeepCopy(this.state)
		stateCopy.user = {}
		stateCopy.todoList = []
		this.setState(stateCopy)
	}
    onSignUpOrSignIn(user){
        let stateCopy = DeepCopy(this.state)
        stateCopy.user = user
        this.setState(stateCopy)
		this.resetToDoList.call(this)
    }
	componentDidUpdate(){

	}
	toggle(e,todo){
		todo.status = todo.status === 'completed' ? '' : 'completed'
		this.setState(this.state)
		updateToDoList(this.state.user,todo.id,'status',todo.status)
	}
	changeTitle(event){
		this.setState({
			newTodo: event.target.value,
			todoList: this.state.todoList
		})
	}
	addTodo(event){ //添加调用saveList()
		let newItem = {
			title: event.target.value,
			status: '',
			deleted: false
		}
		let success = (objId)=>{
			newItem.id = objId
			this.state.todoList.push(newItem) //先保存至leanCloud，后添加至todoList
			this.setState({
				newTodo: '',
				todoList: this.state.todoList
			})
			console.log('已添加')
		}
		let error = (error)=>{
			console.log(error)
		}
		Todomodel.create(newItem,this.state.user,success,error)
	}
	delete(event,todo){ //删除和标记已完成都是调用updateList()
		todo.deleted = true;
		this.setState(this.state)
		updateToDoList(this.state.user,todo.id,'deleted',todo.deleted)
	}
	
}

export default App;

