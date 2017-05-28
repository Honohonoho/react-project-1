import AV from 'leancloud-storage';

var APP_ID = 'hQmOfHwO8BAIOOY48enYB85H-gzGzoHsz';
var APP_KEY = 'UsUmRCkVuSQIptxpRJ99wlgh';
AV.init({
	appId: APP_ID,
	appKey: APP_KEY
});

export default AV
export function signUp(username,password,successFn,errorFn){
	//新建 AVuser 对象实例
	var user = new AV.User()
	//设置用户名
	user.setUsername(username)
	//设置密码
	user.setPassword(password)
	//设置邮箱
	//user.setEmail();
	user.signUp().then(function(loginedUser){
		let user = getUserFromAVUser(loginedUser)
		successFn.call(null,user)
	},function(error){
		errorFn.call(null,error)
	})
	return undefined
}
function getUserFromAVUser(AVUser){
	return{
		id: AVUser.id,
		...AVUser.attributes
	}
}
export function getCurrentUser(){
	let user = AV.User.current()
	if(user){
		return getUserFromAVUser(user)
	}else{
		return null
	}
}
export function signOut(){
	AV.User.logOut()
	return undefined
}
export function signIn(username,password,successFn,errorFn){
	AV.User.logIn(username,password).then(function(loginedUser){
		let user = getUserFromAVUser(loginedUser)
		successFn.call(null,user)
	},function(error){
		errorFn.call(null,error)
	})
}
export function updateToDoList(username,itemid,key,value){
	var className = 'todoitem:' + username.id
	var todoitem = AV.Object.createWithoutData(className,itemid)
	todoitem.set(key,value)
}
export function saveToDoList(item,user,successFn,errorFn){
	// 声明类型
	var TodoList = AV.Object.extend('todo' + user.id) 
	// 新建对象
	var todoList = new TodoList()
	// 设置todoList各项属性
	todoList.set('name', user.name)
	todoList.set('title', item.title)
	todoList.set('status', item.status)
	todoList.set('deleted', item.deleted)
	todoList.save().then( function(todo){
		successFn.call(null,todo.id)
		alert('保存成功')
	},function(error){
		errorFn.call(null)
		alert('error')
	})
}