<template>
	<div class="dropdown-menu">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		mounted() {
			this.$on('close', this.closeDropdown)
		},
		methods: {
			closeDropdown() {
				this.$children.forEach(item =>{
					item.close();
				})
			}
		}
	}
</script>

<style lang="scss">
	.dropdown-menu {
		height: 100%;
		display: flex;
		overflow: auto;
		white-space: nowrap;
		align-items: center;
		font-size: 14upx;
	}
	dropdown-item {
		flex: 1;
	}
</style>
