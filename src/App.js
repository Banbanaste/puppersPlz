import React, { Component } from "react";
const API = "https://dog.ceo/api/breeds/list/all";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breeds: []
    };
  }
  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => data.message)
      .then(breedObject => this.getNamesFromObject(breedObject))
      .then(breeds => this.getLinksFromArray(breeds))
      .then(apiArray => this.fetchImages(apiArray));
  }
  getNamesFromObject = object => {
    let breeds = [];
    for (let breedName in object) {
      if (object[breedName].length !== 0) {
        breeds.push(breedName);
        object[breedName].forEach(subBreed => {
          breeds.push(subBreed + " " + breedName);
        });
      } else {
        breeds.push(breedName);
      }
    }
    return breeds;
  };
  makeBreedLink = breed => {
    const firstHalf = "https://dog.ceo/api/breed/";
    const secondHalf = "/images/random";
    let API;
    if (breed.indexOf(" ") === -1) {
      API = firstHalf + breed + secondHalf;
    } else {
      const formatting = breed.split(" ");
      const reversed = formatting.reverse();
      const breedLink = reversed.join("/");
      API = firstHalf + breedLink + secondHalf;
    }
    return API;
  };
  getLinksFromArray = array => {
    let breedAPIArray = [];
    array.forEach(breed => {
      breedAPIArray.push(this.makeBreedLink(breed));
    });
    return breedAPIArray;
  };
  fetchImages = array => {
    array.forEach(api => {
      fetch(api)
        .then(response => response.json())
        .then(data => console.log(data.message));
    });
  };
  render() {
    return <h1>Hello, World!</h1>;
  }
}
export default App;
