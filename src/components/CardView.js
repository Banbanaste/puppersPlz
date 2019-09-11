import React, { Component } from "react";
import "../styles/CardView.css";

export default class CardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: this.props.imgArray
    };
  }

  componentDidMount() {}

  render() {
    if (this.state.images.length === 0) {
      return <div>Images coming soon</div>;
    } else {
      return (
        <div
          style={{
            backgroundColor: "#fff",
            width: "1080px",
            height: "700px",
            margin: "30px auto",
            padding: "20px",
            borderRadius: "20px",
            textAlign: "center"
          }}
        >
          <h1>Done</h1>
          <ul>
            {this.state.images.map(value => {
              console.log(value);
              return <li>{value}</li>;
            })}
          </ul>
        </div>
      );
    }
  }
}
