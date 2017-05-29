import React,{Component} from 'react';

export default class SignUpForm extends Component{
    render(){
        return (
            <form className="signUp" onSubmit={this.props.onSubmit.bind(this)}> {/*注册*/}
				<div className="row">
					<label>邮箱</label>
					<input type="text" autoFocus="autofocus" placeholder="请输入邮箱"
						value={this.props.formData.email}
						onChange={this.props.onChange.bind(this,'email')} /> {/* bind 不仅可以绑定 this，还可以绑定第一个参数 */}
				</div>
				<div className="row">
					<label>用户名</label>
					<input type="text" placeholder="请输入用户名"
						value={this.props.formData.username}
						onChange={this.props.onChange.bind(this,'username')} /> {/* bind 不仅可以绑定 this，还可以绑定第一个参数 */}
				</div>
				<div className="row">
					<label>密码</label>
					<input type="password" placeholder="请输入密码"
						value={this.props.formData.password}
						onChange={this.props.onChange.bind(this,'password')} />
				</div>
				<div className="row actions">
					<button type="submit">注册</button>
				</div>
			</form>
        )
    }
}