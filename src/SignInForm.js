import React,{Component} from 'react';

export default class SignInForm extends Component{
    render(){
        return(
            <form className="signIn" onSubmit={this.props.onSubmit.bind(this)}> {/*登录*/}
				<div className="row">
					<label>用户名</label>
					<input type="text" autoFocus="autofocus" placeholder="请输入用户名"
						value={this.props.formData.username}
						onChange={this.props.onChange.bind(this,'username')} />
				</div>
				<div className="row">
					<label>密码</label>
					<input type="password" placeholder="请输入密码"
						value={this.props.formData.password}
						onChange={this.props.onChange.bind(this,'password')} />
				</div>
				<div className="row actions">
					<button type="submit">登录</button>
				</div>
				<div className="forgot">
					<a href="#" onClick={this.props.onForgotPassword.bind(this)}>忘记密码？</a>
				</div>
			</form>
        )
    }
}