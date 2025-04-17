import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { addReportUserAction } from "../../redux/actions/common";
const ReportUser = (props) => {
  const {t} = useTranslation()
  const [reason, setReason] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (reason) {
      if (props.user_id) {
        const data = {
          reported_to_user_id: props.user_id,
          reason: reason,
        };
        props.addReportUserAction(data, props.setReportShow);
      } else {
        const data = {
          reported_to_customer_id: props.customer_id,
          reason: reason,
        };
        props.addReportUserAction(data, props.setReportShow);
      }
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
        <Modal.Title>{t("Report")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">{t("Reason")}</label>
            <select
              className="form-select"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="">Select Reason</option>
              {props.reportedCategories?.map(({ id, name }) => (
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

export default connect(null, { addReportUserAction })(ReportUser);
