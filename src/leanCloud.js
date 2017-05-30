import AV from 'leancloud-storage';

var APP_ID = 'hQmOfHwO8BAIOOY48enYB85H-gzGzoHsz';
var APP_KEY = 'UsUmRCkVuSQIptxpRJ99wlgh';
AV.init({
	appId: APP_ID,
	appKey: APP_KEY
});

export default AV
export const Todomodel = {
	loadToDoList(user, successFn, errorFn){
		let query = new AV.Query(user.username)
		query.equalTo('deleted',false);
		query.find().then((response)=>{
			let arry = response.map((key)=>{
				return {id: key.id, ...key.attributes}
			})
			successFn.call(null,arry)
		},(error)=>{
			errorFn && errorFn.call(null, error)
		})
	},
	// 	AV.Query.doCloudQuery(`select * from ${user.username}`)
	// 	.then( function(data){ // results 即为查询结果，它是一个 AV.Object 数组
	// 		for(let i=0; i<data.results.length; i++){
	// 			let obj = {
	// 				id: data.results[i].id,
	// 				...data.results[i].attributes
	// 			}
	// 			arry.push(obj)
	// 		}
	// 		successFn.call(null,arry)
	// 	},function(error){
	// 		console.log(error)
	// 		errorFn && errorFn.call(null)
	// 	})
	// },
	create(item, user, successFn, errorFn){
		// 声明类型
		var Todo = AV.Object.extend(user.username) 
		// 新建对象
		var todo = new Todo()
		// 设置todoList各项属性
		todo.set('name', user.username)
		todo.set('title', item.title)
		todo.set('status', item.status)
		todo.set('deleted', item.deleted)
		todo.save().then( function(todo){
			successFn.call(null,todo.id) 
			alert('成功推送至至LeanCloud')
		},function(error){
			errorFn && errorFn.call(null)
			alert('error')
		})
		let acl = new AV.ACL()
		acl.setPublicReadAccess(false)
		acl.setWriteAccess(AV.User.current(),true)
		acl.setReadAccess(AV.User.current(),true)
		todo.setACL(acl);
	},
	update(user, item, successFn, errorFn){
		let className = user.username
		let todo = AV.Object.createWithoutData(className,item.id)
		item.title !== undefined && todo.set('title',item.title)
		item.status !== undefined && todo.set('status',item.status)
		item.deleted !== undefined && todo.set('deleted',item.deleted)
		todo.save().then((response)=>{
			successFn && successFn.call(null)
		},(error)=>{
			errorFn && errorFn.call(null,error)
		})

	},
	destroy(user, item, successFn, errorFn){ //不应该直接删除，而是将数据标记为 deleted：true
		Todomodel.update(user, {id: item.id,deleted: true} , successFn, errorFn)
	}
}
export function signUp(email,username,password,successFn,errorFn){
	//新建 AVuser 对象实例
	var user = new AV.User()
	//设置用户名
	user.setUsername(username)
	//设置密码
	user.setPassword(password)
	//设置邮箱
	user.setEmail(email)
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
		...AVUser.attributes //...是展开运算符，可以把数组转化为参数序列
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
export function sendPasswordResetEmail(emailAddress,successFn,errorFn){
	AV.User.requestPasswordReset(emailAddress).then(function(success){
		successFn.call()
	},function(error){
		console.dir() //console.dir()可以显示一个对象所有的属性和方法。
	})
}