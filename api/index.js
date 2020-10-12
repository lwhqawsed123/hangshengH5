import request from "../utils/request.js"

export function list(data) {
	return request({
		url: `/insurance/show/nissan/getList`,
		method: 'GET',
		data: data
	})
}

export function getDetail(data) {
	return request({
		url: `/insurance/show/nissan/${data}`,
		method: 'GET'
	})
}
