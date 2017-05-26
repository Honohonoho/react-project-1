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
		console.log(loginedUser);
		let user = getUserFormAVUser(loginedUser)
		successFn.call(null,user)
	},function(error){
		errorFn.call(null,error)
	})
	return undefined
}
function getUserFormAVUser(AVUser){
	return{
		id: AVUser.id,
		...AVUser.attributes
	}
}