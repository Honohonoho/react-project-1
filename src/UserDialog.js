import React, {Component} from 'react';
import './UserDialog.css';
import {signUp,signIn} from './leanCloud';
import Logo from './img/list-todo.png';
import {DeepCopy} from './DeepCopy';

export default class UserDialog extends Component{
	constructor(props){
		super(props)
		this.state = {
			selected: 'signUp',
			formData: {
				username: '',
				password: ''
			}
		}
	}
	switch(e){
		this.setState({
			selected: e.target.value
		})
	}
	signUp(e){
		e.preventDefault()
		let {username,password} = this.state.formData
		let success = (user)=>{
			this.props.onSignUp.call(null,user)
		}
		let error = (error)=>{
			switch(error.code){
				case 200:
					alert('没有提供用户名，或者用户名为空')
					break
				case 202:
					alert('用户名被人占用啦    ╮(╯_╰)╭')
					break
				case 217:
					alert('用户名不能含有空格')
					break
				default:
					alert(error)
					break
			}
		}
		signUp(username,password,success,error)
	}
	signIn(e){
		e.preventDefault()
		let {username,password} = this.state.formData
		let success = (user)=>{
			this.props.onSignIn.call(null,user)
		}
		let error = (error)=>{
			switch(error.code){
				case 210:
					alert('用户名与或密码输错啦╮(╯_╰)╭')
					break
				case 211:
					alert('用户名输错啦╮(╯_╰)╭')
					break	
				case 219:
					alert('登录失败次数超过限制，请稍候再试，或者通过忘记密码重设密码。')
					break
				default:
					alert(error)
					break
			}
		}
		signIn(username,password,success,error)
	}
	changeFormData(key,e){
		let stateCopy = DeepCopy(this.state)
		stateCopy.formData[key] = e.target.value;
		this.setState(stateCopy)
	}
	render(){
		let signUpForm = (
			<form className="signUp" onSubmit={this.signUp.bind(this)}> {/*注册*/}
				<div className="row">
					<label>用户名</label>
					<input type="text" autoFocus="autofocus" placeholder="请输入用户名"
						value={this.state.formData.username}
						onChange={this.changeFormData.bind(this,'username')} /> {/* bind 不仅可以绑定 this，还可以绑定第一个参数 */}
				</div>
				<div className="row">
					<label>密码</label>
					<input type="password" placeholder="请输入密码"
						value={this.state.formData.password}
						onChange={this.changeFormData.bind(this,'password')} />
				</div>
				<div className="row actions">
					<button type="submit">注册</button>
				</div>
			</form>		
		)
		let signInForm = (
			<form className="signIn" onSubmit={this.signIn.bind(this)}> {/*登录*/}
				<div className="row">
					<label>用户名</label>
					<input type="text" autoFocus="autofocus" placeholder="请输入用户名"
						value={this.state.formData.username}
						onChange={this.changeFormData.bind(this,'username')} />
				</div>
				<div className="row">
					<label>密码</label>
					<input type="password" placeholder="请输入密码"
						value={this.state.formData.password}
						onChange={this.changeFormData.bind(this,'password')} />
				</div>
				<div className="row actions">
					<button type="submit">登录</button>
				</div>
			</form>	
		)
		return (
			<div className="UserDialog-Wrapper">
				<div className="UserDialog">
					<div className="Logo">
						<img src={Logo} alt=""/>
						<p>欢迎使用 ToDoList</p>
					</div>
					<nav onChange={this.switch.bind(this)}>
						<label className={this.state.selected === 'signUp' ? "checked" : null}>
							<input type="radio" value="signUp" 
								checked={this.state.selected === 'signUp'}
								onChange={this.switch.bind(this)} />注册
						</label>
						<label className={this.state.selected === 'signIn' ? "checked" : null}>
							<input type="radio" value="signIn"
								checked={this.state.selected === 'signIn'}
								onChange={this.switch.bind(this)} />登录
						</label>
					</nav>
					<div className="panes">
						{this.state.selected === 'signUp' ? signUpForm : null}
						{this.state.selected === 'signIn' ? signInForm : null}
					</div>
				</div>
			</div>
		)
	}
}