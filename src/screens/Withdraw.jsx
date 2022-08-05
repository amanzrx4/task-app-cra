import React from "react"
import BackWrapper from "../components/BackWrapper"
import { useForm } from "react-hook-form"
import { useAxios } from "../hooks/useAxios"
import Backdrop from "../components/Backdrop"
import _ from "lodash"
import { Link } from "react-router-dom"
import { useFetch } from "../utils/useFetch"
import { ErrorMessage } from "@hookform/error-message"
const Withdraw = () => {
  const { response: postRes, loading: postLoad, error: postError, toast, fetchData } = useFetch()

  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({
    criteriaMode: "all",
  })

  const { loading, error, response } = useAxios({
    method: "GET",
    url: "/bank",
    headers: {
      accept: "*/*",
    },
  })

  const onSubmit = (data) => {
    const token = localStorage.getItem("token")

    fetchData({
      method: "POST",
      url: "/withdraw",
      data: {
        amount: data.withdraw,
        withdrawl_type_id: response.data[0].id,
      },
    })
  }

  const renderResponse = () => {
    if (_.isEmpty(response.data)) {
      // console.log("repon", response.data)
      return (
        <>
          <div className="flex flex-col space-y-3 my-4">
            <h3 className="text-lg text-red-500 font-bold">There is no bank account, Please add a bank account first!!!</h3>
            <Link to="/bindBank">
              <button className="bg-red-500 w-full rounded-full text-white py-2 px-6">Add Bank</button>
            </Link>
          </div>
        </>
      )
    }
    return (
      <>
        <h2 className="text-xl font-bold">Bank details ===</h2>

        <h3 className="text-lg">
          Bank account number: <span className="font-semibold">{response.data[0].account_no}</span>
        </h3>
        <h3 className="text-lg">
          Bank account name: <span className="font-semibold">{response.data[0].bank_name}</span>
        </h3>
        <h3 className="text-lg">
          Account holder name: <span className="font-semibold">{response.data[0].name}</span>
        </h3>
        <h3 className="text-lg">
          Phone Number: <span className="font-semibold">{response.data[0].phone_no}</span>
        </h3>
      </>
    )
  }

  return (
    <BackWrapper text="Withdraw">
      {loading && <Backdrop color="blue" />}

      <div className="py-6 mt-14 px-4 text-black flex flex-col space-y-6 items-start">
        <div className="border border-blue-800 px-3 py-2 rounded-full">Tax 10%</div>

        <div className="flex space-x-4 items-center">
          <label htmlFor="recharge" className="form-label inline-block mb-2 text-gray-700 text-4xl">
            ₹
          </label>

          <div>
            <input
              {...register("withdraw", {
                min: {
                  value: 200,
                  message: "Minimum withdrawal amount is 200",
                },
              })}
              name="withdraw"
              required
              id="withdraw"
              placeholder="Withdraw Amount"
              type="number"
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
            />
            <ErrorMessage
              errors={errors}
              name="withdraw"
              render={({ messages }) => {
                // console.log("messages", messages)
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                      <p className="text-red-500 !mt-0" key={type}>
                        {message}
                      </p>
                    ))
                  : null
              }}
            />
          </div>

          <h4 className="text-xl">Amount</h4>
        </div>

        {response && renderResponse()}
        {error && (
          <>
            <h3 className="text-red-500 text-lg">{error?.message || "Cannot retrive bank details try again later"}</h3>
          </>
        )}

        {response && !_.isEmpty(response.data) && (
          <button className="bg-blue-500 w-full text-xl rounded-full text-white py-2 px-6 disabled:bg-blue-300" disabled={!isDirty} onClick={handleSubmit(onSubmit)} type="button">
            Submit
          </button>
        )}

        {error && (
          <div>
            <h3 className="text-lg text-red-500">{error.message || "Something went wrong"}</h3>
          </div>
        )}

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"></div>
      </div>
    </BackWrapper>
  )
}

export default Withdraw
