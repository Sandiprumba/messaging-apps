import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

const Title = ({ title = "Chat", description = "this is the chat app called Lets-Chat" }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

Title.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default Title;
