<template>
  <div class="container">
    <CitiesPicker :hideBottomTags="true" :isRadio="true">
      <template v-slot:label>
        <span class="label">工作地点:</span>
      </template>
      <template v-slot:hot="{city}">
        <span class="city-value">{{city.shortName}}</span>
      </template>
    </CitiesPicker>
  </div>
</template>
<script>
import CitiesPicker from '@/components/demander/CitiesPicker';

export default {
	components: {
		CitiesPicker
	},
	data() {
		return {};
	},
	mounted() {},
	methods: {}
};
</script>
<style lang="less" scoped>
@import '../../assets/less/hro-theme.less';

.container {
	padding: 8px 0 24px 0;
	.label {
		color: @text-color-body;
	}
	.city-value {
		color: @text-color;
	}
}
</style>