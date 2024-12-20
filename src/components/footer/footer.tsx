import "./footer.css";

interface FooterProps {
  totalHits: number;
}

const Footer: React.FC<FooterProps> = ({ totalHits }) => {

  const clickHandler = () => {
    window.location.href = "www.wikipedia.com"
  }

  return (
    <div className="footer-container" style={!totalHits ? {maxWidth: "1076"} : {}}>
      <div className="flex-center folder-tab-common created-by">
        Created By: Caleb Evans
      </div>
      <button
        className="flex-center project-link folder-tab-common"
        onClick={clickHandler}
      >
        Check out my other projects here!
      </button>
    </div>
  );
}

export default Footer;