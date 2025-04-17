import { Icon } from "@iconify/react";
import { Field, FieldArray, Form, Formik } from "formik";
import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import Select from "react-select";
import * as Yup from "yup";
import ThumbImg from "../../components/imagePreview";
import AccountLayout from "../../components/layout/account";
import PublicLayout from "../../components/public-layout";
import { removeAuthCookie } from "../../utils/commonFunctions";
import {
  getProductTypeCategoryAction,
  myProductAction,
} from "../../redux/actions/profile";
import { getServerApiRequest } from "../../utils/serverApi";

const profileValidation = Yup.object({
  title: Yup.string().required("Title can not be empty"),
  // description: Yup.string().required("Description can not be empty"),
  // attribution_required: Yup.string().required("Attribution can not be empty"),

  tags: Yup.array()
    .required("tags can not be empty")
    .min(1, "please input minimum 1 tags"),
  product_type_id: Yup.string().required("Product type can not be empty"),
  product_category_id: Yup.string().required(
    "Product category can not be empty"
  ),
  file_types: Yup.string().required("File type can not be empty"),
  resources: Yup.array().when("accessibility", {
    is: 1,
    then: Yup.array()
      .of(
        Yup.object().shape({
          variation: Yup.string().required("Variation can not be empty"),
          file: Yup.string().required("File can not be empty"),
          price: Yup.number().required("Price can not be empty"),
        })
      ),
    otherwise: Yup.array(),
  }),
  use_this_photo: Yup.string().when("accessibility", {
    is: 2,
    then: Yup.string().required("Use Photo can not be empty"),
    otherwise: Yup.string(),
  }),
  main_file: Yup.string().when("accessibility", {
    is: 2,
    then: Yup.string().required("Main File can not be empty"),
    otherwise: Yup.string(),
  }),
});

