import React from "react";
import ReviewBox from "./ReviewBox";
import Output from "./Output";
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


class App extends React.Component {
  constructor(props) {
    super(props);
        this.output = React.createRef();
    ;
  }
  state = { text: "" };

  onFormSubmit = async review => {
    const response = await fetch("http://localhost:5000/pred", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      method: "POST",
      body: JSON.stringify({
        body: review
      })
    });
    const prediction = await response.text();
    console.log(prediction);
    this.output.current.onGettingPred(prediction);
  };


  render() {
    return (
        <ChatbotContainer>
            <UserContainer>
                <MessageUserContainer>
                    <Output ref={this.state.text} />
                </MessageUserContainer>
            </UserContainer>
            <BotContainer>
                <MessageChatContainer>
                   <Output ref={this.output} />
                </MessageChatContainer>
            </BotContainer>
            <ReviewBox onFormSubmit ={this.onFormSubmit} />
        </ChatbotContainer>
    );
  }
}
export default App;
