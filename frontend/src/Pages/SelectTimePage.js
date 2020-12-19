import React from "react"
import utils from "../utils";
import {Redirect} from "react-router-dom";

class SelectTimePage extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props.location)
        if(this.props.location && this.props.location.state){
            this.state = {
                auth:true,
                ...this.props.location.state
            }
        }else{
            this.state = {
                auth:false,
                bank: {},
                date: "",
                mobile: "",
                reqId: "",
            }
        }
    }

    componentDidMount(){
        utils.verifyAuth().then(data=>{
            console.log(data)
            if(data.status){
                this.setState({
                    auth:true
                })
            }else{
                this.setState({
                    auth:false
                })
            }
        })
    }
    render(){
        return(
            <div>
                {
                    this.state.auth ? (
                        <p>NextPage</p>
                    ):(
                        <Redirect to="/" />
                    )
                }
            </div>
        )
    }
}

export default SelectTimePage;