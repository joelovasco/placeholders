import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import "./markers.scss";

class Markers extends Component {
  static options = [
    {
      id: "lightsalmon"
    },
    {
      id: "lightblue"
    },
    {
      id: "peachpuff"
    },
    {
      id: "yellowgreen"
    }
  ];

  state = {
    expanded: false,
    selectedMarker: this.props.marker
  };

  expandMarkers = () => {
    if (!this.state.expanded) {
      this.setState({
        expanded: true
      });
    }
  };

  collapseMarkers = () => {
    this.setState({
      expanded: false
    });
  };

  markerClick = event => {
    if (!this.state.expanded) {
      return;
    }

    const markerId = event.currentTarget.getAttribute("id");

    const currentSelectedMarker = Markers.options.find(
      ({ id }) => id === markerId
    );

    this.setState(
      ({ selectedMarker: prevselectedMarker }) => ({
        selectedMarker:
          prevselectedMarker !== currentSelectedMarker.id
            ? currentSelectedMarker.id
            : null,
        expanded: false
      }),
      () => {
        this.props.setMarker(this.state.selectedMarker);
      }
    );
  };

  render() {
    const dotContainerClass = "stickies__dot-container";
    const { expanded, selectedMarker } = this.state;
    const containerClassState = expanded
      ? `${dotContainerClass}--expanded`
      : `${dotContainerClass}--collapsed`;

    const dotClass = "stickies__dot";

    return (
      <div className="stickies">
        <div
          className={`stickies__dot-container ${containerClassState}`}
          onClick={this.expandMarkers}
        >
          {expanded && (
            <FontAwesomeIcon
              className="stickies__dot"
              icon={faTimesCircle}
              onClick={this.collapseMarkers}
            />
          )}
          {Markers.options.map(({ id }) => {
            const activeDotClass =
              selectedMarker === id ? `${dotClass}--${id}--active` : "";

            return (
              <div
                className={`${dotClass} ${dotClass}--${id} ${activeDotClass}`}
                key={id}
                id={id}
                onClick={this.markerClick}
              />
            );
          })}

          {!expanded && selectedMarker && (
            <div
              className={`${dotClass} ${dotClass}--${selectedMarker} ${dotClass}--selected`}
              id={selectedMarker}
            />
          )}

          {!expanded && !selectedMarker && (
            <div className={`${dotClass} ${dotClass}--unselected`} />
          )}
        </div>
      </div>
    );
  }
}

export default Markers;
