import React, { Component } from "react";

import { Col, Row, Container } from "../Grid";
import ComicCharacters from "../ComicCharacters";

import "./DashBoard.css";
import SearchBar from "../SearchBar";

import $ from "jquery";
import ComicRows from "../ComicRows";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.performSearch();
  }
  performSearch = searchTerm => {
    const queryURL = "http://superheroapi.com/api/";
    const access = "2160363873976801/";
    $.ajax({
      url: `${queryURL}${access}search/${searchTerm}`,
      method: "GET"
    }).then(data => {
      let res = data.results;
      let comicRows = [];
      //   char is short for character
      res.forEach(char => {
        console.log(char);
        const comicRow = (
          <ComicRows
            key={char.id}
            name={char.name}
            image={char.image.url || "No Image found"}
            bio={
              char.biography.publisher.toUpperCase() || "No publishers found"
            }
            heroOrVillain={
              char.biography.alignment.toUpperCase() || "No alignment found"
            }
            group={
              char.connections["group-affiliation"] ||
              "No Group-Affiliation found"
            }
            realName={char.biography["full-name"] || "No Real Name found"}
            alias={char.biography.aliases || "No Alias found"}
            ego={char.biography["alter-egos"] || "No Alter Ego found"}
          />
        );
        comicRows.push(comicRow);
      });
      this.setState({
        rows: comicRows
      });
    });
  };

  searchHandler = event => {
    const searchTerm = event.target.value;
    this.performSearch(searchTerm);
  };
  render() {
    return (
      <Container>
        <SearchBar onChange={this.searchHandler} />
        <Row>
          <Col size="md-12">
            <ComicCharacters rows={this.state.rows} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Dashboard;
