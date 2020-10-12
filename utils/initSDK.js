import wx from '../js-sdk/js-sdk.js'
import {RES_HOST} from "./config.js"
// 初始化js-sdk
/**sdkReady
 * @param {Object} setting	初始化sdk配置....
 * 							url 初始化域名地址  非必填 默认是当前域名 ;
 * 							jsApiList 初始化sdk需要调用的功能	非必填 默认只有分享给朋友和分享到qq空间;
 * 							ready 初始化成功后执行的回调方法  非必填;
 */
export function sdkReady(setting) {
	var that = this;
	// console.log("=====原url=======")
	// console.log(window.location.href)
	let href = window.location.href.split('#')[0]
	// console.log("href是: "+href)
	let user = uni.getStorageSync(constant.userInfo);
	let shareHref = `${href}?shareId=${user.id}`
	that.get({
		url: 'wx/mp/createSign',
		params: {
			url: setting && setting.url || href
		},
		callback: res => {
			let {
				meta,
				data
			} = res
			let jsApiList = ''
			if (setting && setting.jsApiList) {
				jsApiList = setting.jsApiList
			}
			wx.config({
				debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: data.appId, // 必填，公众号的唯一标识
				timestamp: data.timestamp, // 必填，生成签名的时间戳
				nonceStr: data.nonceStr, // 必填，生成签名的随机串
				signature: data.signature.toLowerCase(), // 必填，签名，见附录1
				jsApiList: jsApiList || ['updateAppMessageShareData', 'updateTimelineShareData']
			});
			wx.ready(function() {
				wx.updateAppMessageShareData({
					title: "安然齐力", // 分享标题
					desc: "安然齐力公众号", // 分享描述
					link: shareHref, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: RES_HOST + '/img/PQP821NE-二维码默认占位@3x.jpg', // 分享图标
					success: function() {
						// 设置成功
					}
				});
				wx.updateTimelineShareData({
					title: "安然齐力", // 分享标题
					link: shareHref, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: RES_HOST + '/img/PQP821NE-二维码默认占位@3x.jpg', // 分享图标
					success: function() {
						// 设置成功
					}
				})
				//存在回调方法则执行方法
				if (setting && setting.ready && typeof setting.ready == 'function') {
					setting.ready();
				}
			})
		}
	})
}
