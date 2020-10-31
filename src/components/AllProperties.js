import React from "react";
import { Component } from "react";
import {connect} from "react-redux"
import {fetchProperties} from "../store/allProperties"



class AllProperties extends Component{
    constructor(){
        super();
        this.state = {
            zipCode:""
        }  
    this.getAllProperties=this.getAllProperties.bind(this)
    }
   

    getAllProperties(zipCode){
        this.props.getPropertyFromStore(zipCode)
    }

    render(){
        let properties = this.props.propertiesInReact
        // console.log(this.state)
        return (
            <div>
                <h1>all properties page</h1>
                <button onClick={this.getAllProperties}>Get data</button>
                {properties && properties.length>0&&properties.map((item)=>{
                    return (
                        <div key={item.property_id}>
                            <h3>address: {item.address.line}</h3>
                            <h3>Lat: {item.address.lat}</h3>
                            <h3>Lon: {item.address.lon}</h3>
                            <button>See details</button>
                            <hr/>
                        </div>
                    )
                })}
            </div>
        )
    }
}

const mapState = state =>{
    return {
        propertiesInReact:state.allProperties
    }
}

const mapDispatch = dispatch =>{
    return {
        getPropertyFromStore(){
            dispatch(fetchProperties())
        }
    }
}




export default connect(mapState,mapDispatch)(AllProperties);