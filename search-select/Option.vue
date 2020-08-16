<template>
  <span
    v-if="$slots.default"
    class="item"
    :class="{'item-selected': selected}"
    @click="afterClick($event)"
  >
    <slot></slot>
  </span>
</template>
<script>
export default {
	props: ['value'],
	data() {
		return {
			selected: false,
		};
	},
	methods: {
		afterClick(e) {
			this.$emit('click', e);
		},
	}
};
</script>
<style lang="less" scoped>
@import '../../assets/less/hro-theme.less';

.item {
	margin-left: 32px;
	color: @text-color;
	cursor: pointer;
	&.item-selected {
		color: @radio-selected;
	}
}
</style>