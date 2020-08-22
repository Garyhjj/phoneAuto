<template>
  <PageLayout class="container">
    <template #switch-tab-top>
      <div class="tab">
        <span
          class="item-left"
          @click="switchTab(1)"
          :class="{'item-selected': currentTab === 1}"
        >计费人员</span>
        <span
          class="item-right"
          @click="switchTab(2)"
          :class="{'item-selected': currentTab !== 1}"
        >离岗人员</span>
      </div>
    </template>
      <div class="tab-content">
        <transition name="component-fade" mode="out-in">
          <keep-alive>
            <component :is="currentComponent"/>
          </keep-alive>
        </transition>
      </div>
  </PageLayout>
</template>
<script>
import staffOn from './staffOn';
import staffOff from './staffOff';

const TAB1 = 'staffOn';
const TAB2 = 'staffOff';
export default {
	components: {
		[TAB1]: staffOn,
		[TAB2]: staffOff
	},
	data() {
		return {
			currentTab: 1,
			currentComponent: ''
		};
	},
	mounted() {
		this.switchTab(this.currentTab);
	},
	methods: {
		switchTab(idx) {
			this.currentTab = idx;
			this.currentComponent = idx === 1 ? TAB1 : TAB2;
		}
	}
};
</script>
<style lang="less" scoped>
@import '../../assets/less/hro-theme.less';
.container {
	/deep/ .body-content {
		min-height: none !important;
		>div {
			max-width: none !important;
			width: 100%;
		}
	}
}
.tab {
	width: 100vw;
	height: 64px;
	color: @text-color;
	font-size: 16px;
	line-height: 64px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	.item-left {
		margin: 0 40px 0 24px;
		cursor: pointer;
	}
	.item-right {
		cursor: pointer;
	}
	.item-selected {
		color: @radio-selected;
		cursor: auto;
	}
}

.component-fade-enter-active,
.component-fade-leave-active {
	transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
	opacity: 0;
}
</style>