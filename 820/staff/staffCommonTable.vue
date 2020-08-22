<template>
  <a-table
    :columns="columns"
    :data-source="data"
    :row-key="record => record.id"
    :scroll="{ x: 1500 }"
    :pagination="pagination"
    :locale="locale"
    @change="handleTableChange"
  >
    <template v-slot:date="val">{{val | date('YYYY/mm/dd')}}</template>
    <template v-slot:time="val">{{val | date('YYYY/mm/dd HH:MM')}}</template>
    <template v-slot:city="val">{{val | cityShortName }}</template>
    <template v-slot:sex="val">
      <HroIcon
        :type="val===1? 'iconnan': val===2?'iconnv': ''"
        class="sex-icon"
        :class="{'sex-icon-male': val===1}"
      ></HroIcon>
      {{val===1? ' 男': val===2?' 女': ''}}
    </template>
    <span slot="avatar" slot-scope="val,record">
      <img :src="resumeImg" v-img-lazy="record.avatar.inline_uri" class="avatar">
      {{val}}
    </span>
    <span slot="action" slot-scope="text,record">
      <template v-if="record">
        <a @click="release(record)" v-if="record.state === 0">
          <HroIcon type="iconchakan"/>释放
        </a>
        <a @click="releaseConfirm(record)" v-else-if="record.state === 1">
          <HroIcon type="iconchakan"/>确认释放
        </a>
        <a @click="renewConfirm(record)" v-else-if="record.state === 4">
          <HroIcon type="iconchakan"/>确认续期
        </a>
      </template>
    </span>
  </a-table>
</template>
<script>
import { supplierStaffColumns, demanderStaffColumns } from '@/config/table-columns';

export default {
	props: ['data', 'pagination'],
	data() {
		return {
			locale: { emptyText: '暂无数据' }
		};
	},
	computed: {
		columns() {
			const isSupplier = this.$store.state.stance === 0;
			const columns = isSupplier ? supplierStaffColumns : demanderStaffColumns;
			const actionCol = { title: '操作', key: 'operation', fixed: 'right', width: isSupplier ? 100 : 200, scopedSlots: { customRender: 'action' } };
			return [...columns, actionCol];
		},
		isSupplier() {
			return this.$store.state.stance === 0;
		}
	},
	methods: {
		handleTableChange(pagination, filters, sorter) {
			this.$emit('change', pagination, filters, sorter);
		},
		release(data) {},
		releaseConfirm(data) {},
		renewConfirm(data) {}
	}
};
</script>
<style lang="less" scoped>
@import '../../assets/less/hro-theme.less';

.sex-icon {
	color: @icon-color-error;
	&.sex-icon-male {
		color: @icon-color-blue;
	}
}
.avatar {
	height: 32px;
	width: 32px;
	border-radius: 32px;
	margin-right: 6px;
}
</style>