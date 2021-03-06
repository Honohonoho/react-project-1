import React, {Component} from 'react';
import 'normalize.css';
import './reset.css';
import './App.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import UserDialog from './UserDialog';
import {DeepCopy} from './DeepCopy';
import image from './img/background-image.jpg';
import {getCurrentUser, signOut, Todomodel} from './leanCloud';


class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			user: getCurrentUser() || {},
			newTodo: '',
			todoList: []
		}

		let user = getCurrentUser()
		if(user){
			let success = (list)=>{
				let stateCopy = DeepCopy(this.state)
				stateCopy.todoList = list
				this.setState(stateCopy)
			}
			let error = (error)=>{
				console.log(error)
			}
			Todomodel.loadToDoList(user, success, error)
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
				<div className="header">
					<img src={image} alt=""/>
					<p>
						<span className="icon"></span>
						<span className="title">{this.state.user.username || '我'}的一天</span>
					</p>
					{this.state.user.id ? <button onClick={this.signOut.bind(this)}>注销</button> : null}
				</div>
				<ol className="todoList">
					{todos}
				</ol>
				<div className="inputWrapper">
					<span className="icon" 
						onClick={this.addTodo.bind(this)}
						value={this.state.newTodo}
						>
					</span>
					<TodoInput content={this.state.newTodo}
						onChange={this.changeTitle.bind(this)}
						onSubmit={this.addTodo.bind(this)} />
				</div>
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
		let stateCopy = DeepCopy(this.state)
		stateCopy.user = {}
		stateCopy.todoList = []
		this.setState(stateCopy)
	}
    onSignUpOrSignIn(user){
        let stateCopy = DeepCopy(this.state)
        stateCopy.user = user
        this.setState(stateCopy)
		// this.resetToDoList.call(this)
		// let user = getCurrentUser()
		if(user){
			let success = (list)=>{
				let stateCopy = DeepCopy(this.state)
				stateCopy.todoList = list
				this.setState(stateCopy)
			}
			let error = (error)=>{
				console.log(error)
			}
			Todomodel.loadToDoList(user, success, error)
		}
    }
	componentDidUpdate(){

	}
	toggle(e,todo){
		let oldstatus = todo.status
		todo.status = todo.status === 'completed' ? '' : 'completed'
		Todomodel.update(this.state.user, todo, ()=>{  //尝试ES6，第一个箭头函数为success，第二个为error
			this.setState(this.state)
		},(error)=>{
			todo.status = oldstatus
			this.setState(this.state)
		})
	}
	changeTitle(event){
		this.setState({
			newTodo: event.target.value,
			todoList: this.state.todoList
		})
	}
	addTodo(event){
		if(this.state.newTodo === ''){
			return
		}
		let newItem = {
			title: this.state.newTodo,
			status: '',
			deleted: false
		}
		let success = (objId)=>{
			newItem.id = objId
			this.state.todoList.push(newItem)
			this.setState({
				newTodo: '',
				todoList: this.state.todoList
			})
			console.log('已添加')
		}
		let error = (error)=>{
			console.log(error)
		}
		Todomodel.create(newItem,this.state.user,success,error) //函数调用写在函数表达式之后
	}
	delete(event,todo){ //不应该直接删除，而是将数据标记为 deleted：true
		Todomodel.destroy(this.state.user, todo, ()=>{
			todo.deleted = true;
			this.setState(this.state)
		})
	}	
}

export default App;

