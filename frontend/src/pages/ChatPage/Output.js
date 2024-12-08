import React from "react";

class Output extends React.Component {
  state = { output: "Waiting", icon: "ellipsis horizontal" };

  onGettingPred = res => {
    this.setState({
        output: res,
        icon: "check"
    });
    console.log(this.state.output);
  };

  render() {
    return (
      <div className="ui segment">
        <i className={`${this.state.icon} large icon`} />
        {this.state.output}
      </div>
    );
  }
}
export default Output;
