import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { addReportProductAction } from "../../redux/actions/common";
const ReportPhoto = (props) => {
  const {t} = useTranslation()
  const [reason, setReason] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (reason) {
      const data = {
        reported_to_product_id: props.id,
        reason: reason,
      };
      props.addReportProductAction(data, props.setReportShow);
    } else {
      toast.warn("Reason can not be empty");
    }
  };
  return (
    <Modal
      show={props.reportShow}
      onHide={() => props.setReportShow(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{t("Report Photo")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Reason</label>
            <select
              className="form-select"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="">{t("Select Reason")}</option>
              {props.reportedCategories.map(({ id, name }) => (
                <option key={id} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn btn-black">{t("Report Photo")}</button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default connect(null, { addReportProductAction })(ReportPhoto);
