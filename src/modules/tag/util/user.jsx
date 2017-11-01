import {createContainer} from 'Roof';
import { Tabs, Table, Form, Input, Row, Col, Button, Select, Icon} from 'antd';
import React from 'react';
const FormItem = Form.Item;
const Option = Select.Option;

import Utils from '../../../utils/index';
const ajax = Utils.ajax, commonUtils = Utils.common;

const API = {
	BUC : '/tag/user/SearchEmployeeInfo.do',
};
let personData = [];
const User = React.createClass({
	getInitialState(){
		return {
			interfacePersonList: [{
				empId: "",
				lastName:  ""
			}]
		}
	},

	_onSelect(value, option){
		let interfacePersonList = {};
		interfacePersonList['userId'] = value;
		interfacePersonList['userName'] = option.props.children;
		this.props.onChange(interfacePersonList);
	},

	_onChange(value){
		let temp = {};
		temp["empId"] = value.key;
		temp["lastName"] = value.label;

		if(personData.length > 0){
			personData.map((item,idx) => {
				if(temp.empId != item.empId){
					personData.push(temp);
				}
			});
		}else{
			personData.push(temp);
		}

		this.props.onChange(personData);
	},

	_onSearch(value) {
		setTimeout(function(){
			let _self = this;
			ajax({
				url: API.BUC,
				data: {"query":value},
				method: 'get'
			}).then(resp => {
				if (resp.success && resp.data.items.length > 0) {
					_self.setState({
						userList: resp.data.items
					});
				}

			});
		},500);
	},

render(){
		let children = [];
		this.state.userList.map(item => {
			children.push(<Option key={item.empId}>{item.lastName}</Option>);
		});
		return (<Select
				tags
				labelInValue
				placeholder="Please select"
				style={{ width: '100%' }}
				onSelect={this._onChange}
				onSearch={this._onSearch}
				disabled={this.props.disabled}
		>
			{children}
		</Select>);

	}
});

export default User;
