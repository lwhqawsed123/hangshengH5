<template>
	<view class="nav-bar-box">
		<!-- <view class="top-line"><view class="top-line-color"></view></view> -->
		<view class="nav-bar">
			<view class="nav-bar-item" :class="item.id === current ? 'active' : ''" v-for="(item, index) in navBars" :key="index" @click="changeTab(item)">
				<text class="nav-title" :class="item.id === current ? 'active-nav' : ''">{{ item.title }}</text>
				<!-- <text class="nav-line" :class="item.id === current ? 'active-line' : ''"></text> -->
			</view>
		</view>
	</view>
</template>

<script>
import { navBars } from '@/utils/options/navBar.js';
export default {
	props: {
		current: {
			type: Number,
			default: 1
		}
	},
	data() {
		return {
			navBars,
			navBar: [
				{
					id: 0,
					title: '全部'
				},
				{
					id: 1,
					title: '保障中'
				},
				{
					id: 2,
					title: '未起保'
				},
				{
					id: 3,
					title: '已停效'
				},
				{
					id: 4,
					title: '已终止'
				}
			]
		};
	},
	methods: {
		changeTab(target) {
			this.$emit('changeTab', target);
		}
	}
};
</script>

<style lang="scss" scoped>
.nav-bar-box {
	height: 88upx;
	background-color: #ffffff;
	// margin-bottom: 32upx;
	.top-line {
		padding: 0 28upx;
		.top-line-color {
			border-top: 2upx solid #f1f0f0;
		}
	}
}
.nav-bar {
	display: flex;
	align-items: center;
	height: 88upx;
	background-color: #ffffff;
	position: relative;
	.nav-bar-item {
		flex: 1;
		height: 100%;
		text-align: center;
		position: relative;
		line-height: 88upx;
	}
	.nav-title {
		font-size: 28upx;
		color: #2e2e2e;
		display: inline-block;
		padding: 0 15upx;
	}
	.active {
		line-height: 84upx;
	}
	.active-nav {
		color: #eb7b30;
		border-bottom: 4upx solid #eb8830;
	}
	
	.nav-line {
		display: inline-block;
		width: 100%;
		height: 6upx;
		position: absolute;
		bottom: 0;
		left: 0;
		background-color: #ffffff;
	}
	.active-line {
		background-color: #eb8830;
	}
}
</style>
