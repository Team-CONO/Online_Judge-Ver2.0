import React from "react";
// import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

// import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
// import MainSidebar from "../components/layout/MainSidebar/MainSidebar";
// import MainFooter from "../components/layout/MainFooter";

const nonDefault = ({ children }) => (
  <Container fluid>
    {children}
  </Container>
);

// DefaultLayout.propTypes = {
//   /**
//    * Whether to display the navbar, or not.
//    */
//   noNavbar: PropTypes.bool,
//   /**
//    * Whether to display the footer, or not.
//    */
//   noFooter: PropTypes.bool
// };

// DefaultLayout.defaultProps = {
//   noNavbar: false,
//   noFooter: false
// };

export default nonDefault;
