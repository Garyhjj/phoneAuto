<template>
  <div class="box">
    <span class="box-left">{{label}}:</span>
    <slot name="default"></slot>
  </div>
</template>
<script>
export default {
	model: {
		event: 'change'
	},
	props: ['label', 'value', 'isMuti', 'allValue'],
	data() {
		return {
			options: [],
			val: ''
		};
	},
	mounted() {
		this.getOptions();
		this.val = this.value;
		this.updateOptionsState();
	},
	updated() {
		this.getOptions();
	},
	watch: {
		value() {
			this.updateOptionsState();
		}
	},
	methods: {
		updateOptionsState() {
			const { options } = this;
			if (this.isMuti) {
				const allValue = this.allValue || '';
				const val = this.val || [];
				const isAllValueSelected = val.indexOf(allValue) > -1;
				options.forEach(o => {
					o.selected = isAllValueSelected ? !o.value : val.indexOf(o.value) > -1;
				});
			} else {
				options.forEach(o => {
					o.selected = o.value === this.val;
				});
			}
		},
		getOptions() {
			const options = this.$slots.default.map(s => s.componentInstance).filter(c => !!c);
			this.initOptions(options);
			return (this.options = options);
		},
		initOptions(options) {
			options.forEach(o => {
				if (!o.bindedSelect) {
					o.selected = o.value === this.value;
					o.$on('click', () => {
						this.selectOption(o);
					});
					o.$watch('value', a => {
						this.updateOptionsState();
					});
					o.bindedSelect = true;
				}
			});
		},
		selectOption(option) {
			this.val = this.isMuti ? (this.val || []).concat(option.value) : option.value;
			this.updateOptionsState();
			console.log(this.val)
			this.$emit('change', this.val);
		}
	}
};
</script>
<style lang="less" scoped>
@import '../../assets/less/hro-theme.less';

.box {
	display: flex;
	height: 13px;
	line-height: 13px;
	font-size: 13px;
	font-family: PingFangSC-Regular, PingFang SC;
	margin-bottom: 20px;
	.box-left {
		color: @text-color-body;
	}
}
</style>