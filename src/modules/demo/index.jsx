import React from 'react';
import {Row,Col} from 'antd';
import Button from './Button';

export default class Header extends React.Component{
    constructor(props){
        super(props);
    }

    render(){

        return <Row>
                  <Col span="12">
                     <Button title="lucy"/>
                  </Col>
                  <Col span="12">
                      <Button title="jack"/>
                  </Col>
                </Row>;
    }

}