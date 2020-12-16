import React from "react";
import {Select} from "antd";
const { Option } = Select;

function handleBankChange(value) {
    console.log(`selected ${value}`);
}

const BankSelector = function(props){
    return(
        <Select defaultValue="Select Bank" onChange={handleBankChange}>
            
            {props.banks.map(bank => {
                //console.log(bank);
                return(
                    <Option value={bank}>
                        {bank}
                    </Option>
                );
            })}
        </Select>
    );
}

export default BankSelector;