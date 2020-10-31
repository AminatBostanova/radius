import React, { Component } from "react";
import { connect } from 'react-redux'
import { fetchProperty } from '../store/singleProperty'
import { Button, Row, Col, Container, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

var get = require('lodash.get');

//const altPropertyImage = "https://github.com/2008-GH-Capstone-team-E/radius/blob/main/public/Property_Image_PlaceHolder.png?raw=true"


class SinglePropertyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  async componentDidMount() {
      if (this.props.singleProperty.property_id !== this.props.match.params.id) {
      this.props.getSingleProperty(this.props.match.params.id)
      }
  }

  render() {
    let property = this.props.singleProperty || {}
    let price;
    let beds;
    let baths;
    let brokerTel;
    
    //for price
    if(property.price){
      price = property.price
    }else if(property.community!==undefined){
      price=property.community.price_max
    }else{
      price="unavaliable"
    }

    //for bedroom
    if(property.price){
      beds = property.beds
    }else if(property.community!==undefined){
      beds=property.community.beds_max
    }else{
      beds="unavaliable"
    }

    //for bathroom
    if(property.price){
      baths = property.baths
    }else if(property.community!==undefined){
      baths=property.community.baths_max
    }else{
      baths="unavaliable"
    }

    //for contact
    if(property.price){
      brokerTel = property.baths
    }else if(property.community!==undefined){
      brokerTel=property.community.contact_number
    }else{
      brokerTel="unavaliable"
    }
    
    // const price = get(property, 'floor_plans[0].price', 'unavailable')
    const brokerName = get(property, 'broker.name', 'unavailable')
    // const brokerTel = get(property, 'broker.phone1.number', 'unavailable')
    const address = get(property, 'address.line', 'unavailable')
    const county = get(property, 'address.county', 'unavailable')
    const zip = get(property, 'address.postal_code', 'unavailable')
    const prop_type = get(property, 'prop_type')
    const yearBuilt = get(property, 'year_built', 'unavailable')
    let description = property.description
    if(description){
      description=description.split("<br>").join("");
    }
    
    // const beds = get(property, 'beds', 'unavailable')
    // const baths = get(property, 'baths', 'unavailable')

    return (
      <div>
        { Object.keys(property).length ? 
        <Container fluid className='propertyPageContainer marginTop'>
          <Col>
            <Row><h4>Property Details</h4></Row>
              <Row>
                <Carousel>
                  {property.photos.map((photo, i) => {
                    return (
                    <Carousel.Item key={`photo${i}`} >
                      <div className='imageInCarouselContainer'>
                        <img
                          className="d-block w-100 carouselImage"
                          src={photo.href}
                          alt='property photo'
                        />
                      </div>
                    </Carousel.Item> )
                  })}
                </Carousel>
              </Row>
              <Row className='alignContentLeft'>
                <Col md={5}>
                  
                  <Row className='alignContentLeft'><b>Address:</b> &nbsp; {address}, {county}, NY,  
                  {zip}</Row>
                  <Row className='alignContentLeft'><b>Monthly: </b> &nbsp; $ &nbsp;{price}</Row>
                  <Row className='alignContentLeft'><b>Rental Type:</b> &nbsp; {prop_type}</Row>
                  <Row className='alignContentLeft'><b>Bedrooms:</b> &nbsp; {beds}</Row>
                  <Row className='alignContentLeft'><b>Bathrooms:</b> &nbsp;{baths}</Row>
                  <Row className='alignContentLeft'><b>Year Built:</b>&nbsp; {yearBuilt}</Row>
                  <Row className='alignContentLeft'> <b>Broker:</b> &nbsp;{brokerName}</Row>
                  <Row className='alignContentLeft'><b>Contact:</b>&nbsp;{brokerTel}</Row> 
                  
                </Col>
                <Col></Col>
              </Row>
              <Row style={{marginRight:"20%"}} className='alignContentLeft'><b>Description:</b>&nbsp;{description}</Row>
              
              <Row className='alignContentLeft marginBottomMed marginTop'>
                <Col sm={8}></Col>
                <Col>
                <Link to='/search'>
                  <Button variant="outline-info" size="sm">
                  back to search
                  </Button>
                </Link>
                </Col>    
              </Row>            
          </Col> 
        </Container>
        : 
        <Row className='holdPageOpen marginTopMed propertyPageContainer'> loading property details...</Row>
        }
      </div>
    );
  }
}
  
  

const mapState = state => {
  return {
    singleProperty: state.singleProperty
  }
}

const mapDispatch = dispatch => ({
  getSingleProperty: id => dispatch(fetchProperty(id))
})

export default connect(mapState, mapDispatch)(SinglePropertyPage)
