import React from "react";
import {Row,Col} from "antd";
import BankSelector from "../Components/BankSelector";
import BankMap from "../Components/BankMap";
import utils from "../utils";

class HomePage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            banks : [],
            bank : {},
            key : ""
        }
    }

    componentDidMount(){
        utils.fetchBanks().then((banks)=>{
            // console.log(banks)
            this.setState({banks})
        })

        utils.fetchBanks().then(key=>{
            this.setState({key})
        })
    }
    
    handleBankChange(index){
        this.setState(prevState=>({
            bank : prevState.banks[index]
        }))
    }

    render(){
        return(
           <Row gutter={16}>
               <Col className = "gutter-row" offset = {1} span={10}>
                    <BankSelector banks={this.state.banks} handleBankChange={(index)=>{this.handleBankChange(index)}}/>
               </Col>
               <Col className = "gutter-row" offset = {1} span={10}>
                    <BankMap location={{
                            lat:this.state.bank.lat,
                            lng:this.state.lng,
                            key: this.state.key
                        }}/>
               </Col>
           </Row>     
        ); 
    }
};


export default (HomePage);
