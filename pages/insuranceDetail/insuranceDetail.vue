<template>
	<view class="content">
		<ctp-card title="基本信息" :form="form" :formItem="basicInformation" v-if="form.id"></ctp-card>
		<ctp-card :title="cardTitle" :form="form" :formItem="bindForm" :rightText="rightText" v-if="form.id && type === '0'">
			<template v-slot:header-right>
				<text class="policy-state">{{ rightText }}</text>
			</template>
			<template v-slot:form-bottom>
				<card-form-bottom :id="form.id" @openPopup="openPopup"></card-form-bottom>
			</template>
		</ctp-card>
		<biz-card :title="cardTitle" :form="form" :rightText="rightText" v-if="form.id && type === '1'">
			<template v-slot:header-right>
				<text class="policy-state">{{ rightText }}</text>
			</template>
			<template v-slot:form-bottom>
				<card-form-bottom :id="form.id" @openPopup="openPopup"></card-form-bottom>
			</template>
		</biz-card>
		<u-popup v-model="show" :mode="popupMode" :rules="rules" border-radius="10" width="80%">
			<u-form
				:model="emailForm"
				ref="uForm"
				label-position="top"
				class="email-form"
				:label-style="{ 'font-weight': 500, 'font-size': '34upx', color: '#2E2E2E' }"
				label-align="center"
				:border-bottom="false"
				:error-type="errorType"
			>
				<u-form-item label="请输入您的邮箱" :border-bottom="false" prop="email">
					<!-- <u-input ref="emailButton" v-model="emailForm.email" :clearable="false" placeholder="电子邮箱" border maxlength="200" :focus="focus" confirm-type="send" @click="inputClick($event)" @confirm="submit" @keyup.enter.native="submit"></u-input> -->
					<input
						type="text"
						v-model="emailForm.email"
						placeholder="请输入邮箱地址"
						:focus="focus"
						maxlength="200"
						class="email-input"
						@confirm="submit"
						@keyup.enter.native="submit"
						confirm-type="done"
						@focus="onFocus"
						placeholder-style="font-size:24upx"
					/>
				</u-form-item>
				<u-form-item :border-bottom="false">
					<view class="button-align" style="text-align: center;">
						<button @click="cancel" class="email-form-button email-form-cancel">取消</button>
						<button @click="submit" class="email-form-button email-form-submit">发送</button>
					</view>
				</u-form-item>
			</u-form>
		</u-popup>
	</view>
</template>

<script>
import cardFormBottom from './components/cardFormBottom.vue';
import bizCard from './components/bizCard.vue';
import ctpCard from './components/ctpCard.vue';
import { basicInformation, CLIVTAInsurance, vehicleInsurance } from '@/utils/options/insuranceOptions.js';
import { getDetail } from '@/api/index.js';
import { sendAttachmentsMail } from '@/api/insuranceDetail.js';
export default {
	components: {
		bizCard,
		ctpCard,
		cardFormBottom
	},
	data() {
		return {
			orderId: '',
			type: '0',
			status: '',

			form: {},
			cardTitle: '交强险',
			rightText: '',
			bindForm: [],
			// 基本信息
			basicInformation,
			// 交强险
			CLIVTAInsurance,
			// 商业险
			vehicleInsurance,
			show: false,
			focus: false,
			emailForm: {
				email: ''
			},
			errorType: ['toast'],
			rules: {
				email: [
					// 对name字段进行必填验证
					{
						required: true,
						message: '请输入邮箱地址',
						trigger: 'change'
					},
					{
						message: '邮箱格式错误',
						type: 'email',
						trigger: 'change'
					}
				]
			},
			popupMode: 'center'
		};
	},
	onLoad(params) {
		this.orderId = params.orderId;
		console.log(params);
		this.type = params.type;
		this.status = params.status;
		this.rightText = params.status === '0' ? '保障中' : '已失效';
		if (params.type && params.type === '0') {
			this.cardTitle = '交强险';
			this.bindForm = JSON.parse(JSON.stringify(CLIVTAInsurance));
		} else {
			this.cardTitle = '商业险';
		}
	},
	onShow() {
		this.getList();
	},
	onReady() {},
	methods: {
		// 获取保单信息
		getList() {
			getDetail(this.orderId).then(res => {
				let { data, code } = res;
				if (res && data && code === 200) {
					this.form = data;
				}
			});
		},
		// 打开邮箱弹框
		openPopup() {
			// this.emailForm.email = '';
			this.show = true;
			// this.focus = true;
			this.$nextTick(() => {
				this.$refs.uForm.setRules(this.rules);
				this.popupMode = 'center';
			});
		},
		// 提交邮箱
		submit() {
			this.$refs.uForm.validate(valid => {
				if (valid) {
					console.log('验证通过');
					this.sendEmail()
					
					// 在这里发送至邮箱
				} else {
					console.log('验证失败');
					return false;
				}
			});
		},
		// 发送电子邮箱到邮箱
		sendEmail(){
			let policyNo=""
			if(this.type==="0"){
				// 交强险
				policyNo=this.form.ctpPolicy.policyNo
			}else if(this.type==="1"){
				// 商业险
				policyNo=this.form.bizPolicy.policyNo
			}
			let data={
				email:this.emailForm.email,
				policyNo
			}
			console.log(data)
			sendAttachmentsMail(data).then(res=>{
				if(res&&res.code===200){
					uni.showToast({
						title: '发送成功'
					});
					this.show = false;
					this.emailForm.email = '';
				}
			})
		},
		cancel() {
			this.show = false;
			this.emailForm.email = '';
		},
		// 在这里执行上推页面
		onFocus(e) {
			var target = this;
			// 使用定时器是为了让输入框上滑时更加自然
			// setTimeout(function() {
			// 	target.scrollIntoView(true);
			// }, 100);
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	padding: 0 30upx;
	padding-bottom: 40upx;
}
.policy-state {
	font-size: 24upx;
	font-weight: 500;
	color: #eb7c30;
}

.email-form {
	width: 100%;
	padding: 38upx 40upx 56upx 40upx;
	box-sizing: border-box;
	.u-form-item {
		padding: 0;
	}
	.email-input {
		padding: 8upx 16upx;
		border: 2upx solid #eeeeee;
		border-radius: 6upx;
		width: 100%;
	}
	.email-input-placeholder {
		font-size: 24upx;
	}
	.email-form-button {
		display: inline-block;
		width: 200upx;
		height: 60upx;
		border: 2upx solid #999897;
		border-radius: 30upx;
		line-height: 60upx;
		text-align: center;
		font-size: 30upx;
		color: #999897;
		background-color: #FFFFFF;
		&:active{
			opacity: 0.7;
		}
	}
	.email-form-submit {
		background: linear-gradient(-45deg, #eb7a2f, #eb872f);
		color: #FAF7F5;
		border: none;
		&:active{
			color: #777777;
		}
	}
}
.button-align {
	padding-top: 48upx;
	width: 100%;
	text-align: center;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.border-bottom {
	justify-content: center;
	border-bottom: 3upx solid #d9d9d9;
}
</style>
