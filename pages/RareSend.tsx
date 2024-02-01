import { parseEther } from "ethers/lib/utils.js";
import React, { useState } from "react";
import { useDebounce } from "use-debounce";
import { usePrepareSendTransaction, useSendTransaction } from "wagmi";
import styles from "@/styles/Home.module.css";

// what this does is simply disable the SendFunds function if the value passed is false
interface SendFundsProps {
  disabled?: boolean;
}

export default function SendFunds(props: SendFundsProps) {
  // declare two state variables for the recipient and the amount
  const [to, setTo] = useState("");
  const [debouncedTo] = useDebounce(to, 500); // useDebounce() hook to debounce the recipient input

  const [amount, setAmount] = useState("");
  const [debouncedAmount] = useDebounce(amount, 500); // useDebounce() hook to debounce the amount input

  // use the usePrepareSendTransaction() hook to prepare a transaction request
  const { config } = usePrepareSendTransaction({
    request: {
      to: debouncedTo, // recipient from debounced input
      value: debouncedAmount ? parseEther(debouncedAmount) : undefined, // amount from debounced input
    },
  });

  // use the useSendTransaction() hook to create a transaction and send it
  const { sendTransaction } = useSendTransaction(config);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendTransaction?.(); // if sendTransaction is defined, execute it
        }}
      >
        <div className={styles.inputcontainer}>
          <input
            aria-label="Recipient"
            onChange={(e) => setTo(e.target.value)} // update the recipient state on input change
            placeholder="Address destination"
            value={to}
            className={styles.myinput}
          />
          <input
            aria-label="Amount (ether)"
            onChange={(e) => setAmount(e.target.value)} // update the amount state on input change
            placeholder="enter amount"
            value={amount}
            className={styles.myinput}
          />
        </div>
        <div className={styles.buttoncontainer}>
          <button
            disabled={!sendTransaction || !to || !amount}
            className={styles.button64}
          >
            Send
          </button>{" "}
          {/* disable the button if required fields are empty */}
        </div>
      </form>
    </>
  );
}