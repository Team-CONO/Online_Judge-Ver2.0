import React, { Component } from 'react';
import FormValidation from "../components/components-overview/FormValidation";
import NormalButtons from "../components/components-overview/NormalButtons";

export default class Login extends Component {
  render() {
    return (
        <div>
            <div> <FormValidation /> </div>
            <div> <NormalButtons /> </div>
        </div>
    );
  }
}
