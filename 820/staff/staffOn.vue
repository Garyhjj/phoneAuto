<template>
            <staff-header />

</template>
<script>
import staffHeader from './staffHeader';

export default {
    components: {
        staffHeader
    },
	data() {
		return {
		};
    },
    beforeDestroy() {
        console.log(23)
    },
	mounted() {
	},
	methods: {
	}
};
</script>
<style lang="less" scoped>
@import '../../assets/less/hro-theme.less';

</style>