import { Card } from "antd";
import styled from "styled-components";
const ChatBox = styled(Card)`
  text-align: left;
  position: absolute;
  bottom: 0;
  right: 200px;
  width: 400px;
  height: 600px;
  .message-container {
    border: 1px solid #eee;
    height: 380px;
    padding: 10px;
  }
  .message-input {
    border: 1px solid #eee;
    height: 100px;
    margin-top: 20px;
    padding: 10px;
  }
`;

export { ChatBox };
