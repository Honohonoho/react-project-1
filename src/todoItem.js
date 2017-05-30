import React,{ Component } from 'react';
import './TodoItem.css';
import Deleted from './img/deleted.png'

export default class TodoItem extends Component {
	render(){
		return (
			<div className="TodoItem">
				<input type="checkbox" checked={this.props.todo.status === 'completed'}
					onChange={this.toggle.bind(this)} />
				<span className="title">{this.props.todo.title}</span>
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