import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { ChatBox } from "../styles/styles";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import { useCallback, useEffect, useState } from "react";
interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  message: (string) => void;
}

const socket_url = "localhost:8500/ws";
let socket: Socket<ServerToClientEvents, ClientToServerEvents>;
const ws_config = {
  withCredentials: true,
};
socket = io(socket_url);

export default function Home() {
  const [input, setInput] = useState("");
  const socketInitializer = async () => {
    const { data, status } = await axios.get(socket_url);
    console.log(data, status);

    socket.onAny((event, ...args) => {
      console.log(event, args);
    });
    socket.on("connect", () => {
      socket.emit("message", "connected");

      console.log("connected");
    });
    socket.on("disconnect", (reason) => {
      console.log(reason); // "ping timeout"
    });
  };

  // useEffect(() => socketInitializer, []);
  useCallback(() => socketInitializer(), []);
  const onChangeHandler = (e: any) => {
    setInput(e.target.value);
    socket.emit("message", e.target.value);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>My Chatbot Demo</title>
        <meta name="description" content="My chatbot demo app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to My Chatbot</h1>
        <ChatBox title="Welcome Customer">
          <div className="message-container">{input}</div>
          <div className="message-input">
            <input
              placeholder="Type something"
              value={input}
              onChange={onChangeHandler}
            />
          </div>
        </ChatBox>
      </main>
    </div>
  );
}
