import '../common/lib';
import Index from '../components/index/Index';
import ReactDOM from 'react-dom';
import React from 'react';
import './index.less';
import Utils from '../utils/index';

const ajax = Utils.ajax, login = Utils.common.login;

//modules
import menus from '../config/menus';
import Home from '../modules/home/index';
import Cookies from 'js-cookie';

window.Domain = '.test.goago.cn';
window.API = {
    'DATAURL' : 'http://data' + window.Domain + ':8080' + '/init.json'
};

window.COOKIES_INFO = {};
        COOKIES_INFO['token'] = Cookies.get('com.gooagoo.passpart.sso.token.name') || 'undefined';
		COOKIES_INFO['user_data'] = {};

(function(){
    ajax({
        url: API.DATAURL,
        data:{
            sso_token:COOKIES_INFO.token
        },
        method: 'get'
    }).then(resp => {
        if(resp.status === 'S'){
            let data = resp.data;
            Cookies.set('now_username', data.userName, { path: '/' });
            Cookies.set('now_shopid', data.shopId, { path: '/' });
            Cookies.set('user_data', JSON.stringify(data), { path: '/' });
            COOKIES_INFO['user_data'] = data;
        }else{
            login();
        }
    }).catch(err => {
        login();
    });
})();

const props = {
    menus: menus,
    domain: window.Domain,
    suffix: '.html',
    mode: 'horizontal',
    indexComponent: Home,
    user: {
        name: COOKIES_INFO.user_data.userName
    },
    name: 'GOOAGOO.COM',
    footer: '@2016 GOOAGOO.COM'
};

ReactDOM.render(<Index {...props}/>, document.getElementById('react-content'));
