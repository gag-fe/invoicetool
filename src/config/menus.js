//modules
import Pages from '../modules/pages/index';
import Home from '../modules/home/index';
import Demo from '../modules/demo/index';

//渠道配置
import ChannelConfig from '../modules/tag/channel-config/index';
//站点管理
import SiteManage from '../modules/tag/site/index';
//渠道管理
import ChannelManager from '../modules/tag/channel/index';
//策略配置
import StrategyConfig from '../modules/tag/strategy-config/index';
//策略管理
import StrategyManager from '../modules/tag/strategy/index';
//参数管理
import ParamManage from '../modules/tag/param/index';
//数据源管理
import DataSourceManager from '../modules/tag/data-source/index';

const menus = [{
	key: 'home',
	title: '首页',
	component: Home,
	icon: '',
	children: [{
		key: 'demo',
		title: 'demo',
		icon: '',
		component: Demo
	},{
		key: 'page',
		title: '页面',
		component: Pages,
		icon: ''
	}]
}, {
	key: 'pages',
	title: '页面',
	component: Pages,
	icon: ''
},{
	key: 'tagManage',
	title: '推送管理',
	icon: '',
	children: [{
		key: 'siteManager',
		title: '站点管理',
		component: SiteManage,
		icon: ''
	}, {
		key: 'channelManager',
		title: '渠道管理',
		component: ChannelManager,
		icon: ''
	}, {
		key: 'tagParam',
		title: '参数管理',
		icon: '',
		component: ParamManage
	}, {
		key: 'dataSourceManager',
		title: '数据源配置',
		component: DataSourceManager,
		icon: ''
	}, {
		key: 'strategyManager',
		title: '策略模板',
		component: StrategyManager,
		icon: ''
	}, {
		key: 'channelConfig',
		title: 'Tag配置',
		component: ChannelConfig,
		icon: ''
	},{
		key: 'strategyConfig',
		title: '配置策略',
		component: StrategyConfig,
		icon: ''
	}]
}];
export default menus;