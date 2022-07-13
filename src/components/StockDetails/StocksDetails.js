import { connect } from "react-redux";
import { fetchStocks, updateOneStock } from "../actions";
import React from "react";
import "./StocksDetails.css";
import { Link } from "react-router-dom";
import _ from "lodash";

class StocksDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      stockCode: "",
    };
  }
  componentDidMount() {
    this.props.fetchStocks();
  }

  toggleClass(passed_stockcode) {
    const currentState = this.state.active;
    console.log(this.state);
    if (currentState) {
      this.setState({ active: false, stockCode: "" });
    }
    if (!currentState) {
      this.setState({ active: true, stockCode: passed_stockcode });
    }
  }

  renderList() {
    return this.props.stocks.map((stock) => {
      if (!stock.image) {
        return;
      }
      const base64EncodedStr = atob(unescape(encodeURIComponent(stock.image)));

      const cardClass = `${
        stock.changeColor === "is-green"
          ? "card border-success"
          : "card border-danger"
      } mb-3`;

      const textClass = `${
        stock.changeColor === "is-green" ? "text-success" : "text-danger"
      } text-right`;

      const onClickRefresh = async () => {
        this.toggleClass(stock.stockCode);
        await this.props.updateOneStock(stock.stockCode);
        await this.props.fetchStocks();
        this.toggleClass(stock.stockCode);
      };

      return (
        <div className="col" key={stock.id}>
          <div className={cardClass} style={{ width: "20rem" }}>
            <div className="card-header">
              {stock.stockCode}
              <i
                className={`fa fa-refresh ${
                  this.state.active && this.state.stockCode === stock.stockCode
                    ? "refresh-start"
                    : null
                }`}
                aria-hidden="true"
                onClick={onClickRefresh}
              ></i>
            </div>
            <div className="card-body">
              <Link to={`/${stock.stockCode}`}>
                <img
                  className="card-img-top mb-3"
                  src={`data:image/png;base64,${base64EncodedStr}`}
                  alt="Card image cap"
                />
              </Link>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <div className="column info">
                    <label className="text-left">Price</label>
                    <label className="text-right">{stock.price}</label>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="column info">
                    <label className="text-left">Change</label>
                    <label className={textClass}>{stock.change}</label>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="column info">
                    <label className="text-left">Market Cap</label>
                    <label className="text-right">{stock.marketcap}</label>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="column info">
                    <label className="text-left">Volume</label>
                    <label className="text-right">{stock.volume}</label>
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

export default connect(mapStateToProps, { fetchStocks, updateOneStock })(
  StocksDetails
);
