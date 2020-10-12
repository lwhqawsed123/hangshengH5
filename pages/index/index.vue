<template>
	<view class="content">
		<nav-bar :current="current" @changeTab="changeNavbar"></nav-bar>
		<swiper class="swiper" :current="current" @change="changeTab" :style="{ height: swiperHeight + 'px' }">
			<swiper-item v-for="(swiper, index) in navBars" :key="index">
				<view :class="'swiper-box'+swiper.id">
					<block v-for="(order, orderIndex) in orderList" :key="orderIndex"><my-card :order="order" v-if="order.id" :status="swiper.status"></my-card></block>
					<view class="empty-list" v-if="setEmptyMessage(swiper.status)">
						<text class="empty-line"></text>
						<text class="empty-line-message">未找到保单信息</text>
						<text class="empty-line"></text>
					</view>
				</view>
			</swiper-item>
			<!-- <swiper-item>
				<view class="swiper-box1"><my-card v-for="item in 2" :key="item"></my-card></view>
			</swiper-item> -->
		</swiper>
	</view>
</template>

<script>
import navBar from '@/mycomponents/navBar/navBar.vue';
import { navBars } from '@/utils/options/navBar.js';
import myCard from './components/card.vue';
import { list } from '@/api/index.js';
export default {
	components: {
		navBar,
		myCard
	},
	data() {
		return {
			navBars,
			current: 0,
			contentHeight: '',
			swiperHeight: "",
			orderList: [], // 保单对象
			form: {
				// 订单号
				orderNo: '',
				// 车主手机号
				mobileNo:"",
				// 车架号
				licenseNo:"",
				// 验证码
				code:""
			}
		};
	},
	onLoad(options) {
		if (options && options.value) {
			this.form[options.query] = options.value;
			this.form.code=options.code
		}
		if (options && options.code) {
			this.form.code=options.code
		}
	},
	onReady() {
		this.getContentHeight();
		this.getlistHeight('.swiper-box0');
	},
	onShow() {
		this.getList();
	},
	methods: {
		// 获取保单信息
		getList() {
			list(this.form).then(res => {
				let {data,code}=res
				if (code === 200) {
					this.orderList =data||[];
					this.getlistHeight(`.swiper-box${this.current}`);
				}
			});
		},
		// 获取当前tab页有无数据
		setEmptyMessage(status) {
			if (!this.orderList.length) {
				return true;
			}
			if(this.orderList.length&&!status){
				return false;
			}
			let flag = true;
			this.orderList.forEach(item => {
				if (item.status === status) {
					flag = false;
				}
			});
			return flag;
		},

		changePage(target) {
			this.current = target;
		},
		// 获取content页面高度
		getContentHeight(select = '.content') {
			let _this = this;
			let info = uni.createSelectorQuery().select(select);
			info.boundingClientRect(function(data) {
				// console.log(data.height); // 获取元素的各种参数
				_this.contentHeight = data.height; // 获取元素高度
			}).exec();
		},
		getlistHeight(select) {
			let _this = this;
			let info = uni.createSelectorQuery().select(select);
			info.boundingClientRect(function(data) {
				// console.log(data.height); // 获取元素的各种参数
				if (data.height <= _this.contentHeight) {
					_this.listHeight = _this.contentHeight;
				} else {
					_this.listHeight = data.height; // 获取元素高度
				}
				_this.getHeight();
			}).exec();
		},
		getHeight() {
			let _this = this;
			_this.swiperHeight = _this.listHeight;
			return _this.swiperHeight;
		},
		changeTab(e) {
			let _this = this;
			this.current = e.target.current;
			// 不同的tab不同的高度赋不同的值
			_this.checked = false;
			let list = `.swiper-box${e.target.current}`;
			_this.getlistHeight(list);
		},
		changeNavbar(item) {
			this.current = item && item.id;
		}
	}
};
</script>

<style lang="less" scoped>
@import url('./index.less');
.swiper {
	// background-color: #ffffff;
	padding: 0 30upx;
}
</style>
