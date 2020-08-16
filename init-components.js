import Vue from 'vue';
import { Icon } from 'ant-design-vue';

import PageLayout from '@/layout/PageLayout';
import CentralLayout from '@/layout/CentralLayout';
import Perch from '@/components/skeleton/Perch';
import HiddenInput from '@/components/skeleton/HiddenInput';
import HroButton from '@/components/Button';
import FetchLoading from '@/components/FetchLoading';
import SearchSelect from '@/components/search-select/Select';
import SearchSelectOption from '@/components/search-select/Option';

const components = {
	PageLayout,
	HiddenInput,
	HroButton,
	FetchLoading,
	Perch,
	CentralLayout,
	SearchSelect,
	SearchSelectOption
};

/**
 * Auth： Sandy
 * mod-Date： 2020-6-30
 * 以下： 小心维护核心组件化
 */
Object.keys(components).map(c => Vue.component(c, components[c]));
Vue.component('HroIcon', {
	functional: true,
	render: (cE, { data }) => {
		const HroIcon = Icon.createFromIconfontCN({
			scriptUrl: '//at.alicdn.com/t/font_1974197_liirdl2s688.js',
			extraCommonProps: { ...data, fill: 'currentColor' }
		});
		return cE(HroIcon, data);
	}
});
