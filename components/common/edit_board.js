import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { editBoardAction } from "../../redux/actions/profile";
const EditNewBoard = (props) => {
  const { t } = useTranslation();
  const [board, setBoard] = useState(props.editBoardName);
  useEffect(() => {
    setBoard(props.editBoardName);
  }, [props.editBoardName]);
  const handleSubmitBoard = (e) => {
    e.preventDefault();
    if (board) {
      props.editBoardAction(
        {
          name: board,
        },
        props.boardId,
        props.hideModal
      );
    } else {
      toast.error("Board can not be empty");
    }
  };
  return (
    <Modal
      onHide={() => props.hideModal(false)}
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
            </form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {
  editBoardAction,
})(EditNewBoard);
