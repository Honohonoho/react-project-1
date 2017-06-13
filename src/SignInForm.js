import React from 'react';

export default function(props){
	return(
		<form className="signIn" onSubmit={props.onSubmit}> {/*登录*/}
			<div className="row">
				{/*<label>用户名</label>*/}
				<input type="text" autoFocus="autofocus" placeholder="用户名"
					value={props.formData.username}
					onChange={props.onChange.bind(null,'username')} />
			</div>
			<div className="row">
				{/*<label>密码</label>*/}
				<input type="password" placeholder="密码"
					value={props.formData.password}
					onChange={props.onChange.bind(null,'password')} />
			</div>
			<div className="row actions">
				<button type="submit">登录</button>
			</div>
			<div className="forgot">
				<a href="#" onClick={props.onForgotPassword}>忘记密码？</a>
			</div>
		</form>
	)
}