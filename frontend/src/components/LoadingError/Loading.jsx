import React from "react";
import { Spinner } from "./styles";

const Loading = () => {
  return (
    <Loading>
      <Spinner role="status">
        <span style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: '0' }}>
          Loading...
        </span>
      </Spinner>
    </Loading>
  );
};

export default Loading;
