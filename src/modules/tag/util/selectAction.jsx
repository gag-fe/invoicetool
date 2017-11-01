import {createContainer} from 'Roof';
import { Tabs, Table, Form, Input, Row, Col, Button, Select, Icon} from 'antd';
import React from 'react';
const FormItem = Form.Item;
const Option = Select.Option;

import Utils from '../../../utils/index';
const ajax = Utils.ajax, commonUtils = Utils.common;

const SelectAction = React.createClass({
	getInitialState(){
		return {
			name:"siteName",
			key:"id",
			type: "site",
			url: "/tag/site/findSite.do",
			option: [],
			children: []
		}
	},

	_onChange(value){
		this.props.onChange(value);
	},

	componentDidMount(){
		let children = [];
		let param = {};
		let key = this.props.keys;
		let name = this.props.name;
		param[this.props.type] = JSON.stringify({});

		ajax({
			url: this.props.url? this.props.url:this.state.url,
			data: param,
			method: 'get'
		}).then(resp => {
			if (resp.success) {

				resp.data.map(item => {
					let $key = item[key];
					let $name = item[name];
					children.push(<Option key={$key}>{$name}</Option>);
				});

				console.log(children);
				this.setState({
					option: resp.data,
					children: children
				});
			}

		});
	},

	render(){
		return (<Select showSearch={false}
			style={{ width: '200px' }}
			placeholder="Please select"
			onChange={this._onChange}
			optionFilterProp="children"
			notFoundContent="无法找到"
			disabled={this.props.disabled}
			value={this.props.defaultValue}
		>
			{this.state.children}
		</Select>);

	}
});

export default SelectAction;
