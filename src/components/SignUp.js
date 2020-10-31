import React, { Component } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { auth, db } from "./firebase";
import "../css/style.css";


class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
    };
    this.signUpWithGoogle = this.signUpWithGoogle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.signUp = this.signUp.bind(this)
  }

  async signUpWithGoogle() {
    try {
      const provider = await new auth.GoogleAuthProvider();
      await auth().signInWithPopup(provider);
      const currentUser = await auth().currentUser
      const userUid = await currentUser.uid
      await db.collection('favorites').doc(userUid).set({
        propertyIds: []
      })
      this.props.history.push("/");
    } catch (err) {
      console.log(err);
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.state.password.length >= 6){
      try {
        this.signUp(this.state.email, this.state.password);
        this.props.history.push("/");
        this.setState({
          email: "",
          password: ""
        })
      } catch (err) {
        this.setState({ error: err.message });
        console.log(this.state.error)
      }
    }else{
        alert("Please enter 6 digit password")
        window.location.reload();
    }
  }
  async signUp(email, password) {
    await auth().createUserWithEmailAndPassword(email, password);
    const currentUser = await auth().currentUser
    const userUid = await currentUser.uid
    await db.collection('favorites').doc(userUid).set({
      propertyIds: []
    })
  }

  render() {
    return (
      <div>
        <Container style={{ marginTop: "30px" }}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={this.handleChange}
                name="email"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <h6>Minimum 6 characters long</h6>
            <br/>
            <Button
              variant="primary"
              type="submit"
              disabled={!this.state.email || !this.state.password}
            >
              Sign up
            </Button>
          </Form>
          <br />
          <h4>or</h4>
          <br />
          <Button
            variant="danger"
            type="submit"
            onClick={this.signUpWithGoogle}
          >
            Sign up with Google
          </Button>
        </Container>
      </div>
    );
  }
}

export default Signup;
