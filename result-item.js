import React, { Component } from "react";
import Markers from "./markers";

import "./result-item.scss";

class ResultItem extends Component {
  setPlaceholderMarker = marker => {
    this.props.setMarkedResult({ marker, an: this.props.an});
  };

  render() {
    return (
      <section className="result-item">
        <Markers
          key={this.props.marker}
          marker={this.props.marker}
          setMarker={this.setPlaceholderMarker}
          an={this.props.an}
        />
        <article>
          <h3>Some Result Item: {this.props.an}</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
            accusamus amet alias esse explicabo, reiciendis aliquid dicta,
            dignissimos facilis odio repellendus omnis dolores fuga perferendis
            eius nihil harum magnam neque? Placeat laudantium, voluptatem
            quibusdam repellendus ipsum beatae! Laboriosam harum, voluptatum
            dolorem iusto at blanditiis non corrupti doloribus possimus! Rerum,
            laborum.0
          </p>
        </article>
      </section>
    );
  }
}

export default ResultItem;
