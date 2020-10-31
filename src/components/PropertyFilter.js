import React, { Component } from 'react';
import {connect} from "react-redux";
import {fetchProperties} from "../store/allProperties";
import {Form,Button,Container,Row, Col} from "react-bootstrap"




class PropertyFilter extends Component{
    constructor(props){
        super(props)
        this.state = {
            //for properties query
            minBeds:null,
            maxPrice:null,
            reload:false,
    
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      


      handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value,
        });
      }
    
      async handleSubmit(e) {
       e.preventDefault();
        try {
          await this.props.getAllPropertiesInReact(this.state.minBeds,this.state.maxPrice);
          if (window.location.pathname === "/") {
            this.props.history.push("/search")
          }
        } catch (err) {
          console.log(err)
        }
      }

    render(){

        return (
            <Container fluid style={{padding:"20px"}}>
                <Form onSubmit={this.handleSubmit}>
                    <Row>   
                        <Col>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Control name="minBeds" type="number" placeholder="bedrooms" onChange={this.handleChange}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Control name="maxPrice" type="number" placeholder="max rental price" onChange={this.handleChange}/>
                            </Form.Group>
                        </Col>
                        <Col className='alignContentLeft'>
                            <Button
                                variant="info"
                                type="submit"
                            >
                            get properties
                            </Button>
                        </Col>
                        
                    </Row>
                </Form>
            </Container>
        )}
}


const mapState = state =>{
    return {
      propertiesInReact:state.allProperties
    }
  }
  
  const mapDispatch = dispatch => {
    return {
      getAllPropertiesInReact : (minBeds,maxPrice)=>{
        dispatch(fetchProperties(minBeds,maxPrice))
      },
    }
  }
  
  export default connect(mapState,mapDispatch)(PropertyFilter);