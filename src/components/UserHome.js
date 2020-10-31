import React, { Component } from "react";
import firebase, { auth, db } from "./firebase";
import { Link } from "react-router-dom";
import { Button, Row, Col, Container ,Card} from "react-bootstrap";
import axios from 'axios'
import "../css/style.css";

class UserFavorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inStore: false,
      moreInfoOnProperties: [],
      checking: true,
      resolvedPromise:false,
      fav:[]
    };
    this.handleRemove = this.handleRemove.bind(this)
    this.removeFromFavs = this.removeFromFavs.bind(this)
  }

  componentDidMount() {
    try {
        firebase.auth().onAuthStateChanged(async () => {
        const uid = firebase.auth().currentUser.uid;
        let docRef = db.collection("favorites").doc(uid);
        const document = await docRef.get()
        const arrFromFireStore = document.data().propertyIds

        if(arrFromFireStore === 0){
          this.setState({
            checking: false,
          })
        }else{
          this.setState({
            checking:false,
            inStore: true,
            fav:arrFromFireStore
          })
          let newArray = await Promise.all(
            arrFromFireStore.map(async (elem) => {
              let singlePropertyRes = await axios({
                method: "GET",
                url: `https://realtor.p.rapidapi.com/properties/v2/detail?property_id=${elem}`,
                headers: {
                  "content-type": "application/octet-stream",
                  "x-rapidapi-host": "realtor.p.rapidapi.com",
                  "x-rapidapi-key": process.env.REACT_APP_REALTOR_API_KEY,
                  useQueryString: true,
                }})
               return singlePropertyRes.data.properties[0];
            })
          )
          this.setState({
            resolvedPromise:true,
            moreInfoOnProperties: newArray
          })
        }
    });
    } catch (error) {
      console.log(error);
    }
  }

  handleRemove(property_id) {
    const currentUser = auth().currentUser;
    const uid = currentUser.uid
    this.removeFromFavs(uid, property_id);
  }

  async removeFromFavs(uid, property_id) {
    try {
      const removedFromFavs = await db.collection("favorites").doc(uid);
      removedFromFavs.update({
        propertyIds: firebase.firestore.FieldValue.arrayRemove(property_id)
      });
      const newArray = this.state.moreInfoOnProperties.filter(elem => elem.property_id !== property_id)
      this.setState({
        moreInfoOnProperties: newArray
      })
    } catch (err) {
      console.log(err);
    }
  }

  render() {

    const properties = this.state.moreInfoOnProperties

    function checkPrice(property) {
      if(property.price){
       return property.price
      }else if(property.community!==undefined){
        return property.community.price_max
      }else{
        return "unavaliable"
      }
    }

    function checkBedroom(property) {
      if(property.price){
        return property.beds
      }else if(property.community!==undefined){
        return property.community.beds_max
      }else{
        return "unavaliable"
      }
    }

    if(this.state.checking){
      return(
        <div className="holdPageOpen" style={({ margin: "50px" , textAlign: "center" })}>
          <h3>Please wait...</h3>
        </div>
      )
    }else{
      if(this.state.fav.length){
        //wait to resolve
        if(this.state.resolvedPromise){
          //show fav property
          return(
            <div>
                <Container fluid className="favsContainer" >
                    <Row >
                      {properties.map(property => {
                        return(
                          <Col key={property.property_id}>
                          <Card style={{width: "300px", margin:"20px "}}>
                            <Card.Img variant="top" src={property.photos[0].href} style={{width: 300, height: 300}}/>
                            <Card.Body>
                              <Card.Text>
                              <b>Address:</b>
                              {property.address.line},
                              {property.address.county}, NY,
                              {property.address.postal_code}
                              <br></br>
                              <b>Monthly: </b>$
                              {checkPrice(property)}
                              <br></br>
                              <b>Bedrooms: </b>
                              {checkBedroom(property)}
                              </Card.Text>

                              <Row>
                                <Col>
                                <Link to={`/properties/${property.property_id}`}>
                                <Button className="buttonSizer" variant="info">More Info</Button>
                              </Link>
                                </Col>

                                <Col>
                                <Button  className="buttonSizer"
                              variant="info" size="sm"
                              onClick={() => {this.handleRemove(property.property_id)}}>
                              Remove
                              </Button>
                                </Col>
                              </Row>
                            </Card.Body>
                          </Card>
                          </Col>
                        )
                      })
                      }
                    </Row>
                  </Container>
                  </div>
              )
        }else{
          return(
            <div className="holdPageOpen" style={({ margin: "50px" , textAlign: "center" })}>
            <h3> loading your favorite properties</h3>
            </div>

          )
        }
      }else{
        return(
          <div className="holdPageOpen" style={({ margin: "50px" , textAlign: "center" })}>
          <h3> No favorites yet ... Please add properties to favorites</h3>
        </div>

        )
      }
    }
    }

}
export default UserFavorites


//alternative for using Card
// (
//   <Col  className="favsCol"
//       key={property.property_id}>
//       <img src={property.photos[0].href}
//       alt="property photo"
//       style={{width: 250, height: 300}}
//       />
//       <b>Address:</b>
//       {property.address.line},
//       {property.address.county}, NY,
//       {property.address.postal_code}
//       <br></br>
//       <b>Monthly: </b>$
//       {property.price?property.price:property.community.price_max}
//       <br></br>
//       <b>Bedrooms: </b>
//       {property.price?property.beds:property.community.beds_max}
//       <br></br>
//       <Row className='marginTop'>
//       <Col>
//       <Link to={`/properties/${property.property_id}`}>
//       <Button className='buttonSizer'
//       variant="outline-info" size="sm">
//       See More Info
//       </Button>
//       </Link>
//       </Col>
//       <Col>
//       <Button className='buttonSizer'
//       variant="outline-info" size="sm"
//       onClick={() => {this.handleRemove(property.property_id)}}>
//       Remove From Favs
//       </Button>
//       </Col>
//       </Row>
//       </Col>
// )
