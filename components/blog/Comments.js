import moment from "moment";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import {
  addBlogCommentAction,
  addBlogReplayAction,
} from "../../redux/actions/common";
const cookie = new Cookies();
const Comments = (props) => {
  const {t} = useTranslation()
  const [commentId, setCommentId] = useState("");
  const [comment, setComment] = useState("");
  const [blogComments, setBlogComment] = useState(props.blogComments);
  const [replay, setReplay] = useState("");
  const [show, setShow] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    setUserInfo(cookie.get("user_info"));
  }, []);
  const handleChnageComment = (e) => {
    setComment(e.target.value);
  };
  const handleShowReplay = (id) => {
    setShow(true);
    setCommentId(id);
  };
  const handleComment = () => {
    const data = {
      blog_id: props.blogId,
      comment: comment,
    };
    if (!comment) {
      toast.error("Comment can not be empty");
    } else if (comment.length < 10) {
      toast.warn("Comment at least 10 caracters");
    } else {
      props.addBlogCommentAction(data, setComment, setBlogComment);
    }
  };
  const handleSubmitReplay = () => {
    const data = {
      blog_id: props.blogId,
      parent_id: commentId,
      comment: replay,
    };
    if (!replay) {
      toast.error("Comment can not be empty");
    } else if (replay.length < 10) {
      toast.warn("Comment at least 10 caracters");
    } else {
      props.addBlogReplayAction(data, setReplay, setBlogComment, setShow);
    }
  };
  return (
    <>
      <div className="comments__content mb-64">
        <div className="item-title">
          <h2>
            {blogComments.length} {t("Comments")}
          </h2>
        </div>
        <ul className="comments__list">
          {blogComments.map(
            ({
              id,
              comment,
              name,
              created_at,
              customer,
              blog_comment_replies,
            }) => (
              <li key={id}>
                <div className="comment__item">
                  <div className="item-top">
                    <div className="user-info">
                      <div className="user-img">
                        <img src={customer?.image} alt="img" />
                      </div>
                      <div className="user-text">
                        <h2>{name}</h2>
                        <h3>{moment(created_at).format("DD MMM Y")}</h3>
                      </div>
                    </div>
                    <button type="button" onClick={() => handleShowReplay(id)}>
                      {t("Reply")}
                    </button>
                  </div>
                  <div className="item-text">
                    <p>{comment}</p>
                  </div>
                </div>
                <ul>
                  {blog_comment_replies.map(
                    ({
                      id,
                      customer,
                      name,
                      created_at,
                      comment,
                      parent_id,
                    }) => (
                      <li key={id}>
                        <div className="comment__item">
                          <div className="item-top">
                            <div className="user-info">
                              <div className="user-img">
                                <img src={customer?.image} alt="img" />
                              </div>
                              <div className="user-text">
                                <h2>{name}</h2>
                                <h3>{moment(created_at).format("DD MMM Y")}</h3>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleShowReplay(parent_id)}
                            >
                              {t("Reply")}
                            </button>
                          </div>
                          <div className="item-text">
                            <p>{comment}</p>
                          </div>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </li>
            )
          )}
        </ul>
      </div>
      {userInfo && (
        <div className="leave-comment">
          <div className="item-title">
            <h2>{t("Leave a comment")}</h2>
          </div>
          <form>
            <div className="input__group__between">
              <div className="input__group mb-25">
                <input type="text" defaultValue={userInfo.name} disabled />
              </div>
              <div className="input__group mb-25">
                <input type="email" defaultValue={userInfo.email} disabled />
              </div>
            </div>
            <div className="input__group mb-25">
              <textarea
                onChange={handleChnageComment}
                cols="30"
                rows="5"
                value={comment}
                placeholder={`${t("Your comments")}*`}
              ></textarea>
            </div>
            <div className="item-button">
              <button onClick={handleComment} type="button">
                {t("Submit")}
              </button>
            </div>
          </form>
        </div>
      )}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t("Commnet Reply")}</Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body>
            <div className="my-3">
              <textarea
                className={`form-control `}
                rows="3"
                placeholder={`${t("Your comments")}*`}
                onChange={(e) => setReplay(e.target.value)}
                value={replay}
              ></textarea>
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-content-between px-4">
            <button
              onClick={() => setShow(false)}
              className="btn btn-outline-theme"
              type="button"
            >
              {t("Cancel")}
            </button>
            <button
              className="btn btn-black"
              type="button"
              onClick={handleSubmitReplay}
            >
              {t("Sumbit")}
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default connect(null, { addBlogCommentAction, addBlogReplayAction })(
  Comments
);
