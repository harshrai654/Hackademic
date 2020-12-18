import React from "react";
import {Row,Col} from "antd";
import BankSelector from "../Components/BankSelector";
import utils from "../utils";

class HomePage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            banks : [],
        }
    }

    componentDidMount(){
        utils.fetchBanks().then((banks)=>{
            // console.log(banks)
            this.setState({banks})
        })
    }
    
    render(){
        return(
           <Row gutter={16}>
               <Col className = "gutter-row" offset = {1} span={12}>
                    <BankSelector banks={this.state.banks}/>
               </Col>
           </Row>     
        ); 
    }
};


export default (HomePage);
