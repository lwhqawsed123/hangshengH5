import Mock from 'mockjs'


let xhrRes = {
    meta:{
		'code|1': [200,210,220],
		'info|1': ['验证成功','验证失败','验证码已过期'],
	},
    data: {
        'code|1000-9999': "",
    }
}

Mock.mock('/verificationCode','get',xhrRes)


