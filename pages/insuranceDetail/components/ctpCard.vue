<template>
	<view class="insurance-card">
		<view class="insurance-title">
			<text class="insurance-title-icon"></text>
			<text class="insurance-title-text">{{ title }}</text>
			<slot name="header-right"></slot>
		</view>
		<view class="card-form">
			<block v-for="(item, index) in formItem" :key="index">
				<view class="card-form-item" v-show="item.show || showAll">
					<view class="card-form-label">{{ item.label }}</view>
					<view class="card-form-value">
						<text v-if="!item.hasIcon">
							<text v-if="item.model2 === 'certificateType'">{{ myFilter(form[item.model][item.model1][item.model2], certificateTypeOptions) }}</text>
							<text v-else-if="item.model1 === 'startDate_endDate'">{{ sliceTime(form[item.model].startDate) + '至' + sliceTime(form[item.model].endDate) }}</text>
							<text v-else>{{ item.model2 ? form[item.model][item.model1][item.model2] : item.model1 ? form[item.model][item.model1] : form[item.model] }}</text>
						</text>
						<text v-if="item.hasIcon" @click="showAllItem(item)">
							<text class="card-form-messages" v-if="item.messages">{{ item.messages }}</text>
							<text class="card-form-messages" v-else>
								{{ item.model2 ? form[item.model][item.model1][item.model2] : item.model1 ? form[item.model][item.model1] : form[item.model] }}
							</text>
							<!-- 下箭头 -->
							<text class="iconfont icon-jiantou9 right-jiantou" v-if="!showAll"></text>
							<!-- 上箭头 -->
							<text class="iconfont icon-shangjiantou right-jiantou" v-else></text>
						</text>
					</view>
				</view>
			</block>

			<slot name="form-bottom"></slot>
		</view>
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
		formItem: {
			type: Array,
			default: function() {
				return [];
			}
		},
		rightText: {
			type: String,
			default: null
		}
	},
	data() {
		return {
			showAll: false,
			certificateTypeOptions
		};
	},
	methods: {
		showAllItem(item) {
			this.showAll = !this.showAll;
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
@import '@/styles/scss/card.scss';
</style>
