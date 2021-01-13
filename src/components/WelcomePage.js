import React, { Component } from 'react'
import { Container, Row, Card, Col } from "react-bootstrap"
import newyork from "../css/newyork.png";
import PropertyFilter from './PropertyFilter'

export class WelcomePage extends Component {
  constructor(props) {
    super(props)
    this.state= {}
  }

  render() {
    return (
    <Container fluid='true' className='noPadding'>
      <Card fluid='true' className='noPadding'>
        <Card.Body id='killBorder'>
          <Card.Img  src={newyork} alt=''/>
            <Card.ImgOverlay className='noPadding'>
              <Card.Title className='marginTop text text-center'>Radius offers a look at current rental listings in NYC and their surrounding amenities. </Card.Title>
              <Card.Text className='text text-center'>Find out what's around...</Card.Text>
              <Row>
                <Col sm={2}></Col>
                <Col sm={8}><PropertyFilter history={this.props.history}/></Col>
                <Col sm={2}></Col>
              </Row>
            </Card.ImgOverlay>
        </Card.Body>
      </Card>
    </Container>
  )
  }
}

