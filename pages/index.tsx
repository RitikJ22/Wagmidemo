import { useAccount, useConnect } from "wagmi";
import SendFunds from "./RareSend";
import { useEffect } from "react";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const { connect, connectors } = useConnect();
  const { isConnected } = useAccount();

  useEffect(() => {
    console.log(
      `Current connection status: ${isConnected ? "connected" : "disconnected"}`
    );
  }, [isConnected]);

  return (
    <>
      <p
        className={styles.status}
        style={{
          color: isConnected ? "green" : "red",
        }}
      >
        {" "}
        {isConnected !== undefined
          ? isConnected
            ? "Connected"
            : "Disconnected"
          : "loading..."}
      </p>
      <div className={styles.maincontainer}>
        <div className={styles.container}>
          <div className={styles.buttonswrapper}>
            <div className={styles.buttonswrapperGrid}>
              {connectors.map((connector) => (
                <button
                  suppressHydrationWarning
                  key={connector.id}
                  onClick={() => connect({ connector })}
                  className={styles.button28}
                >
                  {connector.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* send funds */}
        <SendFunds disabled={!isConnected} />
        {/* mint nft */}
      </div>
    </>
  );
}