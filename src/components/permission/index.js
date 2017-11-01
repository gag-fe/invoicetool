'use strict';
import React from 'react';
import notifyFactory from '../notifyFactory/index';

class AuthUrl extends React.Component{
	constructor(opt) {
		super(opt);
	}
	render(){
		let {url} = this.props;
		return (<a href={url}>权限申请地址</a>);
	}
}


export default function permission(data) {
	if(data && data.accessDeny) {
		let url = data && data.authUrl;
		let urlComp = <AuthUrl url={url}/>;
		notifyFactory('error','没有权限',urlComp)();
	}
}

