import { ErrorMessage } from "@hookform/error-message"
import axios from "axios"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import Backdrop from "../components/Backdrop"

const commonRecharges = [1000, 3000, 5000, 7000, 10000, 15000, 20000, 50000]

const RechargeAmount = ({ setState }) => {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isDirty, isSubmitting, errors },
  } = useForm({ defaultValues: { amount: "" } })

  const onSubmit = async (data) => {
    setState((prev) => ({ ...prev, amount: data.amount }))

    setLoading(true)
    const token = localStorage.getItem("token")
    try {
      const result = await axios.post(
        "/addAmount",
        { amount: data.amount },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      // console.log("raw response", result)
      if (result.status == 200) {
        setResponse(result.data)
        // console.log(result)

        if (result.data.status == true) {
          setState((prev) => ({ ...prev, transaction_id: result.data.transaction_id, step: prev.step + 1 }))

          return toast.success(result.data.msg || "Success")
        }
        if (result.data.status == false) {
          return toast.error(result.data.msg || "Failed")
        }
      }

      throw new Error("Something went wrong. Try again!!")
    } catch (error) {
      toast.error("Something went wrong")
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {loading && <Backdrop color="blue" />}

      <div className="py-2 mt-14 px-3 text-black flex flex-col space-y-6">
        <h4 className="text-2xl font-semibold">Enter Amount</h4>

        <form id="myform" className="flex space-x-4 items-center" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="recharge" className="form-label inline-block mb-2 text-gray-700 text-2xl">
            ₹
          </label>

          <input
            {...register("amount", { min: { value: 20, message: "The minimum amount should be 20" } })}
            required
            name="amount"
            id="amount"
            placeholder="Recharge Amount"
            type="number"
            className="form-control block
								w-full
								px-2
								py-1
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
          />

          <h4 className="text-lg">Amount</h4>
        </form>
        <ErrorMessage
          errors={errors}
          name="amount"
          render={({ messages }) => {
            return messages
              ? Object.entries(messages).map(([type, message]) => (
                  <p className="text-red-500 !mt-0" key={type}>
                    {message}
                  </p>
                ))
              : null
          }}
        />

        <div>
          <h4>1. Fill in the callback UTR correctly, and the account will be credited within 1 minute</h4>
          <h4>2. If you forget to fill in the UTR, please contact the online customer service in time to help you solve the problem of the safe arrial of funds</h4>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {commonRecharges.map((amount) => {
            return (
              <button key={amount} type="button" onClick={() => setValue("amount", amount, { shouldDirty: true })} className="appearance-none px-4 py-2 text-white bg-indigo-400 rounded-lg">
                {amount}
              </button>
            )
          })}
        </div>

        <hr />

        <button form="myform" className="bg-blue-500 w-full rounded-full text-white py-2 disabled:bg-blue-200" type="submit" disabled={!isDirty}>
          Confirm recharge
        </button>

       
      </div>
    </>
  )
}

export default RechargeAmount
