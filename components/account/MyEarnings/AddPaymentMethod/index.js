import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Bank from "./bank";
import CardPayment from "./card";
import MobileBanking from "./mobile";
import Paypal from "./paypal";
const AddPaymentMethod = ({ addPaymentShow, setAddPaymentShow, card_info }) => {
  const {t} = useTranslation()
  return (
    <Modal
      size="lg"
      centered
      show={addPaymentShow}
      onHide={() => setAddPaymentShow(false)}
      dialogClassName="modal-90w"
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {t("Add Account For Withdraw")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="payout-content">
          <div className="row">
            <CardPayment
              card_info={card_info.withdrawCard?.card_details}
              setAddPaymentShow={setAddPaymentShow}
            />
            <Bank
              bank_info={card_info.withdrawBank?.card_details}
              setAddPaymentShow={setAddPaymentShow}
            />

            <MobileBanking
              mobile_info={card_info.withdrawMobileBanking?.card_details}
              setAddPaymentShow={setAddPaymentShow}
            />
            <Paypal
              paypal_info={card_info.withdrawPaypal?.card_details}
              setAddPaymentShow={setAddPaymentShow}
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddPaymentMethod;
