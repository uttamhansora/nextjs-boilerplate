import { Accordion } from "react-bootstrap";
import { useTranslation } from "react-i18next";


const FAQ = ({ faqs }) => {
  const {t} = useTranslation()
  return (
    <section className="faq__area">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section__title">
              <h2>{t("FAQ")}</h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-10">
            <Accordion className="faq-accordion" defaultActiveKey="0">
              {faqs.map(({ id, question, answer }, i) => (
                <Accordion.Item key={id} eventKey={`"${id}"`}>
                  <Accordion.Header>
                    {i + 1}. {question}
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>{answer}</p>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
