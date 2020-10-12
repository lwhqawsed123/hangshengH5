<template>
	<view class="content">
		<view class="hearder-box">
			<!-- <view class="search-key">
				<ms-dropdown-menu><ms-dropdown-item v-model="searchKey" :list="list"></ms-dropdown-item></ms-dropdown-menu>
			</view> -->
			<text class="search-key">手机号</text>
			<view class="search-box">
				<input
					ref="value"
					type="number"
					v-model="value"
					:placeholder="'请输入' + query"
					class="search-input"
					@confirm="onConfirm"
					@keyup.enter.native="submit"
					maxlength="200"
					confirm-type="search"
				/>
				<!-- <text class="search-text" @click="submit">
					<text class="iconfont icon-search search-icon"></text>
					<text>搜索</text>
				</text> -->
			</view>
		</view>
		<view class="hearder-box verification-code-box" v-if="searchKey === 'mobileNo'">
			<!-- <view class="search-key verification-code">验证码</view> -->
			<text class="search-key">验证码</text>
			<view class="search-box">
				<input
					ref="verification-code"
					type="number"
					v-model="code"
					placeholder="请输入验证码"
					class="search-input"
					@confirm="submit"
					@keyup.enter.native="submit"
					confirm-type="search"
					:focus="isFocus"
					maxlength="6"
					@blur="onblur"
				/>
				<!-- 当 type="number"时 maxlength会失效 -->
				<!-- <input type="number" oninput="if(value.length>6)value=value.slice(0,6)" /> -->
				<view class="code-box">
					<u-verification-code :seconds="seconds" keep-running unique-key="page-search" @end="end" @start="start" ref="uCode" @change="codeChange"></u-verification-code>
					<view @tap="verifyFasong" type="default" size="mini" class="code-button" :class="disabled ? 'code-button-disabled' : ''">
						<text class="code-button-text" :class="disabled ? 'code-button-text-disabled' : ''">{{ tips }}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 提交按钮 -->
		<view class="submit-button-box" v-if="searchKey === 'mobileNo'">
			<!-- <u-button type="primary" size="mini" class="submit-button-search" @click="submit">
				<text class="iconfont icon-search search-icon"></text>
				<text>搜索</text>
			</u-button> -->
			<view class="submit-button-search" @click="submit">
				<text class="iconfont icon-search search-icon"></text>
				<text>搜索</text>
			</view>
		</view>
		<!-- 拼图验证 -->
		<tfgg-verify @result="verifyResult" ref="verifyElement"></tfgg-verify>
	</view>
</template>

