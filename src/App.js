import React, { Component } from "react";
import Header from "./components/Header";
const API = "https://dog.ceo/api/breeds/list/all";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breeds: [],
      breedImgaes: [],
      isFetching: false
    };
  }
  componentDidMount() {
    this.setState({ isFetching: true });
    fetch(API)
      .then(response => response.json())
      .then(data => data.message)
      .then(breedObject => this.getNamesFromObject(breedObject))
      .then(breeds => this.getLinksFromArray(breeds))
      .then(apiArray => this.fetchImages(apiArray))
      .then(thing => {
        this.setState({ breedImgaes: thing });
      });
    this.setState({ isFetching: false });
  }
  getNamesFromObject = object => {
    let breeds = [];
    for (var breedName in object) {
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
    let someArray = [];
    array.forEach(api => {
      return fetch(api)
        .then(response => response.json())
        .then(data => data.message)
        .then(listImgSrc => someArray.push(listImgSrc));
    });
    return someArray;
  };
  generateListItem = url => {
    console.log(url);
    let listItem = (
      <li>
        <img src={url} alt="missing pup" />
      </li>
    );
    return listItem;
  };

  render() {
    console.log(this.state.breedImgaes);
    return (
      <div>
        <Header />
        <ul>
          {this.state.breedImgaes.forEach(img => {
            this.generateListItem(img);
          })}
        </ul>
      </div>
    );
  }
}
export default App;
