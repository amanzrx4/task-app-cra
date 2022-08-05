import React, { useState } from "react"
import BackWrapper from "../components/BackWrapper"
import RechargeAmount from "./RechargeAmount"
import RechargeDetails from "./RechargeDetails"

const Recharge = () => {
  const [state, setState] = useState({
    step: 1,
    transaction_id: "",
    amount: "",
  })

  switch (state.step) {
    case 1:
      return (
        <BackWrapper text="Recharge">
          <RechargeAmount setState={setState} />
        </BackWrapper>
      )

    case 2:
      return <RechargeDetails state={state} setState={setState} />
    default:
  }
}

export default Recharge
