import React, { Component } from "react";
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import firebase, { auth, db } from "./firebase";
import defaultPic from "../css/Property_Image_PlaceHolder.png"

var get = require('lodash.get');

//const altPropertyImage = "https://github.com/2008-GH-Capstone-team-E/radius/blob/main/public/Property_Image_PlaceHolder.png?raw=true"

class SinglePropertyBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.handleOnClick = this.handleOnClick.bind(this)
    this.addToFavs = this.addToFavs.bind(this)
    this.notifySignedIn = this.notifySignedIn.bind(this)
    this.notifyNotSignedIn = this.notifyNotSignedIn.bind(this)

  }

  handleOnClick(property_id) {
    const currentUser = auth().currentUser;
    const uid = currentUser.uid
    this.addToFavs(uid, property_id);
  }

  async addToFavs(uid, property_id) {
    try {
      const addedToFavs = await db.collection("favorites").doc(uid);
      addedToFavs.update({
        propertyIds: firebase.firestore.FieldValue.arrayUnion(property_id)
      });
    } catch (err) {
      console.log(err);
    }
  }

  notifySignedIn(){
    toast("Added to Favorites !", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  notifyNotSignedIn(){
    toast("Please sign in first !", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }


  render() {
    //console.log('This is auth() in InfoBox:' , auth())
    let property = this.props.singleProperty || {}
    // console.log("selectedProperty",property)


    let price; 
    let bedroom;
    // console.log("community?",property.community)   
    if(property.price){
      price = property.price
    }else if(property.community!==undefined){
      price=property.community.price_max
    }else{
      price="unavaliable"
    }

    if(property.price){
      bedroom = property.beds
    }else if(property.community!==undefined){
      bedroom=property.community.beds_max
    }else{
      bedroom="unavaliable"
    }
      
    const address = get(property, 'address.line', 'unavailable')
    const county = get(property, 'address.county', 'unavailable')
    const zip = get(property, 'address.postal_code', 'unavailable')
    const singlePhoto = get(property, 'photos[0].href', defaultPic) 
 

    return (
      <div>
        { Object.keys(property).length ?
        <Container>
          <Row><h4>The Basics</h4></Row>

            <Row className='imageContainerPropertyInfoBox'>
              <img src={singlePhoto} alt="property photo" className='imageInInfoBox'/>
            </Row>
             <Row className='alignContentLeft'><b>Address:</b> {address}, {county}, NY,
              {zip}</Row>
              <Row className='alignContentLeft'><b>Monthly: </b>$ {price}</Row>
              <Row className='alignContentLeft'><b>bedrooms: </b>&nbsp;{bedroom}</Row>
              <Row className='marginTop'>
                <Col>
                  <Link to={`/properties/${property.property_id}`}>
                    <Button className='buttonSizer' variant="info" size="sm">
                    See All Info
                    </Button>
                  </Link>
                </Col>
                {auth().currentUser ?
                <Col>
                    <Button className='buttonSizer' variant="info" size="sm"
                    onClick={() => {
                      this.handleOnClick(property.property_id)
                      this.notifySignedIn()
                      }}>
                    Add To Favs
                    </Button>
                    <ToastContainer />
                </Col>
                :
                <Col>
                    <Button className='buttonSizer' variant="info" size="sm"
                    onClick={() => {
                      this.notifyNotSignedIn()
                      }}>
                    Add To Favs
                    </Button>
                    <ToastContainer />
                </Col>
              }
              </Row>
        </Container>
        :
        <div className='centerSelf marginTopMed'> loading property details...</div>
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

export default connect(mapState)(SinglePropertyBox)

