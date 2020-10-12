<template>
	<view class="insurance-card">
		<view class="insurance-title">
			<text class="insurance-title-icon"></text>
			<text class="insurance-title-text">{{ title }}</text>
			<slot name="header-right"></slot>
		</view>
		<view class="card-form">
			<view class="card-form-item" v-show="baofeiShow || baoeShow">
				<view class="card-form-label">保险期间</view>
				<view class="card-form-value">
					<text>{{ sliceTime(form.bizPolicy.startDate) + '至' + sliceTime(form.bizPolicy.endDate) }}</text>
				</view>
			</view>
			<view class="card-form-item">
				<view class="card-form-label">保费</view>
				<view class="card-form-value" @click="showBaofei">
					<text class="card-form-messages">{{ form.bizPolicy.actualPremium }}</text>
					<!-- 下箭头 -->
					<text class="iconfont icon-jiantou9 right-jiantou" v-if="!baofeiShow"></text>
					<!-- 上箭头 -->
					<text class="iconfont icon-shangjiantou right-jiantou" v-else></text>
				</view>
			</view>
			<!-- 保费列表 -->
			<view class="card-form-item" v-for="(coverageItem, index) in form.bizPolicy.coverages" :key="index + '保费'" v-show="baofeiShow">
				<view class="card-form-label">{{ coverageItem.name }}</view>
				<view class="card-form-value">
					<text>{{ coverageItem.premium }}</text>
					<text>{{ coverageItem.sumInsured }}</text>
				</view>
			</view>
			<view class="card-form-item">
				<view class="card-form-label">保额</view>
				<view class="card-form-value" @click="showBaoe">
					<text class="card-form-messages">详情</text>
					<!-- 下箭头 -->
					<text class="iconfont icon-jiantou9 right-jiantou" v-if="!baoeShow"></text>
					<!-- 上箭头 -->
					<text class="iconfont icon-shangjiantou right-jiantou" v-else></text>
				</view>
			</view>
			<!-- 保额列表 -->
			<view class="card-form-item" v-for="(coverageItem, index2) in form.bizPolicy.coverages" :key="index2 + '保额'" v-show="baoeShow">
				<view class="card-form-label">{{ coverageItem.name }}</view>
				<view class="card-form-value">
					<text>{{ coverageItem.premium }}</text>
					<text>{{ coverageItem.sumInsured }}</text>
				</view>
			</view>
			<!-- 保单号 -->
			<view class="card-form-item">
				<view class="card-form-label">保单号</view>
				<view class="card-form-value">
					<text class="card-form-messages">{{ form.bizPolicy.policyNo }}</text>
				</view>
			</view>

		</view>
		<slot name="form-bottom"></slot>
	</view>
</template>

<script>
import { certificateTypeOptions } from '@/utils/options/insuranceOptions.js';
export default {
	props: {
		title: {
			type: String,
			default: '标题'
		},
		form: {
			type: Object,
			default: function() {
				return {};
			}
		},
		rightText: {
			type: String,
			default: null
		}
	},
	data() {
		return {
			certificateTypeOptions,
			baofeiShow: false,
			baoeShow: false
		};
	},
	onShow() {},
	methods: {
		showBaofei() {
			this.baofeiShow = !this.baofeiShow;
		},
		showBaoe() {
			this.baoeShow = !this.baoeShow;
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
@import "@/styles/scss/card.scss"
</style>
