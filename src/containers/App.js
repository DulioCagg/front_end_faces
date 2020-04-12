import React, { Component, Fragment } from 'react';
import Navigation from "../components/Navigation"
import Logo from "../components/Logo"
import ImageLinkForm from "../components/ImageLinkForm"
import FaceRecognition from "../components/FaceRecognition"
import Rank from "../components/Rank"
import SignIn from "../components/SignIn"
import Register from "../components/Register"
import '../styles/App.css';

const defaultState = {
  input: "",
  imageURL: "",
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = defaultState;
  }

  onRouteChange = (route) => {
    this.setState({ route: route });
    if (route === "signeout") {
      this.setState(defaultState)
    } else if (route === "home") {
      this.setState({ isSignedIn: true })
    }
  }

  loadUser = (user) => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined
      }
    })
  }

  faceLocation = (data) => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('img');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - (face.right_col * width),
      bottomRow: height - (face.bottom_row * height),
    }
  }

  displayBox = (box) => {
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onSearch = () => {
    console.log("The current id is: ", this.state.user.id)
    this.setState({ imageURL: this.state.input });
    fetch("https://still-oasis-27712.herokuapp.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch("https://still-oasis-27712.herokuapp.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            })
          })
            .then(res => res.json())
            .then(count => {
              console.log(count);
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(err => console.log("Error fetching the image: " + err))
        }
        this.displayBox(this.faceLocation(response))
      })
      .catch(err => console.log(err))
  }

  render() {
    const { isSignedIn, imageURL, route, box, user } = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === "home" ?
          <Fragment>
            <Logo />
            <Rank name={user.name} entries={user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} onSearch={this.onSearch} />
            <FaceRecognition box={box} imageURL={imageURL} />
          </Fragment>
          : (
            route === "signin" ?
              <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> :
              <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;
