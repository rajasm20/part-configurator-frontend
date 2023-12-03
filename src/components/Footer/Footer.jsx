import './Footer.css';
import moment from "moment";
const Footer = () => {
    const currentYear = moment().format("YYYY");
    return (
        <div className="footer">
      <span className="footerText">
        © Copyright {currentYear}{" "}
          <span className="companyName">Motors</span>. All rights
        reserved
      </span>
        </div>
    );
};

export default Footer;