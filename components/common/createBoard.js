import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import {
  addBoardProductAction,
  createNewBoardAction,
  getBoardStoreAction,
} from "../../redux/actions/common";

const CreateBoard = (props) => {
  const {t} = useTranslation()
  const cookie = new Cookies();
  const [isNewBoard, setIsNewBoard] = useState(false);
  const [token, setToken] = useState(null);
  const [board, setBoard] = useState("");
  useEffect(() => {
    setToken(cookie.get("user_token"));
    props.getBoardStoreAction();
  }, []);
  const handleSubmitBoard = () => {
    if (board) {
      props.createNewBoardAction(
        {
          name: board,
        },
        setIsNewBoard,
        setBoard
      );
    } else {
      toast.error("Board can not be empty");
    }
  };
  const handleBoard = (id) => {
    const data = {
      product_id: props.productId,
      board_id: id,
    };
    props.addBoardProductAction(data, props.hideModal);
  };
  return (
    <Modal
      onHide={props.hideModal}
      show={props.isOpen}
      centered
      className="createBoardModal"
    >
      <Modal.Body>
        <div className="row">
          <div className="col-md-6">
            <div className="modal__img">
              <img src="/images/bg/bg-create-board.png" alt="img" />
            </div>
          </div>
          <div className="col-md-6">
            {!isNewBoard ? (
              <form>
                <div className="item-title mb-14">
                  <h2>{t("Create New Board!")}</h2>
                </div>
                <div className="input__group mb-20">
                  <input
                    type="text"
                    placeholder="Board Name"
                    onChange={(e) => setBoard(e.target.value)}
                    value={board}
                  />
                </div>
                <div className="item-button mb-10">
                  <button
                    onClick={handleSubmitBoard}
                    type="button"
                    className="btn btn-black w-100"
                  >
                    {t("Save")}
                  </button>
                </div>
                {token && (
                  <div
                    onClick={() => setIsNewBoard(true)}
                    className="item-link"
                  >
                    <a>{t("Choose Board")}</a>
                  </div>
                )}
              </form>
            ) : (
              <form>
                <div className="item-title mb-14">
                  <h2>{t("Select Board")}</h2>
                </div>
                <ul className="input-list mb-10">
                  {props.boards?.length === 0 ? (
                    <h5 className="text-center">
                      {t("No Board Found. Please create new board")}
                    </h5>
                  ) : (
                    props.boards?.map((item, i) => (
                      <li key={i}>
                        <div className="list-item">
                          <h2>{item.name}</h2>
                          <a onClick={() => handleBoard(item.id)}>Save</a>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
                <div className="item-link" onClick={() => setIsNewBoard(false)}>
                  <a>{t("Create New Board")}</a>
                </div>
              </form>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
const mapStateToProps = (state) => ({
  boards: state.common.board_data,
});
export default connect(mapStateToProps, {
  getBoardStoreAction,
  createNewBoardAction,
  addBoardProductAction,
})(CreateBoard);
