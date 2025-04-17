import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { deleteAccountAction } from "../../redux/actions/profile";

const DeleteAccount = (props) => {
  const {t} = useTranslation()
  const router = useRouter();
  const handleDelete = () => {
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
        props.deleteAccountAction(router);
      }
    });
  };
  return (
    <div className="delete-account">
      <Icon icon="ant-design:warning-outlined" width="50" height="50" />
      <p>
        {t(
          "Are you absolutely sure that you want to delete your account?"
        )}{" "}
        <strong>
          {t(
            "Please note that there is no option to restore the account or its data nor reuse the username once it's deleted."
          )}
        </strong>{" "}
        {t(
          "If you click the button, we will send you an email with further instructions on deleting your account."
        )}
      </p>
      <button onClick={handleDelete} className="btn btn-outline-theme">
        {t("Yes, delete my account")}
      </button>
    </div>
  );
};
export default connect(null, { deleteAccountAction })(DeleteAccount);
