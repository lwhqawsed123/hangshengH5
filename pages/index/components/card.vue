<template>
	<view class="my-card" v-if="!status || order.status === status">
		<view class="card-title">
			<view class="card-title-left">
				<view class="card-title-logo"><image src="../../../static/images/logo.png" mode=""></image></view>
				<view class="license-plate">{{ order.licenseNo }}</view>
			</view>
			<view class="insurance-ownerName">
				<text class="insurance-ownerName-text">{{ order.insurerName }}</text>
			</view>
		</view>
		<view class="insurance">
			<!-- 交强险 -->
			<view class="insurance-item" hover-class="navigator-hover" @click="navigateTo(0)" v-if="order.ctpPolicyNo">
				<view class="insurance-title">
					<view class="insurance-name">
						<text class="insurance-name-title">交强险：</text>
						<text>{{ sliceTime(order.ctpStartDate) }}</text>
						<text style="margin: 0 10upx;">至</text>
						<text>{{ sliceTime(order.ctpEndDate) }}</text>
					</view>
					<text class="insurance-status">
						<text class="insurance-status-inner">{{ order.ctpPolicyStatus === '0' ? '保障中' : '已失效' }}</text>
					</text>
				</view>
				<view class="insurance-content">
					<text v-if="order.ctpPolicyStatus === '0'">距保单过期还有{{ order.ctpIndate }}天</text>
					<text v-else class="enabled-text">已失效</text>
					<view class="insurance-renewal-button" v-if="false">快速续保</view>
				</view>
			</view>
			<!-- 商业险 -->
			<view class="insurance-item" hover-class="navigator-hover" @click="navigateTo(1)" v-if="order.bizPolicyNo">
				<view class="insurance-title">
					<view class="insurance-name">
						<text class="insurance-name-title">商业险：</text>
						<text>{{ sliceTime(order.bizStartDate) }}</text>
						<text style="margin: 0 10upx;">至</text>
						<text>{{ sliceTime(order.bizEndDate) }}</text>
					</view>
					<text class="insurance-status">
						<text class="insurance-status-inner">{{ order.bizPolicyStatus === '0' ? '保障中' : '已失效' }}</text>
					</text>
				</view>
				<view class="insurance-content">
					<text v-if="order.bizPolicyStatus === '0'">距保单过期还有{{ order.bizIndate }}天</text>
					<text v-else class="enabled-text">已失效</text>
					<view class="insurance-renewal-button" v-if="false">快速续保</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		order: {
			type: Object,
			default: function() {
				return {};
			}
		},
		type: {
			type: Number,
			default: 1
		},
		status: {
			type: String
		}
	},
	data() {
		return {
			insuranceList: []
		};
	},
	created() {},
	methods: {
		navigateTo(type) {
			// type=0 交强险
			// type=1 商业险
			let { ctpPolicyStatus, bizPolicyStatus } = this.order;
			const status = type === 0 ? ctpPolicyStatus : bizPolicyStatus;
			uni.navigateTo({
				url: `/pages/insuranceDetail/insuranceDetail?orderId=${this.order.id}&type=${type}&status=${status}`
			});
		},
		// 获取剩余保单天数
		setExpiration(endDate) {
			let endTime = new Date(endDate).getTime();
			let timeNow = new Date().getTime();
			let expiration = parseInt((endTime - timeNow) / 1000 / 60 / 60 / 24);
			return expiration > 0 ? expiration : 0;
		},
		// 截取日期时间
		sliceTime(time) {
			if (!time) {
				return '';
			}
			return time.slice(0, 10);
		}
	}
};
</script>

<style lang="scss" scoped>
.my-card {
	background-color: #ffffff;
	margin-top: 30upx;
	color: #000000;
	border-radius: 8upx;
	.card-title {
		padding: 0 30upx;
		font-size: 30upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100upx;
		.card-title-left {
			display: flex;
			align-items: center;
			.card-title-logo {
				width: 50upx;
				height: 50upx;
				border-radius: 50%;
				overflow: hidden;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.license-plate {
				margin-left: 40upx;
			}
		}

		.insurance-type {
			width: 100upx;
			height: 38upx;
			line-height: 38upx;
			text-align: center;
			background-color: #f4dbd8;
			color: #ce9993;
		}
		.insurance-ownerName {
			font-size: 24upx;
			color: #2e2e2e;
			.insurance-ownerName-text {
				display: inline-block;
				font-size: 24upx;
				transform: scale(0.8);
				transform-origin: 100% 50%;
				-ms-transform-origin: 100% 50%; /* IE 9 */
				-webkit-transform-origin: 100% 50%; /* Safari 和 Chrome */
				-moz-transform-origin: 100% 50%; /* Firefox */
				-o-transform-origin: 100% 50%; /* Opera */
			}
		}
	}
	.insurance {
		font-size: 24upx;
		// padding-bottom: 26upx;
		.insurance-item {
			padding: 30upx;
			border-top: 2upx solid #eeeeee;
			.insurance-title {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 24upx;
				margin-bottom: 30upx;
				.insurance-name {
					color: #2e2e2e;
					.insurance-name-title {
						color: #666666;
						font-size: 24upx;
					}
				}
				.insurance-status {
					display: inline-block;
					width: 98upx;
					height: 36upx;
					line-height: 36upx;
					color: #faf8f5;
					border-radius: 18upx;
					font-size: 24upx;
					text-align: center;
					background: linear-gradient(-45deg, #eb7b30, #eb8830);
					.insurance-status-inner{
						display: inline-block;
						transform: scale(0.8);
					}
				}
			}
			.insurance-content {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 24upx;
				color: #fa4032;
				transform: scale(0.8);
				transform-origin: 0% 50%;
				-ms-transform-origin: 0% 50%; /* IE 9 */
				-webkit-transform-origin: 0% 50%; /* Safari 和 Chrome */
				-moz-transform-origin: 0% 50%; /* Firefox */
				-o-transform-origin: 0% 50%; /* Opera */
				.enabled-text {
					color: #777777;
				}
				.insurance-renewal-button {
					width: 140upx;
					height: 50upx;
					border-radius: 25upx;
					text-align: center;
					line-height: 50upx;
					border: 2upx solid #ea3323;
					&:active {
						background-color: #eeeeee;
					}
				}
			}
		}
	}
}
</style>
