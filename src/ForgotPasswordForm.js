import React,{Component} from 'react';

export default class ForgotPasswordForm extends Component{
    render(){
        return(
            <div className="forgotPassword">
				<p>
					重置密码
				</p>
				<form className="forgotPassword" onSubmit={this.props.onSubmit}>
					<div className="row">
						<label>邮箱</label>
						<input type="text" autoFocus="autofocus" placeholder="请输入邮箱"
							value={this.props.formData.email}
							onChange={this.props.onChange.bind(this,'email')} />
					</div>
					<div className="row actions">
						
						<button type="submit">发送重置密码邮件</button>
					</div>
					<div className="return">
						<a href="#" onClick={this.props.onSignIn}>←返回登录</a>
					</div>
				</form>
			</div>
        )
    }
}