import React from 'react';
import './TodoInput.css'

function submit(props,e){
	if(e.key === 'Enter'){
        if(e.target.value.trim() !== ''){
            props.onSubmit(e)
        }
	}
}

function changeTitle(props,e){
	props.onChange(e)
}

export default function (props){
		return <input type="text" placeholder="请输入待办事项" className="TodoInput" 
			value={props.content}
			onChange={changeTitle.bind(null,props)} //bind()的第二个参数跟在this（或其他对象）后面，被插入到目标函数的参数列表的开始位置
			onKeyPress={submit.bind(null,props)} />
}
