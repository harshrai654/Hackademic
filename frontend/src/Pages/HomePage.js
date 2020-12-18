import React from "react";
import {Row,Col} from "antd";
import BankSelector from "../Components/BankSelector";
import utils from "../utils";

class HomePage extends React.Component{
    constructor(props){
        super(props);

        this.setState = {
            banks : [],
        }
    }

    componentDidMount(){
        utils.fetchBanks();
    }
    
    render(){
        return(
           <Row gutter={16}>
               <Col className = "gutter-row" offset = {1} span={12}>
                    <BankSelector banks={["Bank1","Bank2","Bank3"]}/>
               </Col>
           </Row>     
        ); 
    }
};


export default (HomePage);
