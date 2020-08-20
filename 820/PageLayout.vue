<template>
  <a-layout>
    <a-layout-header :class="[stance?'':'supplier']">
      <TopHeader />
    </a-layout-header>
    <a-layout-content>
      <!--预留占全屏宽度的内容区域-->
			<div class="switch-tab">
        <slot name="switch-tab-top"></slot>
      </div>
      <div class="hot-box">
        <slot name="hot-block"></slot>
      </div>
      <div class="switch-tab">
        <slot name="switch-tab"></slot>
      </div>
      <div class="body-content"
           :style="{ minHeight }">
        <div>
          <slot></slot>
        </div>
      </div>
      <div class="route-view">
        <transition enter-active-class="slideInRight"
                    leave-active-class="slideOutRight">
          <router-view></router-view>
        </transition>
      </div>
      <FetchLoading v-if="rLoading"></FetchLoading>
      <SideBar />
    </a-layout-content>
    <a-layout-footer>
      <p>
        <span>Copyright © 2019 浪潮世科信息技术有限公司</span>
        <a href="http://www.beian.gov.cn"
           class="link-beian"
           target="_blank">鲁ICP备18055599号-3</a>
      </p>
    </a-layout-footer>
  </a-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import TopHeader from './TopHeader';
export default {
  components: {
    TopHeader
  },
  computed: {
    ...mapGetters('windowArgs', { minHeight: 'bodyHeightInPage' }),
    ...mapGetters({ stance: 'stance' }),
    ...mapGetters('fetchLoading', { rLoading: 'rLoading' })
  }
};
</script>

<style lang="less" scoped>
@import '../assets/less/hro-theme.less';
.ant-layout {
	min-height: 100%;
	background-color: @white;
	position: relative;
	padding-top: 64px;
	.ant-layout-header {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		height: 64px;
		line-height: 64px;
		padding: 0;
		background: linear-gradient(90deg, rgba(52, 172, 150, 1) 0%, rgba(52, 172, 162, 1) 100%);
		&:not(.supplier):after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 0;
			background-size: 100% 100%;
			background-image: url(../assets/images/header_bg_img.png);
		}
		> div {
			position: relative;
			z-index: 2;
		}
		&.supplier {
			background: @white;
			box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.06);
		}
	}
	.ant-layout-footer {
		height: 88px;
		line-height: 87px;
		padding: 0;
		background-color: @white;
		border-top: 1px solid @line-color-middle;
		box-sizing: border-box;

		p,
		.link-beian {
			color: @text-color-secondary;
			font-size: 14px;
			text-align: center;

			span {
				margin-right: 40px;
			}
		}
	}
	.ant-layout-content {
		min-height: calc(100% - 152px);
		background-color: @white;
		.body-content {
			min-height: 100%;
			background-color: @background-color;
			> div {
				max-width: 1232px;
				position: relative;
				margin: 0 auto;
				overflow: hidden;
			}
		}
		.route-view {
			position: absolute;
			width: 100%;
			left: 0;
			top: 0;
			background: @background-color;
			z-index: 1000;
		}
	}
}
</style>

<style lang="less">
@import '../assets/less/hro-theme.less';
.ant-layout-content {
	.switch-tab {
		box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.06);
		background-color: rgba(255, 255, 255, 0.6);
	}
	.hot-box,
	.switch-tab {
		display: flex;
		justify-content: center;
		color: @white;

		.hro-hot-block,
		> div {
			flex: 0 1 1232px;
		}
	}
}
</style>