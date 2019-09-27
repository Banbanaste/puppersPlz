import React, { Component } from "react";
import Header from "./components/Header";
import "./styles/App.css";
const API = "https://dog.ceo/api/breeds/list/all";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breeds: [],
      breedImages: [],
      breedsSubset: [],
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
      .then(apiArray => this.fetchImages(apiArray));
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
    this.setState({ breeds });
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
    Promise.all(
      array.map(url =>
        fetch(url)
          .then(response => response.json())
          .then(data => data.message)
      )
    ).then(imgs => {
      this.setState({ breedImages: imgs, isFetching: true });
    });
  };
  generateListItem = (url, index) => {
    const style = {
      backgroundColor: "#cecece",
      backgroundImage: `url(${url})`,
      backgroundSize: "cover",
      backgroundPosition: "center"
    };
    let listItem = (
      <li key={index}>
        <div
          key={index}
          id={index}
          className="imageCard"
          alt={this.state.breeds[index]}
          onMouseOver={this.handleHover}
          style={style}
          onClick={this.handleClick}
        >
          <span id={index}>{this.state.breeds[index]}</span>
        </div>
      </li>
    );
    return listItem;
  };
  loopThroughImages = () => {
    let listItems = this.state.breedImages.map((img, index) => {
      return this.generateListItem(img, index);
    });
    return listItems;
    let num = Math.random() * listItems.length - 9;
    return listItems.slice(num, num + 9);
  };
  handleHover = event => {
    const select = event.target.id;
  };
  handleClick = event => {
    const select = event.target.id;
    const API = this.makeBreedLink(this.state.breeds[select]) + "/10";
    this.fetchSingleBreed(API);
  };
  fetchSingleBreed = url => {
    fetch(url)
      .then(response => response.json())
      .then(data => data.message)
      .then(breedImages => this.setState({ breedImages }));
  };
  handleSelectChange = event => {
    const letter = event.target.value;
    const filteredBreeds = this.state.breeds.filter(
      breed => breed.indexOf(letter) === 0
    );
    console.log(filteredBreeds);
    const filteredUrls = this.getLinksFromArray(filteredBreeds);
    const filteredImages = this.fetchImages(filteredUrls);
    console.log(filteredImages);
  };
  render() {
    const alphabet = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z"
    ];
    return (
      <div className="a">
        <Header />
        <div className="largeArea container">
          <div className="sideMenu">
            <h1>Breeds</h1>
            <h4>Select the first letter of the breed you wish to view</h4>
            <select value={this.value} onChange={this.handleSelectChange}>
              {alphabet.map(letter => {
                return <option value={letter}>{letter}</option>;
              })}
            </select>
          </div>
        </div>
        <div className="largeArea">
          <div className="imageListCard col-md-12 col-xs-12 col-lg-12">
            <ul className="imageList container">{this.loopThroughImages()}</ul>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
