import { Icon } from "@iconify/react";
import moment from "moment/moment";
import Head from "next/head";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import EditNewBoard from "../../components/common/edit_board";
import CreateNewBoard from "../../components/common/new_board";
import AccountLayout from "../../components/layout/account";
import PublicLayout from "../../components/public-layout";
import { removeAuthCookie } from "../../utils/commonFunctions";
import { useTranslation } from "react-i18next";
import {
  deleteBoardAction,
  getBoardsAction,
} from "../../redux/actions/profile";
import { getServerApiRequest } from "../../utils/serverApi";
const Boards = (props) => {
  const { t } = useTranslation();
  const [saveModal, setSaveModal] = useState(false);
  const [editBoardId, setEditBoardId] = useState(null);
  const [editBoardName, seteEditBoardName] = useState(null);
  const [editModal, setEditModal] = useState(null);
  useEffect(() => {
    props.getBoardsAction();
  }, []);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        props.deleteBoardAction(id);
      }
    });
  };
  const handleClickEditBoard = (id, name) => {
    setEditModal(true);
    setEditBoardId(id);
    seteEditBoardName(name);
  };
  return (
    <Fragment>
      <Head>
        <title>{t("My Boards")}</title>
      </Head>
      <PublicLayout
        settings={props.settings}
        footer_info={props.footer_info}
        user_info={props.user_info}
        token={props.token}
      >
        <AccountLayout user_info={props.user_info}>
          <div className="dashboard__content">
            <div className="boards__content">
              <div className="item-top">
                <div className="item-left">
                  <h2>
                    {props.boards?.length} {t("Boards")}
                  </h2>
                </div>
                <div className="item-right">
                  <a
                    onClick={() => setSaveModal(true)}
                    className="btn bg-theme"
                  >
                    + {t("Create Board")}
                  </a>
                </div>
              </div>
              {props.boards?.length === 0 ? (
                <h5 className="text-center">{t("No Data Found")}</h5>
              ) : (
                <div className="boards__table">
                  <table>
                    <thead>
                      <tr>
                        <th>{t("Board Name")}</th>
                        <th>{t("Last Updated")}</th>
                        <th>{t("Files")}</th>
                        <th>{t("Action")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {props.boards?.map(
                        ({
                          id,
                          uuid,
                          name,
                          updated_at,
                          board_products_count,
                          slug,
                        }) => (
                          <tr key={id}>
                            <td>{name}</td>
                            <td>
                              <span className="data-text">
                                {moment(updated_at).format("DD MMM Y")}
                              </span>
                            </td>
                            <td>
                              <span className="data-text">
                                {board_products_count || 0}
                              </span>
                            </td>
                            <td>
                              <div className="action__buttons">
                                <a
                                  onClick={() => handleClickEditBoard(id, name)}
                                  className="btn btn-outline-gray"
                                >
                                  <Icon
                                    icon="eva:edit-outline"
                                    width="21"
                                    height="21"
                                  />
                                  <span>{t("Edit")}</span>
                                </a>
                                <Link
                                  as={`/board/${uuid}/${slug}`}
                                  href="/board/[uuid]/[slug]"
                                  className="btn btn-outline-gray"
                                >
                                  <Icon
                                    icon="akar-icons:eye"
                                    width="21"
                                    height="21"
                                  />
                                  <span>{t("View")}</span>
                                </Link>
                                <a
                                  onClick={() => handleDelete(id)}
                                  className="btn btn-outline-theme"
                                >
                                  <Icon
                                    icon="bx:trash"
                                    width="21"
                                    height="21"
                                  />
                                  <span>{t("Delete")}</span>
                                </a>
                              </div>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </AccountLayout>
      </PublicLayout>
      <CreateNewBoard isOpen={saveModal} hideModal={setSaveModal} />
      <EditNewBoard
        isOpen={editModal}
        hideModal={setEditModal}
        boardId={editBoardId}
        editBoardName={editBoardName}
      />
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  boards: state.profile.boards,
});
export default connect(mapStateToProps, {
  getBoardsAction,
  deleteBoardAction,
})(Boards);
export const getServerSideProps = async ({ req, res }) => {
  const { user_token } = req.cookies;

  const auth_data = await getServerApiRequest(`auth-status`, null, user_token);
  if (auth_data.data.auth_status === 'out') {
    removeAuthCookie(res);
    return {
      redirect: { destination: "/", permanent: false },
    };
  }
  const setting_data = await getServerApiRequest("setting", null);
  const footer_data = await getServerApiRequest("footer-details", null);
  return {
    props: {
      user_info: auth_data.data.customer ? auth_data.data.customer : null,
      settings: setting_data.data.data ? setting_data.data.data : null,
      footer_info: footer_data.data.data ? footer_data.data.data : null,
      token: user_token || null,
    },
  };
};
