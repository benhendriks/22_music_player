import React from "react";
import { Helmet } from "react-helmet";

class Meta extends React.Component {
  render() {
    return (
      <>
        <Helmet>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <meta name="description" content="Portfolio Benjamin Steidl"/>
          <link rel="apple-touch-icon" href="/img/favicon.ico"></link>
          <link rel="shortcut icon" href="/img/favicon.ico" />
          <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
          <title>Wavecircus</title>
        </Helmet>
      </>
    )
  }
}

export default Meta;