const Upload = (props) => {
  const {t} = useTranslation();
  const [files, setFiles] = useState([]);
  const initialState = {
    title: "",
    description: "",
    tags: [],
    attribution_required: "",
    accessibility: 2,
    product_type_id: "",
    product_category_id: "",
    tax_id: "",
    file_types: "",
    thumbnail_image: "",
    main_file: "",
    use_this_photo: 1,
    resources: [
      {
        variation: "",
        file: "",
        price: "",
      },
    ],
  };
  const { getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  const { acceptedFiles, getInputProps: getInputProps2 } = useDropzone();
  const handleSubmit = (values, actions) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    if (values.tags) {
      values.tags.forEach(value => formData.append("tags[]", value));
    }
    if (values.attribution_required) {
      formData.append("attribution_required", 1);
    } else {
      formData.append("attribution_required", 0);
    }
    
    if (values.accessibility == 2) {
      formData.append("use_this_photo", values.use_this_photo);
    }

    formData.append("accessibility", values.accessibility);
    formData.append("product_category_id", values.product_category_id);
    formData.append("product_type_id", values.product_type_id);
    formData.append("file_types", values.file_types);
    formData.append("tax_id", values.tax_id);

    formData.append("thumbnail_image", values.thumbnail_image);
    if (values.accessibility == 2) {
      formData.append("main_file", values.main_file);
    }
    else {
      let index = 0;
      values.resources.forEach(function (value) {
        formData.append(`main_files_${index++}`, value.file)
        formData.append("prices[]", value.price)
        formData.append("variations[]", value.variation)
      });
    }
    props.myProductAction(formData, actions);
  };

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <Fragment>
      <Head>
        <title>{t("Upload")}</title>
      </Head>
      <PublicLayout
        settings={props.settings}
        footer_info={props.footer_info}
        user_info={props.user_info}
        token={props.token}
      >
        <AccountLayout user_info={props.user_info}>
          <Formik
            enableReinitialize
            initialValues={initialState}
            validationSchema={profileValidation}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, errors, touched }) => (
              <Form id="profile" className="upload-input-wrap">
                {/* <div className="dashboard__content p-3 mb-24">
                  <div className="upload__content">
                    <div className="upload-list-content">
                      <div className="mb-23">
                        <h2>
                          {t("What you will get & rules to follow")}:
                        </h2>
                      </div>
                      <ul className="upload-list">
                        {props.upload_info.rules.map(({ id, description }) => (
                          <li key={id}>
                            <div className="list-item">
                              <i className="fa-solid fa-arrow-right"></i>
                              <span>{t(description)}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div> */}
                <div className="row">
                  <div className="col-lg-7 col-12">
                    <div className="dashboard__content p-3 mb-4">
                      <div className="upload__content">
                        <label
                          htmlFor="thumbnail"
                          className={`upload-file upload-file-type mb-0 ${values.thumbnail_image ? "image-view" : ""
                            }`}
                        >
                          <input
                            type="file"
                            id="thumbnail"
                            onChange={(e) => {
                              setFieldValue(
                                "thumbnail_image",
                                e.currentTarget.files[0]
                              );
                            }}
                          />
                          <label htmlFor="thumbnail">
                            <Icon
                              icon="clarity:upload-cloud-line"
                              width="60"
                              height="60"
                            />
                          </label>
                          <p>{t("Drop your thumbnail image here")}</p>
                          {values.thumbnail_image && (
                            <ThumbImg file={values.thumbnail_image} />
                          )}
                        </label>
                      </div>
                    </div>

                    <div className="input__group mb-20">
                      <label>{t("Accessibility")}*</label>
                      <ul className="radio-style">
                        <li>
                          <label htmlFor="paid">
                            <input
                              type="radio"
                              id="paid"
                              name="accessibility"
                              onChange={(e) =>
                                setFieldValue("accessibility", e.target.value)
                              }
                              value={1}
                              checked={
                                values.accessibility == 1 ? true : false
                              }
                            />
                            <span>Paid</span>
                          </label>
                        </li>
                        <li>
                          <label htmlFor="free">
                            <input
                              type="radio"
                              id="free"
                              name="accessibility"
                              onChange={(e) =>
                                setFieldValue("accessibility", e.target.value)
                              }
                              value={2}
                              checked={
                                values.accessibility == 2 ? true : false
                              }
                            />
                            <span>Free</span>
                          </label>
                        </li>
                      </ul>
                      {errors.accessibility && (
                        <div className="invalid-feedback">
                          {errors.accessibility}
                        </div>
                      )}
                    </div>
                    {values.accessibility == 2 ? (
                      <>
                        <div className="input__group mb-20">
                          <label>
                            {t("How can use this photo")}*
                          </label>
                          <select
                            onChange={(e) =>
                              setFieldValue("use_this_photo", e.target.value)
                            }
                            value={values.use_this_photo}
                            name="use_this_photo"
                            className="form-control"
                          >
                            <option value="1">
                              {t("For commercial use")}
                            </option>
                            <option value="2">
                              {t("For personal use")}
                            </option>
                            <option value="3">
                              {t("Editorial use only")}
                            </option>
                            <option value="4">
                              {t("Use only on websites")}
                            </option>
                          </select>
                          {errors.use_this_photo && (
                            <div className="invalid-feedback">
                              {errors.use_this_photo}
                            </div>
                          )}
                        </div>
                        <div className="input__group mb-20">
                          <label>{t("File")}*</label>
                          <Field
                            type="file"
                            name="main_file"
                            className="form-control"
                            onChange={(e) => {
                              setFieldValue(`main_file`, e.target.files[0]);
                            }}
                            value={null}
                          />
                          {errors.main_file && (
                            <div className="invalid-feedback">
                              {errors.main_file}
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <FieldArray
                          name="resources"
                          render={(arrayHelpers) => (
                            <Fragment>
                              {values.resources.map((lan, index) => (
                                <div className="align-items-center row">
                                  <div className="col-lg-4 p-1">
                                    <div className="">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder={t("Variation")}
                                        onChange={(e) =>
                                          setFieldValue(
                                            `resources[${index}].variation`,
                                            e.target.value
                                          )
                                        }
                                        value={values.resources[index].variation}
                                        name={`resources[${index}].variation`}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-lg-2 p-1">
                                    <div className="">
                                      <input
                                        type="number"
                                        className="form-control"
                                        placeholder={t("Price")}
                                        onChange={(e) =>
                                          setFieldValue(
                                            `resources[${index}].price`,
                                            e.target.value
                                          )
                                        }
                                        name={`resources[${index}].price`}
                                        value={values.resources[index].price}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-lg-5 p-1">
                                    <div className="">
                                      <input
                                        type="file"
                                        className="form-control"
                                        placeholder={t("File")}
                                        onChange={(e) => {
                                          setFieldValue(
                                            `resources[${index}].file`,
                                            e.target.files[0]
                                          );
                                        }}
                                        name={`resources[${index}].file`}
                                        value={null}
                                      />
                                    </div>
                                  </div>

                                  <div className="col-lg-1">
                                    {values.resources.length > 1 && index != 0 ? (
                                      <div className="text-right">
                                        <button
                                          className="text-danger"
                                          type="button"
                                          onClick={() => {
                                            arrayHelpers.remove(index);
                                          }}
                                        >
                                          <Icon
                                            icon="ic:round-delete"
                                            width="20"
                                            height="20"
                                          />
                                        </button>
                                      </div>
                                    ) :
                                      <div className="text-right">
                                        <button
                                          type="button"
                                          className="add-btn"
                                          onClick={() =>
                                            arrayHelpers.push({
                                              variation: "",
                                              file: "",
                                              price: "",
                                            })
                                          }
                                        >
                                          +
                                        </button>
                                      </div>
                                    }
                                  </div>
                                </div>
                              ))}

                            </Fragment>
                          )}
                        />
                        {touched.resources && errors.resources && (
                          <p className="errorMsg">{errors.resources}</p>
                        )}
                      </>
                    )}
                    {values.accessibility == 2 && (
                      <div className="form-check form-switch mb-3">
                        <input
                          //   {...register("attribution_required")}
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="attribution"
                          onChange={(e) =>
                            setFieldValue(
                              "attribution_required",
                              e.target.checked
                            )
                          }
                          value={values.attribution_required}
                          name="attribution_required"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="attribution"
                        >
                          {t("Attribution required")}
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="col-lg-5 col-12">
                    <div className="dashboard__content p-3">
                      <div className="input__group mb-20">
                        <label htmlFor="title">{t("Title")}*</label>
                        <input
                          type="text"
                          id="title"
                          placeholder={t("Title")}
                          onChange={(e) =>
                            setFieldValue("title", e.target.value)
                          }
                          value={values.title}
                          name="title"
                        />
                        {errors.title && (
                          <div className="invalid-feedback">{errors.title}</div>
                        )}
                      </div>
                      <div className="input__group mb-20">
                        <label>{t("Product Type")}*</label>
                        <select
                          onChange={(e) => {
                            setFieldValue("product_type_id", e.target.value);
                            props.getProductTypeCategoryAction(e.target.value);
                          }}
                          value={values.product_type_id}
                          name="product_type_id"
                        >
                          <option value="">{t("Select type")}</option>
                          {props.upload_info.productTypes.map(
                            ({ id, name }) => (
                              <option
                                key={id}
                                value={id}
                                onClick={(e) =>
                                  props.getFileTypeAction(
                                    `type_slug=${item.slug}`
                                  )
                                }
                              >
                                {t(name)}
                              </option>
                            )
                          )}
                        </select>
                        {errors.product_type_id && (
                          <div className="invalid-feedback">
                            {errors.product_type_id}
                          </div>
                        )}
                      </div>
                      <div className="input__group mb-20">
                        <label>{t("Product Category")}*</label>
                        <select
                          onChange={(e) =>
                            setFieldValue("product_category_id", e.target.value)
                          }
                          value={values.product_category_id}
                          name="product_category_id"
                        >
                          <option value="">
                            {t("Select category")}
                          </option>
                          {props.type_category?.productCategories?.map(
                            ({ id, name }) => (
                              <option key={id} value={id}>
                                {name}
                              </option>
                            )
                          )}
                        </select>
                        {errors.product_category_id && (
                          <div className="invalid-feedback">
                            {errors.product_category_id}
                          </div>
                        )}
                      </div>
                      <div className="input__group mb-20">
                        <label htmlFor="file_types">
                          {t("File Types")}*
                        </label>
                        <select
                          type="text"
                          id="file_types"
                          placeholder="File types"
                          onChange={(e) =>
                            setFieldValue("file_types", e.target.value)
                          }
                          value={values.file_types}
                          name="file_types"
                        >
                          <option value="">
                            {t("Select category")}
                          </option>
                          {props.type_category?.productTypes?.map(
                            ({ id, name, title }) => (
                              <option key={id} value={name}>
                                {title}
                              </option>
                            )
                          )}
                        </select>

                        {errors.file_types && (
                          <div className="invalid-feedback">
                            {errors.file_types}
                          </div>
                        )}
                      </div>
                      <div className="input__group mb-20">
                        <label>{t("Tags")}*</label>
                        <Select
                          placeholder={t("Select Tags")}
                          isMulti
                          options={props.upload_info.tags}
                          classNamePrefix="react-select-tags"
                          getOptionValue={(option) => option.id}
                          getOptionLabel={(option) => option.name}
                          onChange={(e) => {
                            setFieldValue(
                              "tags",
                              Array.isArray(e) ? e.map((x) => x.id) : []
                            );
                          }}
                          styles={{
                            menu: (provided) => ({ ...provided, zIndex: 10 }),
                          }}
                        />
                        {errors.tags && (
                          <div className="invalid-feedback">{errors.tags}</div>
                        )}
                      </div>
                      <div className="input__group mb-20">
                        <label>{t("Product Tax")}</label>
                        <select
                          onChange={(e) => {
                            setFieldValue("tax_id", e.target.value);
                          }}
                          value={values.tax_id}
                          name="tax_id"
                        >
                          <option value="">{t("Select Tax")}</option>
                          {props.upload_info.taxes.map(
                            ({ id, name }) => (
                              <option
                                key={id}
                                value={id}
                              >
                                {t(name)}
                              </option>
                            )
                          )}
                        </select>
                        {errors.tax_id && (
                          <div className="invalid-feedback">
                            {errors.tax_id}
                          </div>
                        )}
                      </div>
                      <div className="input__group mb-20">
                        <label>{t("Description")}</label>

                        <textarea
                          onChange={(e) =>
                            setFieldValue("description", e.target.value)
                          }
                          value={values.description}
                          name="description"
                          rows="6"
                        ></textarea>
                        {errors.description && (
                          <div className="invalid-feedback">
                            {errors.description}
                          </div>
                        )}
                      </div>

                    </div>
                    <div className="mt-30 import-button">
                      <button type="submit">{t("Upload File")} </button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </AccountLayout>
      </PublicLayout >
    </Fragment >
  );
};
const mapStateToProps = (state) => ({
  type_category: state.profile.type_category,
});
export default connect(mapStateToProps, {
  getProductTypeCategoryAction,
  myProductAction,
})(Upload);
export const getServerSideProps = async ({ req, res }) => {
  const { user_token } = req.cookies;
  const auth_data = await getServerApiRequest(`auth-status`, null, user_token);
  if (auth_data.data.auth_status === 'out') {
    removeAuthCookie(res);
    return {
      redirect: { destination: "/", permanent: false },
    };
  }

  if (auth_data.data.customer.role !== 2) {
    return {
      redirect: { destination: "/account/profile", permanent: false },
    };
  }
  const rules_data = await getServerApiRequest(
    `my-products/create`,
    null,
    user_token
  );

  const setting_data = await getServerApiRequest("setting", null);
  const footer_data = await getServerApiRequest("footer-details", null);
  return {
    props: {
      upload_info: rules_data.data.data ? rules_data.data.data : null,
      user_info: auth_data.data.customer ? auth_data.data.customer : null,
      settings: setting_data.data.data ? setting_data.data.data : null,
      footer_info: footer_data.data.data ? footer_data.data.data : null,
      token: user_token || null,
    },
  };
};
