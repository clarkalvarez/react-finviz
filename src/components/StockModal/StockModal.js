import { connect } from "react-redux";
import { fetchStock, storeStock } from "../actions";
import "./StockModal.css";

const StockModal = (props) => {
  const { handleClose, show, fetchStock, storeStock } = props;

  const showHideClassName = show ? "modal display-block" : "modal display-none";
  let text;

  const onTextClick = async () => {
    handleClose();
    await fetchStock(text);
  };

  const setText = (inputText) => {
    text = inputText;
  };

  return (
    <div className={showHideClassName}>
      <div className="modal-main card">
        <h4>Add Stock</h4>
        <div className="input-group">
          <input
            type="text"
            className="form-control stock-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="input-group-append">
            <button
              className="btn btn-primary"
              type="button"
              onClick={onTextClick}
            >
              Go
            </button>
            <button
              className="btn btn-danger"
              type="button"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { stocks: state };
};

export default connect(mapStateToProps, { fetchStock, storeStock })(StockModal);
