<template>
  <div class="container">
    <div class="container-box">
      <CitiesPicker
        :hideBottomTags="true"
        :isRadio="true"
        @selectedCities="selectCity"
        :initCities="initCities"
        v-if="!hideCityPicker"
      >
        <template v-slot:label>
          <span class="label">工作地点:</span>
        </template>
        <template v-slot:hot="{city}">
          <span class="city-value">{{city.shortName}}</span>
        </template>
      </CitiesPicker>
      <div class="select-box">
        <div class="label">更多条件:</div>
        <a-select
          class="select"
          placeholder="人员姓名"
          :allowClear="true"
          v-model="searchParams.name"
          @change="changeSearchOpts"
        >
          <a-select-option v-for="item in nameOpts" :key="item" :value="item">{{item}}</a-select-option>
        </a-select>
        <a-select
          class="select"
          placeholder="岗位名称"
          :allowClear="true"
          v-model="searchParams.job_name"
          @change="changeSearchOpts"
        >
          <a-select-option v-for="item in jobOpts" :key="item" :value="item">{{item}}</a-select-option>
        </a-select>
        <a-select
          class="select select-last"
          placeholder="供应方名称"
          v-if="isSupplier"
          :allowClear="true"
          v-model="searchParams.supplier_name"
          @change="changeSearchOpts"
        >
          <a-select-option v-for="item in supplierNameOpts" :key="item" :value="item">{{item}}</a-select-option>
        </a-select>
        <a-select
          class="select select-last"
          placeholder="需求方名称"
          v-else
          :allowClear="true"
          v-model="searchParams.demander_name"
          @change="changeSearchOpts"
        >
          <a-select-option v-for="item in demanderNameOpts" :key="item" :value="item">{{item}}</a-select-option>
        </a-select>
        <HroButton pattern="sub" size="medium" @click="clearAll">清空</HroButton>
      </div>
      <div class="group-box" :class="{'group-box-hided': !groupOptsVisible}">
        <div class="group-opts" v-if="groupOptsVisible">
          <span v-for="(item, index) in groupOpts" :key="item.prop">
            <span
              class="group-opt"
              :class="{'group-opt-selected': item.prop === searchParams.group_by}"
              @click="changeGroupBy(item.prop)"
            >{{item.value}}</span>
            <a-divider type="vertical" class="divide" v-if="index !== groupOpts.length - 1"/>
          </span>
        </div>
        <div class="group-icon" @click="toggleGroupOpts"></div>
      </div>
    </div>
  </div>
</template>
<script>
import CitiesPicker from '@/components/demander/CitiesPicker';

const groupOpts = [
	{ prop: '', value: '不分组' },
	{ prop: '2', value: '岗位分组' }
];

export default {
	components: {
		CitiesPicker
	},
	props: ['hideCityPicker'],
	data() {
		return {
			nameOpts: ['李开发'],
			jobOpts: ['软件工程师'],
			supplierNameOpts: ['wegweg'],
			demanderNameOpts: ['wegweg'],
			groupOpts,
			initCities: [],
			groupOptsVisible: false,
			searchParams: {
				name: '',
				job_name: '',
				city: '',
				group_by: '',
				supplier_name: '',
				demander_name: ''
			}
		};
	},
	mounted() {
		this.getSelectOpts();
	},
	computed: {
		isSupplier() {
			return this.$store.state.stance === 0;
		}
	},
	methods: {
		getSelectOpts() {
			// TODO wait for API
		},
		selectCity({ id }) {
			this.searchParams.city = id;
			this.changeSearchOpts();
		},
		changeGroupBy(val) {
			this.searchParams.group_by = val;
			this.groupOptsVisible = false;
			this.changeSearchOpts();
		},
		toggleGroupOpts() {
			this.groupOptsVisible = !this.groupOptsVisible;
		},
		clearAll() {
			const { searchParams } = this;
			Object.keys(searchParams).forEach(k => {
				searchParams[k] = '';
			});
			this.initCities = [];
			this.changeSearchOpts();
		},
		changeSearchOpts() {
			const params = { ...this.searchParams };
			Object.keys(params).forEach(k => {
				if (!params[k]) {
					delete params[k];
				}
			});
			this.$emit('change', params)
		}
	}
};
</script>
<style lang="less" scoped>
@import '../../assets/less/hro-theme.less';

.container {
	background-color: @white;
	margin-top: 4px;
	.container-box {
		position: relative;
		max-width: 1232px;
		padding: 4px 0 24px 0;
		margin: 0 auto;
	}
	.label {
		display: inline-block;
		font-size: 14px;
		color: @text-color-body;
	}
	.city-value {
		color: @text-color;
	}
	.select-box {
		margin-top: 20px;
		.label {
			margin-right: 24px;
		}
		.select {
			width: 240px;
			margin-right: 16px;
			/deep/ .ant-select-selection {
				border: none;
				background-color: @line-color;
			}
			&.select-last {
				margin-right: 64px;
			}
		}
	}
	.group-box {
		position: absolute;
		bottom: -16px;
		right: 16px;
		display: inline-block;
		height: 32px;
		color: @text-color-body;
		font-size: 12px;
		line-height: 32px;
		border-radius: 32px;
		padding: 0 48px 0 16px;
		background-color: @line-color-middle;
		&.group-box-hided {
			background-color: transparent;
		}
		.group-opt {
			cursor: pointer;
			&.group-opt-selected {
				color: @text-color;
			}
		}
		.divide {
			height: 12px;
			color: @line-color-hight;
			margin: 0 8px;
		}
		.group-icon {
			position: absolute;
			height: 32px;
			width: 32px;
			border-radius: 32px;
			top: 0;
			right: 0;
			background-color: @icon-color-blue;
			cursor: pointer;
		}
	}
}
</style>