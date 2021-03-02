import React from "react";

function Details(props) {
  return (
    <pre>
      <code>{JSON.stringify(props, null, 4)}</code>
    </pre>
  );
}

export default Details;
