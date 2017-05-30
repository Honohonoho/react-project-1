import React,{Component} from 'react';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';

export default class SignInOrSignUp extends Component{
    constructor(props){
        super(props)
        this.state = {
            selected: 'signUp'
        }
    }
    switch(e){
		this.setState({
			selected: e.target.value
		})
	}
    render(){
        return (
            <div className="signInOrsignUp" >
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
					{this.state.selected === 'signUp' ? 
						<signUpForm formData={this.props.formData}
							onChange={this.props.onChange}
							onSubmit={this.props.onsignUp}
						/> : null}
					{this.state.selected === 'signIn' ? 
						<signInForm formData={this.props.formData}
							onChange={this.props.onChange}
							onSubmit={this.props.onsignIn}
							onForgotPassword={this.props.onForgotPassword}
						/> : null}
				</div>
			</div>
        )
    }
}