import request from "../utils/request.js"

export function downPDF(id) {
	return request({
		url: `/insurance/show/order/${id}`,
		method: 'GET'
	})
}
