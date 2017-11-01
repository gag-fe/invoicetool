import {createContainer, createRootContainer} from 'Roof';
import { Form, Input, Row, Col, Button, Select, Modal, Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;
const ButtonGroup = Button.Group;
const FormItem = Form.Item;
import React from 'react';
import Utils from '../../../utils/index';
import { If, Then, Else } from 'react-if';
import Moment from 'moment';

import OperatorType from './operatorType';
import fetchData from './fetchData.js';
const ajax = Utils.ajax, commonUtils = Utils.common;

let DATACONVERSION = {};
let DATACONVERSIONARR = [];
let DATAMETA = [];
let DATAMETAARR = [];
let renderListMeta = "";
let METANAMELIST = [];
let ALLMETAINFO = [];

let StrategyList = [{
	index: 0,
	strategyMetaName: "country",
	metaName: "country",
	operatorType: "EqualToOperator",
	compareValue: "",
	editorSate: false,
	metaType: "list"
}];

let EditorSate = false;
let ALLOPERTORINFO = {};
let METAVALUELIST = {};
const defaultData = [];
const CreateStrategy = React.createClass({
	mixins: [fetchData],
	getInitialState() {
		EditorSate = this.props.getStoreState().editorSate;
		ALLMETAINFO = this.props.getStoreState().allMetainfo;
		ALLOPERTORINFO = this.props.getStoreState().allOperatorInfo;

		ALLMETAINFO.map(item => {
			METAVALUELIST[item.metaName] = item;
		});

		return {
			loading: false,
			visible: false,
			index: 0,
			defaultValue: "GreaterThanOperator",
			strategyList: [{
				index: 0,
				strategyMetaName: ALLMETAINFO[0].metaName,
				metaName: ALLMETAINFO[0].metaName,
				operatorType: "EqualToOperator",
				compareValue: "",
				editorSate: false,
				metaType: ALLMETAINFO[0].metaType
			}],
			metaName: "",
			operatorType: "EqualToOperator",
			compareValueInput: ""
		};
	},

	_handleOk() {
		this.setState({
			loading: false,
			visible: false
		});
		this.props.setStoreState({
			visible: false,
			strategyList: this.state.strategyList
		});

		this.props.actionHandleVisible();

		this.fetchAddData();
	},

	_handleCancel() {
		this.props.setStoreState({visible: false});
		this.props.actionHandleVisible();
	},

	//ADD
	_configureOperaionAdd(){
		const defaultData = {
			compareValue: "",
			metaName: ALLMETAINFO[0].metaName,
			strategyMetaName: ALLMETAINFO[0].metaName,
			metaType: ALLMETAINFO[0].metaType,
			operatorType: "EqualToOperator",
			editorSate: false
		};

		var item = this.state.strategyList;

		item.push(defaultData);

		DATAMETAARR.push(DATAMETA);

		this.setState({
			strategyList: item
		});
		this.props.setStoreState({
			strategyList: item
		});
	},

	//DEL
	_configureOperationDel(idx){
		let  item = this.state.strategyList;

		if (item.length <= 1) {
			return false;
		}

		let temp = item.splice(idx, 1)

		this.setState({
			strategyList: temp
		});
		this.props.setStoreState({
			strategyList: temp
		});
	},
	//mate选择
	_handleMetaListType(key, idx, value, metaName){
		let tempStrategyList = {};
		let item = this.state.strategyList;
		let tempObj = {};

		tempObj["index"] = value;
		tempObj["metaName"] = DATAMETAARR[idx][value].metaName;
		tempObj["strategyMetaName"] = DATAMETAARR[idx][value].metaName;
		tempObj["operatorType"] = "GreaterThanOperator";
		tempObj["compareValue"] = item[idx]["compareValue"] || "";
		tempObj["metaType"] = DATAMETAARR[idx][value].metaType;
		tempObj["valueList"] = DATAMETAARR[idx][value].valueList;

		if (item[idx] && item[idx]["operatorType"]) {
			tempObj["operatorType"] = item[idx]["operatorType"];
		} else {
			tempObj["operatorType"] = "EqualToOperator";
		}

		item[idx] = Object.assign({}, item[idx], tempObj);

		this.setState({
			strategyList: item,
			index: idx
		});

		this.props.setStoreState({
			strategyList: item
		});
	},

	_handleValueListCheckboxGroup(key, idx, metaName, metaType, value){
		let tempObj = {};
		let item = this.state.strategyList;
		EditorSate = this.props.getStoreState().editorSate;

		if (EditorSate) {
			item = this.props.getStoreState().editorData.strategyList;
		}

		let  newValue = value;

		//ant checkbox bug
		if(value[0] == ""){
			newValue = value.slice(1);
		}

		tempObj["compareValue"] = newValue.toString();
		tempObj["strategyMetaName"] = metaName;
		tempObj["metaType"] = metaType;

		item[idx] = Object.assign({}, item[idx], tempObj);

		this.setState({
			strategyList: item,
			index: idx
		});
		this.props.setStoreState({
			strategyList: item
		});
	},

	_handleValueListSelect(key, idx, metaName, metaType, value){
		let tempObj = {};
		let item = this.state.strategyList;
		tempObj["compareValue"] = value || "";
		tempObj["strategyMetaName"] = metaName;
		tempObj["metaType"] = metaType;
		console.log("compareValue",value);
		item[idx] = Object.assign({}, item[idx], tempObj);

		this.setState({
			strategyList: item,
			index: idx
		});
		this.props.setStoreState({
			strategyList: item
		});
	},

	_handleValueListInput(key, idx, metaName, metaType, event){
		let tempObj = {};
		let item = this.state.strategyList;
		tempObj["compareValue"] = event.target.value;
		tempObj["strategyMetaName"] = metaName;
		tempObj["metaType"] = metaType;

		item[idx] = Object.assign({}, item[idx], tempObj);

		this.setState({
			strategyList: item,
			index: idx
		});

		this.props.setStoreState({
			strategyList: item
		});
	},

	//策略关系
	_handleStrategyType(key, idx, value){
		let tempObj = {};
		let item = this.state.strategyList;
		tempObj["operatorType"] = value;
		item[idx] = Object.assign(item[idx], tempObj);
		this.setState({
			strategyList: item,
			index: idx
		});

		this.props.setStoreState({
			strategyList: item
		});
	},

	_completeMetaData(){
		let len = DATACONVERSIONARR.length;
		ALLMETAINFO.map((item, idx) => {
			let temp = {};
			DATACONVERSION[item.metaName] = item;
			METANAMELIST.push(<Option value={idx}>{item.metaName}</Option>);
			DATAMETA.push(item);
		});
		DATAMETAARR.push(DATAMETA);
		DATACONVERSIONARR.push(DATACONVERSION);
	},

	componentWillReceiveProps(nextProps){
		 if (nextProps.editorSate) {
			 this.setState({
			 		strategyList: nextProps.editorData.strategyList
			 });
		 }else{
		 this.setState({
				strategyList: nextProps.addData.strategyList
			});
		 }
	 },

	render(){
		let self = this;
		let renderListMeta = [];
		EditorSate = this.props.getStoreState().editorSate;
		StrategyList = this.state.strategyList;

		if (EditorSate) {
			StrategyList.map(item => {
				DATACONVERSIONARR.push(DATACONVERSION);
			});
		}

		StrategyList.map((item, idx) => {
			if (item.compareValue == "") {
				StrategyList[idx]["editorSate"] = false;
			} else {
				StrategyList[idx]["editorSate"] = EditorSate;
			}
		});

		this._completeMetaData();

		StrategyList.map((item, idx) => {
			let renderValueList = "";
			if (StrategyList[idx] && StrategyList[idx].valueListHtml) {
				renderValueList = StrategyList[idx].valueListHtml;
			}

			renderListMeta.push(
					<Row gutter={24} data-index={idx}>
						<Col span={4}>
							<Select defaultValue={StrategyList[idx].strategyMetaName}
							        onChange={this._handleMetaListType.bind(this,'strategyMetaName',idx)}
							        disabled={StrategyList[idx]["editorSate"]}>
								{METANAMELIST}
							</Select>
						</Col>
						<Col span={2} offset={2}>
							<OperatorType index={idx} defaultValue={StrategyList[idx]["operatorType"]}
							              handleStrategyType={this._handleStrategyType}/>
						</Col>
						<Col span={6} offset={2}>
							{(function(){
									let metaValueList = METAVALUELIST[item.metaName].valueList.split(',') || "";
									let valueListItem;
									if (item.metaType == "enum") {
											let itemOption = [];
											let dataEnum = item.compareValue;

											metaValueList.map(item => {
													itemOption.push(<Option value={item}>{item}</Option>);
													});

											valueListItem = (<div><Select value={dataEnum} style={{width:120}}
											                              onChange={self._handleValueListSelect.bind(self,'compareValue', idx, item.strategyMetaName, item.metaType)}>
												{itemOption}
											</Select></div>);
											} else if (item.metaType == "list") {
											let dataList = item.compareValue.split(',');
											let defaultValue = metaValueList;

											valueListItem = (<div><CheckboxGroup value={dataList}
											                                     options={defaultValue}
											                                     onChange={self._handleValueListCheckboxGroup.bind(self,'compareValue', idx, item.strategyMetaName, item.metaType)}/>
											</div>);
											} else if (item.metaType == "normal") {
											let dataNormal = item.compareValue || "";
											valueListItem = (<div><Input value={dataNormal}
											                             name="compareValue"
											                             onChange={self._handleValueListInput.bind(self,'compareValue',idx,item.strategyMetaName, item.metaType)}/>
											</div>);
											}
									//}

									return valueListItem;
									}())}


							{renderValueList}
						</Col>
						<Col span={2} offset={2}>
							<Button onClick={this._configureOperationDel.bind(this,idx)}>删除策略</Button>
						</Col>
					</Row>);
		});

		return (<div>
			{renderListMeta}
			<Row gutter={24}>
				<Col span={12} offset={12} style={{ textAlign: 'right' }}>
					<Button onClick={this._configureOperaionAdd.bind(this,"add")}>添加策略</Button>
				</Col>

			</Row>
		</div>);
	}
});


export default createContainer({
	tableList: "tableList",
	tableSelsct: "tableSelsct",
	paramsList: "paramsList",
	addData: "addData",
	configStrategyId: "configStrategyId",
	configStrategyData: "configStrategyData",
	strategyTemplateId: "strategyTemplateId",
	editorData: "editorData",
	editorSate: "editorSate",
	accessDeny: "accessDeny",
	channelData: "channelData",
	siteData: "siteData",
	selectedRowKeys: "selectedRowKeys",
	allOperatorInfo: "allOperatorInfo",
	allMetainfo: "allMetainfo",
	strategyList: "strategyList",
	strategyTemplate: "strategyTemplate",
	channelConfig: "channelConfig"
})(CreateStrategy);
