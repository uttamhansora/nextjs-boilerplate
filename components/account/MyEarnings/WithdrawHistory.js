import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Pagination from "react-js-pagination";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";


const fetchWithdraws = async (pageNumber) => {
  return await axios.get(`/my-withdraws?page=${pageNumber}`);
};
const WithdrawHistory = ({ historyShow, setHistoryShow }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const { currency } = useSelector((state) => state.currency);
  const { isLoading, data } = useQuery(["withdraws", pageNumber], () =>
    fetchWithdraws(pageNumber)
  );

  const getCurrencySymbol = (amount) => {
    if (currency.currency_placement === "after") {
      return amount + currency.currency_symbol;
    } else {
      return currency.currency_symbol + amount;
    }
  };

  const AllWithdraw = ({ withdraws }) => {
    const {t} = useTranslation()
    const { data, total, current_page, per_page, last_page_url } = withdraws;
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>{t("Amount")}</th>
              <th>{t("Method")}</th>
              <th>{t("Date")}</th>
              <th>{t("Status")}</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ id, amount, gateway_name, status, created_at }) => (
              <tr key={id}>
                <td>
                  <span className="data-text">{getCurrencySymbol(amount)}</span>
                </td>
                <td>
                  <span className="data-text">{gateway_name}</span>
                </td>
                <td>
                  <span className="data-text">
                    {moment(created_at).format("DD-MM-YY")}
                  </span>
                </td>
                <td>
                  <span className="data-text status">
                    {status === 1
                      ? t("Pending")
                      : status === 2
                      ? t("Completed")
                      : t("Cancelled")}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!last_page_url.endsWith("page=1") && (
          <nav className="pagination_area">
            <Pagination
              totalItemsCount={total}
              activePage={current_page}
              itemsCountPerPage={per_page}
              onChange={(page) => setPageNumber(page)}
              containerClassName="pagination_area"
              itemClass="page-item"
              linkClass="page-link"
              activeLinkClass="active"
              hideFirstLastPages={true}
            />
          </nav>
        )}
      </>
    );
  };

  let content = null;
  if (isLoading) {
    content = null;
  } else {
    const { withdraws } = data?.data;
    content =
      withdraws.data.length == 0 ? (
        <h3 className="text-center">{t("No Data Found")}</h3>
      ) : (
        <div className="boards__table">
          <AllWithdraw withdraws={withdraws} />
        </div>
      );
  }
  return (
    <>
      <Modal
        size="lg"
        centered
        show={historyShow}
        onHide={() => setHistoryShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {t("Withdraw History")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
      </Modal>
    </>
  );
};

export default WithdrawHistory;