<script>
import msDropdownMenu from '@/components/ms-dropdown/dropdown-menu.vue';
import msDropdownItem from '@/components/ms-dropdown/dropdown-item.vue';
import tfggVerify from '@/components/tfgg-verify/tfgg-verify.vue'; // 拼图
import { getVerificationCode } from '@/api/search.js';
import { list } from '@/api/index.js';
export default {
	components: {
		msDropdownMenu,
		msDropdownItem,
		tfggVerify
	},
	data() {
		return {
			// value: 'QCGA2008100000301', // 第一行输入框
			value: '', // 第一行输入框
			code: '', // 验证码输入框
			disabled: false, // 获取验证码按钮禁用状态
			searchKey: 'mobileNo',
			list: [
				// {
				// 	label: '订单号',
				// 	text: '订单号',
				// 	value: 'orderNo'
				// },
				{
					label: '手机号',
					text: '手机号',
					value: 'mobileNo'
				}
				// {
				// 	label: '车牌号',
				// 	text: '车牌号',
				// 	value: 'licenseNo'
				// }
			],
			// 验证码获取间隔
			seconds: 60,
			// 验证码提示信息
			tips: '',
			isFocus: false
		};
	},
	computed: {
		query() {
			let query = '';
			this.list.forEach(item => {
				if (item.value === this.searchKey) {
					query = item.label;
				}
			});
			return query;
		}
	},
	methods: {
		// 第一排输入框点击键盘发送按钮
		onConfirm() {
			// 非手机号搜索时直接进行跳转
			if (this.searchKey !== 'mobileNo') {
				this.submit();
			} else {
				// 按手机号码搜索时
				// 判断是否已输入验证码
				if (!this.code) {
					// this.$refs["verification-code"].focus()
					this.isFocus = true;
				} else {
					this.submit();
				}
			}
		},
		// 获取保单信息(临时用于验证短信验证码的正确性)
		getList() {
			let form = {
				[this.searchKey]: this.value,
				code: this.code
			};
			list(form).then(res => {
				let { data, code } = res;
				if (code === 200) {
					uni.navigateTo({
						url: `/pages/index/index?value=${this.value}&query=${this.searchKey}&code=${this.code}`
					});
				} else {
					return false;
				}
			});
		},
		submit() {
			if (!this.value.trim()) {
				return false;
			}
			if (this.searchKey === 'mobileNo' && !this.code.trim()) {
				uni.showToast({
					title: '请输入验证码',
					mark: true,
					icon: 'none'
				});
				return false;
			}
			if (this.searchKey === 'mobileNo') {
				// 临时验证短信验证码
				this.getList();
			} else {
				uni.navigateTo({
					url: `/pages/index/index?value=${this.value}&query=${this.searchKey}&code=${this.code}`
				});
			}
		},
		codeChange(text) {
			this.tips = text;
		},
		// 获取短信验证码
		getCode() {
			if (this.$refs.uCode.canGetCode) {
				// 模拟向后端请求验证码
				uni.showLoading({
					title: '正在获取验证码'
				});
				// setTimeout(() => {
				// 	uni.hideLoading();
				// 	// 这里此提示会被this.start()方法中的提示覆盖
				// 	this.myToast('验证码已发送');
				// 	// 通知验证码组件内部开始倒计时
				// 	this.$refs.uCode.start();
				// }, 2000);
				setTimeout(() => {
					// let data = {
					// 	mobileNo: this.value
					// };
					// 通知验证码组件内部开始倒计时
					this.$refs.uCode.start();
					getVerificationCode(this.value).then(res => {
						uni.hideLoading();
						let { code, data } = res;
						data = JSON.parse(data);
						if (code === 200 && data.Code === 'OK') {
							// 这里此提示会被this.start()方法中的提示覆盖
							this.myToast('验证码已发送');
						} else if (data && data.Message === '触发分钟级流控Permits:1') {
							this.myToast('操作过于频繁,请稍后再试');
						} else if (data && data.Message === '触发天级流控Permits:10') {
							this.myToast('获取短信超过当日限制');
						} else if (res.msg) {
							this.myToast(res.msg);
							if (res.code === 31001) {
								this.$refs.uCode.reset();
							}
						} else {
							this.myToast('获取验证码失败');
						}
					});
				}, 1500);
			} else {
				// this.myToast('倒计时结束后再发送');
				return false;
			}
		},
		// 验证短信验证码
		checkCode() {},
		end() {
			// this.myToast('倒计时结束');
			this.disabled = false;
		},
		start() {
			// this.myToast('倒计时开始');
			this.disabled = true;
		},
		onblur() {
			this.isFocus = false;
		},
		// 拼图滑块校验
		/* 校验结果回调函数 */
		verifyResult(res) {
			if (res) {
				this.$refs.verifyElement.reset(); //校验成功重置插件
				this.getCode();
			}
		},
		// 开启验证
		verifyFasong() {
			if (!this.value.trim()) {
				this.myToast('电话号码不能为空');
				return false;
			}
			if (!this.$refs.uCode.canGetCode) {
				return false;
			}
			this.$refs.verifyElement.show();
		},
		/* 校验插件重置 */
		verifyReset() {
			this.$refs.verifyElement.reset();
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	background: #FAF9F8;
	padding: 30upx 30upx 0 30upx;
	font-size: 28upx;
	font-weight: 500;
	line-height: 28upx;
	.hearder-box {
		display: flex;
		align-items: flex-end;
		height: 98upx;
		.search-key {
			width: 110upx;
			color: #2e2e2e;
			padding-bottom: 20upx;
		}
	}
	.submit-button-box {
		text-align: center;
		margin-top: 80upx;
		.submit-button-search {
			width: 100%;
			height: 80upx;
			background: linear-gradient(-45deg, #eb7b30, #eb8830);
			border-radius: 40upx;
			font-size: 30upx;
			line-height: 80upx;
			color: #faf7f5;
			&:active {
				opacity: 0.75;
			}
			.search-icon {
				font-size: 30upx;
				margin-right: 10upx;
			}
		}
	}
	.verification-code-box {
		margin-top: 18upx;
		.verification-code {
			line-height: 64upx;
			text-align-last: justify;
			text-align: justify;
			&::after {
				content: ' ';
				display: inline-block;
			}
		}
	}
	.search-box {
		flex: 1;
		// height: 48upx;
		display: flex;
		align-items: center;
		border-bottom: 2upx solid #e1e4f5;
		margin-left: 28upx;
		.code-box {
			// width: 160upx;
			.code-button {
				// width: 140upx;
				height: 36upx;
				background: #f5f3f0;
				border-radius: 18upx;
				text-align: center;
				line-height: 36upx;
				&:active {
					background: #f5e1c3;
				}

				.code-button-text {
					display: inline-block;
					font-size: 24upx;
					// font-weight: bold;
					color: #f07d30;
					transform: scale(0.8);
				}
				.code-button-text-disabled {
					color: #f0bd90;
				}
			}
			.code-button-disabled {
				background: none;
				&:active {
					background: none;
				}
			}
		}
	}
	.search-input {
		font-size: 24upx;
		line-height: 28upx;
		flex: 1;
		padding: 18upx 22upx;
	}
	.search-text {
		margin: 0 10upx;
		color: #777777;
		font-size: 24upx;
		line-height: 64upx;
		.search-icon {
			font-size: 24upx;
		}
	}
}
</style>
