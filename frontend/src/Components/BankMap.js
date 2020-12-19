import React from "react";
import GoogleMapReact from "google-map-react";
import {Card} from "antd";

const BankMap = function(props){
    return(
        <Card title="Directions" style={{height:"100%",width:"100%"}}>
            {props.lat && props.lng ? (<GoogleMapReact 
                bootstrapURLKeys={{key:props.key}}
                defaultCenter={{
                    lat : props.lat,
                    lng : props.lng
                }}
                defaultZoom = {11}
            >

            </GoogleMapReact>):(
               <p>Select a bank to know its location!</p> 
            )}
        </Card>
    )
}

export default BankMap;