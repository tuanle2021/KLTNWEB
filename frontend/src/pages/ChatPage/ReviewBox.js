import React from "react";
import{
    ChatbotContainer,
    BotContainer,
    UserContainer,
    MessageChatContainer,
    MessageUserContainer,
    InputContainer,
    MessageInputContainer,
    PushButton,

} from "./styles";


class ReviewBox extends React.Component {
  state = { text: "" };

  onInputChange = event => {
    this.setState({ text: event.target.value });
  };

  onFormSubmit = event => {
    event.preventDefault();
    console.log(this.state.text);
    this.props.onFormSubmit(this.state.text);
  };

  render() {
    return (
      <div className="ui segment">
        <InputContainer>
          <MessageInputContainer
              type="text"
              placeholder="The movie was..."
              value={this.state.text}
              onChange={this.onInputChange}
          />
          <PushButton onClick={this.onFormSubmit}>
            send
          </PushButton>
        </InputContainer>
      </div>
    );
  }
}
export default ReviewBox;
