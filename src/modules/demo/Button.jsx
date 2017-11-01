import React from 'react';
import {Row,Col,Button} from 'antd';

export default class Header extends React.Component{
    constructor(props){
        super(props);
        let {title,...other} = props;

        console.log(`[${title}] : in constructor`);

        this.state = {
            title : title
        }
    }

    componentWillMount(){
        let {title,...other} = this.state;
        console.log(`[${title}] : in componentWillMount`);

    }
    componentDidMount(){
        let {title,...other} = this.state;
        console.log(`[${title}] : in componentDidMount`);

    }
    componentWillReceiveProps(){
        let {title,...other} = this.state;

        console.log(`[${title}] : in componentWillReceiveProps`);

    }
    shouldComponentUpdate(){
        let {title,...other} = this.state;

        console.log(`[${title}] : in shouldComponentUpdate`);
        return true;

    }
    componentWillUpdate(){
        let {title,...other} = this.state;

        console.log(`[${title}] : in componentWillUpdate`);

    }
    componentDidUpdate(){
        let {title,...other} = this.state;

        console.log(`[${title}] : in componentDidUpdate`);
    }
    componentWillUnmount(){
        let {title,...other} = this.state;

        console.log(`[${title}] : in componentWillUnmount`);
    }
    onClick(){
      let {title} = this.state;
      this.setState({
        title : title + '1'
      });
    }

    render(){
        let {title,...other} = this.state;
        console.log(`[${title}] : in render`);
        return  <Button type="primary" onClick={this.onClick.bind(this)}>{title}</Button>
    }

}