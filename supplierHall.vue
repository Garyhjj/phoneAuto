<template>
  <PageLayout>
    <template v-slot:hot-block>
      <div class="hro-hot-block">
        <div class="header">
          <a-input-search
            class="search-input"
            size="large"
            placeholder="请输入岗位名称"
            @search="onSearch"
          >
            <a-button slot="enterButton" class="btn">
              <HroIcon type="iconsousuo" class="icon"/>
            </a-button>
          </a-input-search>

          <div class="select-box">
            <div class="condition">
              <div class="condition-left">工作地点:</div>
              <div class="condition-right">
                <div
                  class="right-item"
                  :class="{'item-selected': item.selected}"
                  v-for="item in jobCities"
                  :key="item.property"
                  @click="selectCity(item.property, item)"
                >{{item.value}}</div>
              </div>
            </div>
			<search-select label="工作地点" v-model="selectedCities" @change="getList" isMuti="true">
              <search-select-option
                :value="item.property"
                v-for="item in jobCities"
                :key="item.property"
              >{{item.value}}</search-select-option>
            </search-select>
            <search-select label="结算频率" v-model="selectedPayPeriod" @change="getList">
              <search-select-option
                :value="item.property"
                v-for="item in payPeriods"
                :key="item.property"
              >{{item.value | jobPayPeriod}}</search-select-option>
            </search-select>
            <search-select label="岗位周期" :value="jobPeriods[0].property" @change="selectPeriod">
              <search-select-option
                :value="item.property"
                v-for="item in jobPeriods"
                :key="item.value"
              >{{item.value}}</search-select-option>
            </search-select>
          </div>
        </div>
      </div>
    </template>
    <div class="list-container">
      <a-row type="flex" justify="space-between" class="list-data">
        <a-col :span="8" v-for="job in list" :key="job && job.id">
          <div class="person-card" v-if="job && job.id" @click="goToDetails(job)">
            <div class="header">
              <div class="title">
                <span class="name">{{job.name}}</span>
                <a-divider
                  type="vertical"
                  v-if="job.cities && job.cities.length > 0"
                  class="divide"
                />
                <span>{{job.cities | cityShortName}}</span>
                <a-divider type="vertical" v-if="job.people_num" class="divide"/>
                <span>{{job.people_num}}人</span>
              </div>
              <div class="desc">
                <span class="salary-text">人员费用范围</span>
                <span class="salary-content">
                  <span class="salary-range">¥ {{job.salary_min}}-{{job.salary_max}}</span>
                  <span class="month">
                    <span>/</span>
                    <span class="text">月</span>
                  </span>
                </span>
                <span class="more">
                  <span class="text">已选用:</span>
                  <span class="content">{{job.accept_count}} 人</span>
                </span>
              </div>
            </div>
            <div class="middle">
              <div class="item one">
                <div class="item-content">
                  <div class="value">{{job.period | jobPeriod}}</div>
                  <div class="name">岗位周期</div>
                </div>
              </div>
              <div class="item">
                <div class="item-content">
                  <div class="value">{{job.pay_period | jobPayPeriod}}</div>
                  <div class="name">结算频率</div>
                </div>
              </div>
              <div class="item">
                <div class="item-content">
                  <div class="value">{{job.pay_in_monthshs}}个月</div>
                  <div class="name">付款时间</div>
                </div>
              </div>
            </div>
            <div class="bottom">
              <div class="text">
                <div class="name">{{job.contact_name}}</div>
                <span class="bu">{{job.corporation_name}}-{{job.organization_shortcut}}</span>
                <span
                  class="time"
                >{{ (job.modify_time || job.create_time ) | date('YYYY-mm-dd HH:MM')}}</span>
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
      <div class="data-pagination" v-if="list && list.length > 0">
        <a-pagination
          show-quick-jumper
          :page-size-options="pageSizeOptions"
          v-model="page"
          :total="totalData"
          @change="onPageChange"
          show-size-changer
          :page-size="size"
          @showSizeChange="onShowSizeChange"
        >
          <template slot="buildOptionText" slot-scope="props">
            <span>{{ props.value }}条/页</span>
          </template>
        </a-pagination>
      </div>
    </div>
  </PageLayout>
</template>
<script>
import { Cities } from '@/config/area-cities';
import { getJobs } from '@/services/job-services';
import { jobCities, payPeriods, jobPeriods } from '@/config/filter-options';

