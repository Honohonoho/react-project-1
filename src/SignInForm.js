import React from 'react';

export default function(props){
	return(
		<form className="signIn" onSubmit={props.onSubmit}> {/*登录*/}
			<div className="row">
				{/*<label>用户名</label>*/}
				<svg className="ali-icon" aria-hidden="true">
    			<use xlinkHref="#icon-yonghu1"></use>
				</svg>
				<input type="text" autoFocus="autofocus" placeholder="用户名"
					value={props.formData.username}
					onChange={props.onChange.bind(null,'username')} />
			</div>
			<div className="row">
				{/*<label>密码</label>*/}
				<svg className="ali-icon" aria-hidden="true">
    			<use xlinkHref="#icon-unie617"></use>
				</svg>
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