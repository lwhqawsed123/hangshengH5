import {
	API_HOST
} from "./config.js"
import {
	setToken,
	getToken,
	removeToken,
	checkToken
} from "./common.js"

function showToast(title) {
	uni.showToast({
		title: title,
		mark: true,
		icon: 'none'
	});
}

function request({
	url,
	method = 'GET',
	data,
	noLoading = false,
	header = {
		'content-type': 'application/json;charset=utf-8'
	},
}) {
	// if(option.url.indexOf("login"===-1)){
	// 	if(!checkToken()){
	// 		return false
	// 	}
	// }
	if (!noLoading) {
		uni.showLoading({
			mask: true
		});
	}
	if (method.toLowerCase() == 'post') {
		header['content-type'] = header['content-type'] ? header['content-type'] : 'application/x-www-form-urlencoded'
	}
	// console.log(url,method,data)
	return new Promise((resolve, reject) => {
		uni.request({
			method,
			url: API_HOST + url,
			data,
			header,
			success: res => {
				// console.log(res)
				uni.hideLoading()
				if (res.data.code === 200) {
					resolve(res.data)
				} else {
					showToast(res.data.msg)
					resolve(res.data)
				}
			},
			fail: error => {
				uni.hideLoading()
				showToast("request error.")
				reject(error)
			}
		})
	})
	// return uni.request({
	// 	method: method,
	// 	url: API_HOST + option.url,
	// 	data: option.params,
	// 	header: {
	// 		"Content-Type": (option.header && option.header["Content-Type"]) || "application/json;charset=utf-8",
	// 		// "token":getToken()
	// 	}
	// }).then(back => {
	// 	console.log(back)
	// 	const [error, res] = back
	// 	if (res.data && res.data.meta.code === 200) {
	// 		return res.data.data
	// 	} else {
	// 		showToast()
	// 		return res.data
	// 	}
	// }).catch(error => {
	// 	uni.showToast({
	// 		title: "request error.",
	// 		mark: true,
	// 		icon: 'none'
	// 	});
	// 	return Promise.reject(error)
	// })
}



export default request
