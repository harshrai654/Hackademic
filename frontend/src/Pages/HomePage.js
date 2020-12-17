import React from "react";
import {Row,Col,Divider,Button} from "antd";
import {RightOutlined} from "@ant-design/icons"; 
import BankSelector from "../Components/BankSelector";
import BankMap from "../Components/BankMap";
import Availability from "../Components/Availability";
import utils from "../utils";

class HomePage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            banks : [],
            bank : {},
            key : "",
            date : ""
        }

        this.onDateSelect = this.onDateSelect.bind(this);
    }

    componentDidMount(){
        utils.fetchBanks().then((banks)=>{
            // console.log(banks)
            this.setState({banks})
        })

        utils.fetchAPIkey().then(key=>{
            this.setState({key})
        })
    }
    
    handleBankChange(index){
        this.setState(prevState=>({
            bank : prevState.banks[index]
        }))
    }

    onDateSelect(date){
        this.setState({
            date: new Date(date._d)
        })
    }

    render(){
        var disbaled = !(this.state.bank && this.state.date);
        return(
            <Row justify="center" align="middle" gutter={24}>
               <Col className = "gutter-row" offset = {1} span={10}>
                    <BankSelector banks={this.state.banks} handleBankChange={(index)=>{this.handleBankChange(index)}}/>
                    <Divider/>
                    <Availability avbl = {this.state.bank.avbl} selectedDate={this.state.date} onDateSelect={this.onDateSelect}/>
               </Col>
               <Col className = "gutter-row" offset = {1} span={10}>
                    <BankMap location={{
                            lat:this.state.bank.lat,
                            lng:this.state.bank.lng,
                            key: this.state.key,
                            name : this.state.bank.name
                        }}/>
                    <Divider/>
                    <Row justify="end">
                        <Button size="large" icon={<RightOutlined />} type="primary"  disabled={disbaled}>
                            Next
                        </Button>  
                    </Row>
               </Col>
            </Row>     
        ); 
    }
};


export default (HomePage);
