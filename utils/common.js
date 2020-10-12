import {token,timetamp} from "./config.js"
export function setToken(data){
	uni.setStorageSync(token, data);
	let	time=new Date().getTime()
	uni.setStorageSync(timetamp, time);
}

export function getToken(){
	return uni.getStorageSync(token)||""
}

export function removeToken(){
	uni.removeStorageSync(token);
	uni.removeStorageSync(timetamp);
}

export function checkToken(){
	let	time=new Date().getTime()
	let backToken=getToken()
	let backTime=uni.getStorageSync(timetamp)
	if(backToken){
		if(backTime&&time-backTime<=7*24*60*60*1000){
			return true;
		}else{
			uni.showToast({
				icon:"none",
				mask:true,
				title:"token已过期，请重新登陆"
			})
			removeToken()
			return false;
		}
		
	}else{
		return false;
	}
}

// 自定义filter
export function myFilter(value, options) {
    if (options && options instanceof Array) {
        let arr = options.filter(item => item.value === value)
        if (arr.length) {
            return arr[0] && arr[0].label
        } else {
            return value
        }
    } else {
        return value
    }
}

// 自定义弹框消息
export function myToast(message) {
    uni.showToast({
    	title: message,
    	icon: 'none',
    	mask: true,
		duration:3000
    })
}