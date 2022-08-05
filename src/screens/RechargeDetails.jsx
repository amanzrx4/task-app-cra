import React, { useState } from "react"
import Button from "../components/Button"
import { useFetch } from "../utils/useFetch"
import { Toaster } from "react-hot-toast"
import { Link } from "react-router-dom"
import { useAuth } from "../auth/authContext"
import _ from "lodash"
const RechargeDetails = ({ setState, state }) => {
  const [UTR, setUTR] = useState("")

  const { currentUser } = useAuth()

  const { response, loading, error, toast, fetchData } = useFetch()

  const onSubmit = (data) => {
    const token = localStorage.getItem("token")

    fetchData({
      method: "POST",
      url: "/updateUtrNo",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
      data: {
        transaction_id: state.transaction_id,
        utr_no: UTR,
      },
    })
  }

  return (
    <div className="py-8 px-4 text-black flex flex-col space-y-6 items-start">
      <h4 className="text-2xl font-semibold">Please transfer exactly {state.amount} to the below details</h4>

      {Object.keys(currentUser.admin).map(function (key) {
        return (
          <>
            <div className="">
              <h3>{_.startCase(key)}</h3>

              <div className="flex space-x-4 items-center">
                <input
                  disabled
                  type="text"
                  value={currentUser.admin[key]}
                  className="form-control block
          w-full
          px-4
          py-2
          text-xl
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
        "
                  id="recharge"
                />

                <button
                  className="px-3 py-2 bg-red-400 text-white"
                  onClick={() => {
                    navigator.clipboard.writeText(currentUser.admin[key]).then(() => toast.success("Copied"))
                  }}
                >
                  Copy
                </button>
              </div>
            </div>
          </>
        )
      })}

      <hr />

      <h4 className="text-4xl font-bold">Transaction Details</h4>

      <div>
        <h4>Enter UTR number</h4>
        <input
          type="text"
          value={UTR}
          onChange={(e) => setUTR(e.target.value)}
          className="form-control block
          w-full
          px-4
          py-2
          text-xl
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
        "
          id="recharge"
        />
      </div>

      <Button onClick={onSubmit} active={UTR}>
        Submit
      </Button>

      <Link to="/home">
        <button className="bg-green-500 text-white w-full py-2 px-8 rounded-full ">Back Home</button>
      </Link>

      <Toaster
        containerStyle={{
          marginBottom: "70px",
        }}
        position="bottom-center"
        toastOptions={{
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
 
    </div>
  )
}

export default RechargeDetails
