import StockInfo from "../StockInfo/StockInfo";
import StocksDetails from "../StockDetails/StocksDetails";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import StockModal from "../StockModal/StockModal.js";
import React, { Component } from "react";
import { connect } from "react-redux";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
    console.log(this.props);
  };

  hideModal = () => {
    this.setState({ show: false });
    console.log(this.props);
  };

  render() {
    return (
      <div>
        <StockModal show={this.state.show} handleClose={this.hideModal} />
        <div>
          <FontAwesomeIcon
            className="icon"
            icon={faPlusCircle}
            onClick={this.showModal}
          />
        </div>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<StocksDetails />} />
            <Route path="/:stockcode" element={<StockInfo />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
