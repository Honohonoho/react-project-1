import React,{Component} from 'react';

export default class ForgotPasswordForm extends Component{
    render(){
        return(
            <div className="forgotPassword">
				<p>重置密码</p>
				<form className="forgotPassword" onSubmit={this.props.onSubmit}>
					<div className="row">
						{/*<label>邮箱</label>*/}
						<svg className="ali-icon" aria-hidden="true">
							<use xlinkHref="#icon-youxiang5"></use>
						</svg>
						<input type="email" autoFocus="autofocus" placeholder="请输入邮箱"
							value={this.props.formData.email}
							onChange={this.props.onChange.bind(this,'email')} />
					</div>
					<div className="row actions">
						<button type="submit">发送重置密码邮件</button>
					</div>
					<div className="return">
						<a href="#" onClick={this.props.onSignIn}>&lt;返回登录</a>
					</div>
				</form>
			</div>
        )
    }
}