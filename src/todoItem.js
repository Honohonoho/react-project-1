import React,{ Component } from 'react';

export default class todoItem extends Component{
	render(){
		return <div>{this.props.todo.title}</div>
	}
}