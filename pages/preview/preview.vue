<template>
	<view class="content">
		<!-- <view class="images-box"><image :src="item" mode="aspectFit" class="images" v-for="(item, index) in imagesList" :key="index" @click="preview(item, index)"></image></view> -->
		<a :href="previewUrl1" target="_blank">预览</a>
		<!-- <u-link :href="previewUrl1">蜀道难，难于上青天</u-link> -->
		<!-- <embed :src="previewUrl" type="application/pdf" width="100%" height="100%"> -->

	</view>
</template>

<script>
import { downPDF } from '@/api/preview.js';
export default {
	data() {
		return {
			previewUrl1: 'http://10.0.0.231:8080/insurance/nissan/static/files/航盛车云车联网服务.pdf',
			previewUrl: 'http://10.0.0.88/insurance/nissan/static/files/航盛车云车联网服务.pdf',
			imagesList: []
		};
	},
	onLoad(params) {
		this.openWindow();
		if (params && params.id) {
			// console.log(params.id)
			// this.getPDF(params.id)
			// this.showPDF()
		}
	},
	methods: {
		getPDF(id) {
			downPDF(id).then(res => {
				let { data, code } = res;
				if (code === 200) {
					this.previewUrl = data;
				}
			});
		},
		openWindow() {
			window.open(
				'http://10.0.0.231:8080/insurance/nissan/static/files/航盛车云车联网服务.pdf',
				'保单预览',
				'height=400, width=400, toolbar =no, menubar=no, scrollbars=no, resizable=no, location=no, status=no'
			);
		},
		// 预览pdf
		showPDF() {
			uni.downloadFile({
				url: this.previewUrl1,
				success: function(res) {
					var filePath = res.tempFilePath;
					uni.openDocument({
						filePath: filePath,
						success: function(res) {
							console.log('打开文档成功');
						}
					});
				}
			});
		},
		preview(index) {
			// 预览图片
			uni.previewImage({
				current: index,
				urls: this.imagesList,
				longPressActions: {
					itemList: ['发送给朋友', '保存图片', '收藏'],
					success: function(data) {
						console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
					},
					fail: function(err) {
						console.log(err.errMsg);
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	width: 100%;
	height: 100%;
}
.content {
	width: 100%;
	height: 100%;
	.images-box {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		.images {
			width: 500upx;
			height: 800upx;
			margin-bottom: 10upx;
		}
	}
}
</style>
