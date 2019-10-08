import React, { Component } from "react";
import ResultItem from "./result-item";

import "./result-list.scss";
import "./placeholder.scss";

const results = [
  { an: "123" },
  { an: "456" },
  { an: "789" },
  { an: "abc" },
  { an: "def" },
  { an: "ghi" }
];

class ResultList extends Component {
  state = {
    markedResults: [],
    filteredResults: results,
    activeFilters: []
  };

  updateMarkedResult = (currentResults, resultToUpdate) =>
    currentResults.map(result => {
      if (result.an === resultToUpdate.an) {
        return resultToUpdate;
      }
      return result;
    });

  setMarkedResults = resultToSet => {
    const { marker, an } = resultToSet;

    this.setState(({ markedResults: prevMarkedResults }) => {
      // remove
      if (!marker) {
        return {
          markedResults: prevMarkedResults.filter(result => result.an !== an)
        };
      }

      const foundResult = prevMarkedResults.find(result => result.an === an);

      // updated
      if (foundResult) {
        return {
          markedResults: this.updateMarkedResult(prevMarkedResults, resultToSet)
        };
      }

      // add
      return {
        markedResults: [...prevMarkedResults, resultToSet]
      };
    });
  };

  filterResultsByMarker = event => {
    const selectedMarker = event.currentTarget.getAttribute("id");

    this.setState(({ activeFilters: prevActiveFilters, markedResults }) => {
      const filterIndex = prevActiveFilters.indexOf(selectedMarker);

      const activeFilters =
        filterIndex !== -1
          ? // Removes selectedMarker from activeFilters if it was previously active.
            [
              ...prevActiveFilters.slice(0, filterIndex),
              ...prevActiveFilters.slice(filterIndex + 1)
            ]
          : // Adds selectedMarker as an active filter.
            [...prevActiveFilters, selectedMarker];

      const resultsToDisplay = markedResults.reduce(
        (foundResults, { marker, an }) =>
          activeFilters.indexOf(marker) !== -1
            ? [...foundResults, an]
            : foundResults,
        []
      );

      return {
        activeFilters,
        filteredResults: results.filter(
          ({ an }) => resultsToDisplay.indexOf(an) !== -1
        )
      };
    });
  };

  displayAvailableFilters = () =>
    this.state.markedResults
      .reduce(
        (markersToDisplay, { marker }) =>
          markersToDisplay.indexOf(marker) == -1
            ? [...markersToDisplay, marker]
            : markersToDisplay,
        []
      )
      .map(marker => {
        const activeClass =
          this.state.activeFilters.indexOf(marker) !== -1
            ? `placeholder__marker--${marker}--active`
            : "";

        return (
          <div
            key={marker}
            id={marker}
            className={`placeholder__marker placeholder__marker--${marker} ${activeClass}`}
            onClick={this.filterResultsByMarker}
          />
        );
      });

  resetResults = () => {
    this.setState({
      filteredResults: results,
      activeFilters: []
    });
  };

  clearMarkers = () => {
    this.setState({
      markedResults: [],
      filteredResults: results,
      activeFilters: []
    });
  };

  render() {
    const { markedResults, filteredResults } = this.state;
    const filters = this.displayAvailableFilters();

    return (
      <section className="result-list">
        {filters.length > 0 && (
          <nav className="placeholder">
            <button onClick={this.resetResults}>All Results</button>
            <button onClick={this.clearMarkers}>Clear</button>
            {filters}
          </nav>
        )}

        {filteredResults.map(({ an }) => {
          const selectedMarker = markedResults.find(marker => marker.an === an);
          console.log("SELECTED MARKER", selectedMarker);
          return (
            <ResultItem
              key={an}
              an={an}
              marker={selectedMarker && selectedMarker.marker}
              setMarkedResult={this.setMarkedResults}
            />
          );
        })}
      </section>
    );
  }
}

export default ResultList;
