import { useTranslation } from "react-i18next";

const TeamMembers = (props) => {
  const {t} = useTranslation()
  return (
    <section className="team__area">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="team__heading">
              <h2>{t(props.settings.team_member_title)}</h2>
              <p>{t(props.settings.team_member_subtitle)}</p>
            </div>
          </div>
        </div>
        <div className="row">
          {props.teamMembers.map(({ id, name, image, designation }) => (
            <div key={id} className="col-lg-3 col-md-4 col-sm-6">
              <div className="team__item">
                <div className="team__img">
                  <img src={image} alt={name} />
                </div>
                <div className="team__info">
                  <h2>{t(name)}</h2>
                  <p>{t(designation)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;
