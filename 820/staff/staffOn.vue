<template>
<div>
    <staff-header @change="searchParamsChange"/>
    <div class="table-container">
        <staff-table :searchParams="searchParams"></staff-table>
    </div>
</div>

</template>
<script>
import staffHeader from './staffHeader';
import staffTable from './staffTable';

export default {
    components: {
        staffHeader,
        staffTable
    },
	data() {
		return {
            searchParams: null,
		};
    },
    beforeDestroy() {
        console.log(23)
    },
	mounted() {
	},
	methods: {
        searchParamsChange(p) {
            this.searchParams = p;
        }
	}
};
</script>
<style lang="less" scoped>
@import '../../assets/less/hro-theme.less';
.table-container {
    min-height: 675px;
    max-width: 1232px;
	margin: 0 auto;
}
</style>