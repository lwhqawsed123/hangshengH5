import request from "../utils/request.js"

export function getVerificationCode(data) {
	return request({
		url: `/insurance/show/nissan/sendsms/${data}`,
		method: 'POST'
	})
}

export function getDetail(data) {
	return request({
		url: `/insurance/show/nissan/${data}`,
		method: 'GET'
	})
}