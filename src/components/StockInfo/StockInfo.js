import { connect } from "react-redux";
import { fetchOneNews } from "../actions";
import React from "react";
import "./StockInfo.css";
import { Link } from "react-router-dom";

class StockInfo extends React.Component {
  componentDidMount() {
    const stockCode = this.props.match.params.stockcode;
    this.props.fetchOneNews(stockCode);
  }

  renderList() {
    return;
  }

  render() {
    return (
      <div className="container">
        <div className="row row-cols-3">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stocks: Object.values(state),
  };
};

export default connect(mapStateToProps, { fetchOneNews })(StockInfo);
