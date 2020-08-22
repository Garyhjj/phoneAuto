<template>
  <div class="contiainer">
    <div class="tabs-container">
      <ul>
        <li
          v-for="(item, idx) in tabs"
          :key="item.title"
          :class="{ active: idx==tabIdx }"
          @click="onTabChange(idx)"
        >
          <HroIcon class="tab-icon" :type="idx | tabIcon"/>
          {{ item.title }}
          <a-badge :count="paginationList[idx].total" :key="item.name"/>
        </li>
      </ul>
    </div>
    <div class="table-container">
      <staff-common-table
        :data="list"
        :pagination="paginationList[tabIdx]"
        @change="handleTableChange"
      ></staff-common-table>
    </div>
  </div>
</template>
<script>
import { getSupplierStaff, getDemanderStaff } from '@/services/staff-services';
import { supplierStaffTableTabs, demanderStaffTableTabs } from '@/config/table-columns';

import staffCommonTable from './staffCommonTable';

const tabs = [0, 1, 2, 3];

export default {
	components: {
		staffCommonTable
	},
	props: ['searchParams'],
	data() {
		return {
			tabs: [],
			tabIdx: 0,
			list: [],
			paginationList: [],
			orderDataList: [],
			locale: { emptyText: '暂无数据' }
		};
	},
	mounted() {
		const tabs = this.tabs = this.isSupplier? supplierStaffTableTabs: demanderStaffTableTabs;
		const pagination = {
			total: 0,
			current: 1,
			pageSize: 10,
			showQuickJumper: true,
			showSizeChanger: true
		};
		const orderData = {
			sortBy: '',
			ordering: ''
		};
		this.paginationList = tabs.map(() => ({ ...pagination }));
		this.orderDataList = tabs.map(() => ({ ...orderData }));
		this.getList();
	},
	watch: {
		searchParams() {
			if(this.searchParams) {
				this.getList();
			}
		}
	},
	computed: {
		columns() {
			const { allColumn } = this;
			const notInclude = ls => allColumn.filter(c => ls.indexOf(c.title) < 0);
			switch (this.tabIdx) {
				case 0:
					return notInclude(['计费开始时间', '拒绝时间', '计费金额 (元/月)']);
				case 1:
					return notInclude(['到岗日期', '拒绝时间', '过期日期', '预估人员费用 (元/月)']);
				case 2:
					return notInclude(['到岗日期', '过期日期', '计费开始时间', '计费金额 (元/月)']);
				case 3:
					return notInclude(['到岗日期', '拒绝时间', '计费开始时间', '计费金额 (元/月)']);
				default:
					return allColumn;
			}
		},
		isSupplier() {
			return this.$store.state.stance === 0;
		}
	},
	filters: {
		tabIcon(state) {
			switch (state) {
				case 0:
					return 'icontabqiehuan_daichuli';
				case 1:
					return 'icontabqiehuan_yixuanyong';
				case 2:
					return 'icontabqiehuan_jujue';
				case 3:
					return 'icontabqiehuan_guoqi';
				default:
					return '';
			}
		}
	},
	methods: {
		onTabChange(idx) {
			if (this.tabIdx !== idx) {
				this.tabIdx = idx;
				this.list = [];
				this.getList();
			}
		},
		handleTableChange(pagination, filters, sorter) {
			const { paginationList, tabIdx, orderDataList } = this;
			paginationList[tabIdx] = { ...paginationList[tabIdx], ...pagination };
			const orderData = orderDataList[tabIdx];
			if (sorter.order) {
				orderData.sortBy = sorter.columnKey;
				orderData.ordering = sorter.order === 'ascend' ? 'ASC' : 'DESC';
			} else {
				orderData.sortBy = orderData.ordering = '';
			}
			this.getList();
		},
		getList() {
			const p = {
				...this.searchParams,
			};
			this.tabs.forEach((t, idx) => {
				const pagination = this.paginationList[idx];
				const orderData = this.orderDataList[idx];
				const req = (this.isSupplier? getSupplierStaff: getDemanderStaff)({
					page: pagination.current - 1,
					size: pagination.pageSize,
					ordering: orderData.ordering,
					sort_by: orderData.sortBy,
					...p
				}).then(({ data }) => {
					pagination.total = data.total_element;
					if (this.tabIdx === idx) {
						this.list = data.results;
					}
				});
			});
		},
	}
};
</script>
<style lang="less" scoped>
@import '../../assets/less/hro-theme.less';

.tab-active {
	height: 44px;
	line-height: 44px;
	background: @white;
	border: none;
	color: @primary-color;
	font-weight: 500;
	.tab-icon {
		color: @primary-color;
	}
	/deep/.ant-badge-count {
		background: @primary-color;
		color: @white;
	}
}
.contiainer {
	margin-top: 24px;
	.tabs-container {
		color: @text-color-body;
		width: 100%;
		height: 44px;
		margin-top: 24px;
		position: relative;
		.tab-icon {
			color: @text-color-body;
		}

		ul {
			position: absolute;
			bottom: 0;
			display: flex;
			align-items: flex-end;
		}

		li {
			margin-right: 8px;
			height: 36px;
			line-height: 36px;
			border: 1px solid @line-color;
			border-bottom: none;
			text-align: center;
			font-weight: 400;
			font-size: 14px;
			padding: 0 16px;
			transition: height 0.3s;
			cursor: pointer;
			/deep/.ant-badge-count {
				height: 16px;
				line-height: 16px;
				background: @line-color-middle;
				color: @text-color-body;
			}
		}
		li:hover {
			.tab-active;
		}
		.active {
			.tab-active;
			/deep/.ant-badge-count {
				background: @primary-color;
				color: @white;
			}
		}
	}
	.tabs-container {
		color: @text-color-body;
		width: 100%;
		height: 44px;
		margin-top: 24px;
		position: relative;
	}
}
</style>