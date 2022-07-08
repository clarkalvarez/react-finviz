import { connect } from "react-redux";
import { fetchStocks } from "../actions";
import React from "react";
import "./StocksDetails.css";
import { Link } from "react-router-dom";

class StocksDetails extends React.Component {
  componentDidMount() {
    this.props.fetchStocks();

    console.log(this.props);
    console.log(this.props);
  }

  renderList() {
    return this.props.stocks.map((stock) => {
      const cardClass = `${
        stock.changeColor.value === "is-green"
          ? "card border-success"
          : "card border-danger"
      } mb-3`;

      const textClass = `${
        stock.changeColor.value === "is-green" ? "text-success" : "text-danger"
      } text-right`;
      return (
        <div className="col" key={stock.id}>
          <div className={cardClass} style={{ width: "20rem" }}>
            <div className="card-header">{stock.stockCode.value} </div>
            <div className="card-body">
              <Link to={`/${stock.stockCode.value}`}>
                <img
                  className="card-img-top mb-3"
                  src={`data:image/png;base64,${stock.image.value}`}
                  alt="Card image cap"
                />
              </Link>

              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <div className="column info">
                    <label className="text-left">Price</label>
                    <label className="text-right">{stock.price.value}</label>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="column info">
                    <label className="text-left">Change</label>
                    <label className={textClass}>{stock.change.value}</label>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="column info">
                    <label className="text-left">Market Cap</label>
                    <label className="text-right">
                      {stock.marketcap.value}
                    </label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row row-cols-3">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stocks: Object.values(state),
  };
};

export default connect(mapStateToProps, { fetchStocks })(StocksDetails);
