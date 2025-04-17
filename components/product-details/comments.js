import { Form, Formik } from "formik";
import moment from "moment/moment";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import * as Yup from "yup";
import { addProductCommentAction } from "../../redux/actions/common";
const loginValidation = Yup.object({
  comment: Yup.string()
    .required("Comment  can not be empty")
    .min(10, "Comment at least 10 caracters"),
});

const Comments = (props) => {
  const [comments, setComments] = useState(
    props.product_details.productComments
  );
  const initialState = {
    comment: "",
  };
  const handleSubmit = (values, actions) => {
    const data = {
      comment: values.comment,
      product_id: props.product_details.product.id,
    };
    props.addProductCommentAction(data, actions, setComments);
  };
  const {t} = useTranslation()
  return (
    <div className="product-comment-area">
      <h3 className="comment-title">{t("Comments")} ({comments.length})</h3>
      {props.product_details.product?.user?.id && (
        <div className="product-comment-box">
          <img
            className="user-img"
            src={props.product_details.product.user?.image}
            alt="user"
          />
          <div className="comment-box">
            <Formik
              enableReinitialize
              initialValues={initialState}
              validationSchema={loginValidation}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue, errors }) => (
                <Form id="login">
                  <div className="mb-3">
                    <textarea
                      className={`form-control ${
                        errors.comment && "is-invalid"
                      }`}
                      placeholder="Write your feedback"
                      value={values.comment}
                      onChange={(e) => setFieldValue("comment", e.target.value)}
                    ></textarea>
                    {errors.comment && (
                      <div className="invalid-feedback">{errors.comment}</div>
                    )}
                  </div>
                  <button className="btn btn-black">{t("Submit")}</button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
      <div className="text-comment-wrapper">
        {comments.map(({ id, created_at, comment, customer }) => (
          <div key={id} className="single-comment">
            <div className="left">
              <img className="img" src={customer?.image} alt="customer" />
              <div>
                <h4>{customer?.name}</h4>
                <p>{comment}</p>
              </div>
            </div>
            <div className="right">
              <p className="time">{moment(created_at).fromNow()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default connect(null, { addProductCommentAction })(Comments);
