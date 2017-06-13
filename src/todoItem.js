import React,{ Component } from 'react';
import './TodoItem.css';
import Deleted from './img/deleted.png'

export default class TodoItem extends Component {
	render(){
		return (
			<div className="TodoItem">
				<label className={this.props.todo.status === 'completed' ? "checked" : null}>
					<span className="icon"
						onClick={this.toggle.bind(this)}
						checked={this.props.todo.status === 'completed'}>
					</span>
					<input type="checkbox"/>
				</label>
				<span className={this.props.todo.status === 'completed' ? "checked title" : "title"}>
					{this.props.todo.title}
				</span>
				<img onClick={this.delete.bind(this)} src={Deleted} alt=""/>
			</div>
		)
	}
	toggle(e){
		this.props.onToggle(e,this.props.todo)
	}
	delete(e){
		this.props.onDelete(e,this.props.todo)
	}
}