import request from "../utils/request.js"

export function sendAttachmentsMail(data) {
	return request({
		url: `/insurance/show/nissan/sendAttachmentsMail/${data.policyNo}/${data.email}`,
		method: 'POST',
		header:{
			"content-type":"application/json"
		}
	})
}
