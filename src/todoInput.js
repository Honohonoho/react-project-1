import React,{ Component } from 'react';

export default class todoInput extends Component{
	render(){
		return <input type="text" value={this.props.content}/>
	}
}