export default {
	data() {
		return {
			jobCities,
			selectedCities: [''],
			payPeriods,
			selectedPayPeriod: '',
			jobPeriods,
			periodMin: '',
			periodMax: '',
			size: 9,
			page: 1,
			totalData: 0,
			list: [],
			jobName: '',
			pageSizeOptions: ['9', '12', '15', '18']
		};
	},
	mounted() {
		this.getList();
	},
	methods: {
		onSearch(name) {
			this.jobName = name;
			this.getList();
		},
		selectCity(id, option) {
			const selected = [];
			const { selectedCities } = this;
			if (id) {
				if (option.selected) {
					this.selectedCities = selectedCities.filter(i => i !== id);
				} else {
					selectedCities.push(id);
				}
				option.selected = !option.selected;
			} else {
				this.jobCities.forEach(c => (c.selected = c.property === id));
				this.selectedCities = [];
			}
			this.getList();
		},
		selectPayPeriod(id) {
			this.payPeriods.forEach(c => {
				c.selected = c.property === id;
				if (c.selected) {
					this.selectedPayPeriod = c.property;
					this.getList();
				}
			});
		},
		selectPeriod(property) {
			this.periodMin = property.min;
			this.periodMax = property.max;
			this.getList();
		},
		onPageChange(page, pageSize) {
			this.page = page;
			this.getList();
		},
		onShowSizeChange(current, pageSize) {
			this.page = 1;
			this.size = pageSize;
			this.getList();
		},
		getList(params) {
			const p = {
				pay_period: this.selectedPayPeriod,
				page: this.page - 1,
				size: this.size,
				cities: this.selectedCities,
				name: this.jobName,
				period_max: this.periodMax,
				period_min: this.periodMin,
				...params
			};
			getJobs(p).then(({ data }) => {
				this.totalData = data.total_element;
				const list = data.results;
				while (list.length % 3 !== 0) {
					list.push(null);
				}
				this.list = list;
			});
		},
		goToDetails(item) {
			this.$router.push({
				path: '/supplier/details',
				query: {
					id: item.id
				}
			});
		}
	}
};
</script>
<style lang="less" scoped>
@import '../../assets/less/hro-theme.less';

.header {
	margin-top: 24px;
	.search-input {
		width: 480px;
		.btn {
			width: 64px;
			background-color: @primary-color;
			border: 1px solid @primary-color;
			.icon {
				color: @white;
				width: 18px;
				height: 18px;
			}
		}
	}
}
.select-box {
	position: relative;
	font-size: 13px;
	margin-top: 26px;
	padding-bottom: 24px;
	.condition {
		display: flex;
		margin-top: 22px;
		.condition-left {
			color: rgba(96, 98, 102, 1);
			height: 13px;
			font-size: 13px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(96, 98, 102, 1);
			line-height: 13px;
			margin-right: 32px;
		}
		.condition-right {
			display: flex;
			.right-item {
				height: 13px;
				margin-right: 32px;
				font-size: 13px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: @text-color;
				line-height: 13px;
				cursor: pointer;
				&.item-selected {
					color: @radio-selected;
				}
			}
		}
	}
}
.list-container {
	width: 100%;
	.list-data {
		min-width: 1230px;
	}
	.data-pagination {
		width: 100%;
		text-align: center;
		margin-top: 32px;
		margin-bottom: 32px;
	}
}

.person-card {
	height: 245px;
	width: 400px;
	background-color: @white;
	cursor: pointer;
	.header {
		color: @text-color;
		padding: 16px 13px 0 16px;
		.title {
			font-size: 14px;
			.divide {
				height: 14px;
				color: @line-color;
			}
		}
		.name {
			font-size: 16px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
		}
		.desc {
			margin-top: 16px;
			.salary-text {
				display: inline-block;
				width: 84px;
				height: 20px;
				font-size: 13px;
				line-height: 20px;
				text-align: center;
				color: @white;
				margin-right: 8px;
				background-color: @warning-color;
			}
			.salary-content {
				color: @warning-color;
				font-size: 14px;
				font-family: DINAlternate-Bold, DINAlternate;
				.salary-range {
					display: inline-block;
					transform: translateY(2px);
					font-size: 20px;
					font-weight: bold;
				}
				.month {
					display: inline-block;
					font-size: 14px;
					font-weight: 400;
					margin-left: 4px;
					.text {
						display: inline-block;
						transform: translateY(1px);
					}
				}
			}
		}
		.more {
			float: right;
			transform: translateY(5px);
			.text {
				display: inline-block;
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				margin-right: 6px;
			}
			.content {
				color: #34ac96;
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
			}
		}
	}
	.middle {
		width: 100%;
		margin-top: 20px;
		font-size: 14px;
		.item {
			&.one {
				border-left: none;
			}
			display: inline-block;
			width: 33.3%;
			height: 68px;
			border-left: 1px solid @line-color;
		}
		.item-content {
			display: flex;
			height: 68px;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			font-weight: 400;
			.value {
				color: @text-color;
			}
			.name {
				color: @text-color-body;
				margin-top: 16px;
			}
		}
	}
	.bottom {
		position: relative;
		height: 78px;
		padding: 0 16px;
		.text {
			height: 78px;
			line-height: 14px;
			.name,
			.bu {
				font-size: 14px;
				color: @text-color-secondary;
			}
			.name {
				height: 14px;
				color: @text-color-body;
				margin: 16px 0;
			}
			.time {
				float: right;
				font-size: 12px;
				color: @text-color-placeholder;
			}
		}
	}
}
</style>