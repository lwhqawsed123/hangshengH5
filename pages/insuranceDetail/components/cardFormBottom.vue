<template>
	<view>
		<!-- <view class="card-form-item" v-if="false">
			<view class="card-form-label">保障详情</view>
			<view class="card-form-value">
				<text class="text-color-gray">了解更多详情,请阅读</text>
				<text class="text-color-red text-hover">《保险条款》</text>
			</view>
		</view> -->
		<view class="card-form-item">
			<!-- <view class="text-color-red" hover-class="navigator-hover">电子发票查询/开具</view>
			<text class="text-line">|</text> -->
			<view class="text-color-red" hover-class="navigator-hover" @click="openPopup">发送电子保单至邮箱</view>
		</view>
		<!-- <view class="card-form-item" v-if="false"><view class="text-color-red" hover-class="navigator-hover">申请理赔</view></view> -->
		<!-- <view class="card-form-item" v-if="false"><view class="text-color-red" hover-class="navigator-hover">点击续保</view></view> -->
		<view class="to-detail-button" @click="navigatorTo">查看电子保单</view>
	</view>
</template>

<script>
import { API_HOST } from '@/utils/config.js';
export default {
	props: {
		id: {
			type: [String, Number]
		}
	},
	data() {
		return {
			previewUrl1: '/static/files/3-3D相机成像原理简介(1).pdf'
		};
	},
	// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
	mounted() {},
	methods: {
		navigatorTo() {
			// uni.navigateTo({
			// 	url:`/pages/preview/preview?id=${this.id}`
			// 	// url:"/pages/preview/filePreview"
			// })
			// window.location.href="http://10.0.0.231:8080/insurance/nissan/static/files/航盛车云车联网服务.pdf"
			this.openWindow();
		},
		openWindow() {
			// console.log("打开新窗口")
			// let newWindow= window.open ("http://10.0.0.231:8080/insurance/nissan/static/files/航盛车云车联网服务.pdf", "123", "height=400, width=400, toolbar =no, menubar=no, scrollbars=no, resizable=no, location=no, status=no")
			// newWindow.document.title="123"
			var link = document.createElement('a');
			const url = window.location.href;
			const index = url.indexOf('/pages');
			const baseUrl = url.slice(0, index);
			link.href = baseUrl + this.previewUrl1;
			link.title = '我的保单';
			// link.download = filename;
			link.click();
		},
		// 打开邮箱弹框
		openPopup() {
			this.$emit('openPopup');
		}
	}
};
</script>

<style lang="scss" scoped>
.card-form-item {
	height: 88upx;
	line-height: 88upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	// border-top: 2upx solid #d9d9d9;
	.card-form-label {
		min-width: 130upx;
		text-align-last: justify;
		text-align: justify;
		margin-right: 20upx;
	}
	.card-form-value {
		color: #777777;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.text-color-red {
		flex: 1;
		color: #eb5944;
		text-align: center;
	}
	.text-line {
		color: #d9d9d9;
	}
	.text-hover {
		&:active {
			background-color: #eeeeee;
		}
	}
}
.to-detail-button {
	width: 100%;
	text-align: center;
	color: #FAF7F5;
	font-size: 30upx;
	// background-color: #efa843;
	height: 80upx;
	line-height: 80upx;
	background: linear-gradient(-45deg, #eb7b30, #eb8830);
	border-radius: 40upx;
	&:active {
		color: #777777;
		background: linear-gradient(-45deg, #eba248, #eb7906);
	}
}
.border-bottom {
	justify-content: center;
	border-bottom: 3upx solid #d9d9d9;
}
</style>
