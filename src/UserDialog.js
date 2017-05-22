import React, {Component} from 'react';
import './UserDialog.css';

export default class UserDialog extends Component{
	constructor(props){
		super(props)
		this.state = {
			selected: 'signUp'
		}
	}
	swicth(e){
		this.setState({
			selected: e.target.value
		})
	}
	render(){
		return (
			<div className="UserDialog-Wrapper">
				<div className="UserDialog">
					<nav onChange={this.switch.bind(this)}>
						<label><input type="radio" value="signUp" checked={this.state.checked === 'signUp'} /> 注册</label>
						<label><input type="radio" value="signIn" checked={this.state.checked === 'signIn'} /> 登录</label>
					</nav>
					<div className="panes">
						<form className="signUp"> {/* 注册*/}
							<div className="row">
								<label>用户名</label>
								<input type="text" />
							</div>
							<div className="row">
								<label>密码</label>
								<input type="password" />
							</div>
							<div className="row actions">
								<button type="submit">登录</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}
}