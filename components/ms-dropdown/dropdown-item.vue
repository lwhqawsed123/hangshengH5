<template>
	<div class="dropdown-item">
		<!-- selected -->
		<view class="dropdown-item__selected" @click="changePopup">
			<slot name="title" v-if="$slots.title"></slot>
			<block v-else>
				<view class="selected__name">{{ title ? title : selectItem.text }}</view>
				<view class="selected__icon" :class="showClass === 'show' ? 'up' : 'down'"><span class="iconfont">&#xe851;</span></view>
			</block>
		</view>
		<view class="dropdown-item__content" :style="{ top: contentTop + 10 + 'px' }" v-if="showList">
			<!-- 三角标 -->
			<view class="triangle-span"></view>
			<!-- dropdown -->
			<view :class="['list', showClass]">
				<slot v-if="$slots.default"></slot>
				<block v-else>
					<view class="list__option" v-for="(item, index) in list" :key="index" @click="choose(item)">
						<view>{{ item.text }}</view>
						<text v-if="item.value === value" class="iconfont icon-duigou choosed-icon"></text>
					</view>
				</block>
			</view>
			<!-- dropdown-mask -->
			<view :class="['dropdown-mask', showClass]" v-if="showList" @click="closePopup"></view>
		</view>
	</div>
</template>

<script>
export default {
	components: {},
	props: {
		value: [Number, String, Object],
		list: {
			type: Array,
			default: function() {
				return [];
			}
		},
		title: [Number, String]
	},
	data() {
		return {
			showList: '',
			showClass: '',
			selectItem: {},
			contentTop: 0
		};
	},
	watch: {},
	mounted() {
		this.showList = this.active;
		this.list.forEach(item => {
			if (item.value === this.value) {
				this.selectItem = item;
			}
		});
		// document.addEventListener('click', e => {
		// 	//this.$el 可以获取当前组件的容器节点
		// 	if (!this.$el.contains(e.target)) {
		// 		console.log('change');
		// 		this.close()
		// 	}
		// });
	},
	methods: {
		choose(item) {
			this.selectItem = item;
			this.$emit('input', item.value);
			this.closePopup();
		},
		changePopup() {
			if (this.showList) {
				this.closePopup();
			} else {
				this.openPopup();
			}
		},
		openPopup() {
			// this.$parent  -> dropdown-menu
			this.$parent.$emit('close');
			this.showList = true;
			this.$nextTick(() => {
				this.getElementData('.dropdown-item__selected', data => {
					this.contentTop = data[0].bottom;
					this.showClass = 'show';
				});
			});
		},
		closePopup() {
			this.showClass = '';
			setTimeout(() => {
				this.showList = false;
			}, 300);
		},
		close() {
			this.showClass = '';
			this.showList = false;
		},
		getElementData(el, callback) {
			uni.createSelectorQuery()
				.in(this)
				.selectAll(el)
				.boundingClientRect()
				.exec(data => {
					callback(data[0]);
				});
		}
	}
};
</script>

<style lang="scss">
@font-face {
	font-family: 'iconfont'; /* project id 1564327 */
	src: url('https://at.alicdn.com/t/font_1564327_fcszez4n5i.eot');
	src: url('https://at.alicdn.com/t/font_1564327_fcszez4n5i.eot?#iefix') format('embedded-opentype'), url('https://at.alicdn.com/t/font_1564327_fcszez4n5i.woff2') format('woff2'),
		url('https://at.alicdn.com/t/font_1564327_fcszez4n5i.woff') format('woff'), url('https://at.alicdn.com/t/font_1564327_fcszez4n5i.ttf') format('truetype'),
		url('https://at.alicdn.com/t/font_1564327_fcszez4n5i.svg#iconfont') format('svg');
}
.iconfont {
	font-family: 'iconfont' !important;
	font-size: 24rpx;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-webkit-text-stroke-width: 0.2px;
	-moz-osx-font-smoothing: grayscale;
}
.dropdown-item {
	width: 100%;
	height: 100%;
	flex: 1;
	position: relative;
	display: flex;
	align-items: center;
	&__selected {
		height: 100%;
		position: relative;
		display: flex;
		align-items: center;
		// background: #fff;
		// padding: 30rpx;
		box-sizing: border-box;
		justify-content: center;
		.selected__name {
			font-size: 24rpx;
		}
		.selected__icon {
			margin-left: 20rpx;
			&.down {
				transition: transform 0.3s;
				transform: rotateZ(0);
			}
			&.up {
				transition: transform 0.2s;
				transform: rotateZ(-180deg);
			}
		}
	}
	&__content {
		position: fixed;
		left: 0;
		right: 0;
		// overflow: hidden;
		top: 0;
		bottom: 0;
		z-index: 999999;
		&::before {
			content: '';
			border-right: 12upx solid transparent;
			border-top: 0;
			border-bottom: 12upx solid #FFFFFF;
			border-left: 12upx solid transparent;
			position: absolute;
			left: 50upx;
			top: 0;
			margin-top: -12upx;
		}
		// .triangle-span{
		// 	position: absolute;
		// 	width: 20upx;
		// 	height: 20upx;
		// 	top: -20upx;
		// 	left: 80upx;
		// 	background-color: pink;
		// 	z-index: 20;

		// }
		.list {
			max-height: 400px;
			overflow-y: auto;
			position: absolute;
			left: 0;
			right: 0;
			z-index: 3;
			background: #fff;
			transform: translateY(-100%);
			transition: all 0.3s;
			&.show {
				transform: translateY(0);
			}
			&__option {
				font-size: 24rpx;
				padding: 20rpx 28rpx;
				display: flex;
				justify-content: space-between;
				&:not(:last-child) {
					border-bottom: 1rpx solid #dddddd;
				}
			}
		}
		.dropdown-mask {
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			transition: all 0.3s;
			z-index: 2;
			&.show {
				background: rgba(0, 0, 0, 0.5);
			}
		}
	}
	&:not(:last-child):after {
		content: ' ';
		position: absolute;
		width: 2rpx;
		top: 36rpx;
		bottom: 36rpx;
		right: 0;
		background: $uni-border-color;
	}
}
</style>
