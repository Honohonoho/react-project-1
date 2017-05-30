import React, {Component} from 'react';
import './UserDialog.css';
import {signUp,signIn,sendPasswordResetEmail} from './leanCloud';
import SignInOrSignUp from './SignInOrSignUp';
import ForgotPasswordForm from './ForgotPasswordForm';
import Logo from './img/list-todo.png';
import {DeepCopy} from './DeepCopy';

export default class UserDialog extends Component{
	constructor(props){
		super(props)
		this.state = {
			selectedTab: 'signInOrSignUp',
			formData: {
				email: '',
				username: '',
				password: ''
			}
		}
	}

	signUp(e){
		e.preventDefault()
		let {email,username,password} = this.state.formData
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
		signUp(email,username,password,success,error)
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
	showForgotPassword(){
		let stateCopy = DeepCopy(this.state)
		stateCopy.selectedTab = 'forgotPassword'
		this.setState(stateCopy)
	}
	resetPassword(e){
		e.preventDefault()
		sendPasswordResetEmail(this.state.formData.email)
	}
	returnToSignIn(){
		let stateCopy = DeepCopy(this.state)
		stateCopy.selectedTab = 'signInOrSignUp'
		stateCopy.selected = 'signIn'
		this.setState(stateCopy)
	}
	render(){
		return (
			<div className="UserDialog-Wrapper">
				<div className="UserDialog">
					<div className="Logo">
						<img src={Logo} alt=""/>
						<p>欢迎使用 ToDoList</p>
					</div>
					{
						this.state.selectedTab === 'signInOrSignUp' ?
							<SignInOrSignUp
								formData={this.state.formData}
								onChange={this.changeFormData.bind(this)}
								onSignIn={this.signIn.bind(this)}
								onSignUp={this.signUp.bind(this)}
								onForgotPassword={this.showForgotPassword.bind(this)} /> 
							: 
							<ForgotPasswordForm 
								formData={this.state.formData}
								onChange={this.changeFormData.bind(this)}
								onSubmit={this.resetPassword.bind(this)}
								onSignIn={this.returnToSignIn.bind(this)} />
					}
				</div>
			</div>
		)
	}
}