import React, { useEffect, useState } from "react"
import BackWrapper from "../components/BackWrapper"
import Button from "../components/Button"
import { useForm } from "react-hook-form"
import Backdrop from "../components/Backdrop"
import { useFetch } from "../utils/useFetch"
import { useAxios } from "../hooks/useAxios"
import _ from "lodash"
import Modal from "../utils/Modal"

const Bindbank = () => {
  const config = {
    method: "GET",
    url: "/bank",
    headers: {
      accept: "*/*",
    },
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm()
  const { response, loading, error, toast, fetchData } = useFetch()

  const { response: bankRes, loading: bankLoad, error: bankError, getData } = useAxios(config, response)

  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    console.log("useEffect ran")
    if (!bankRes || _.isEmpty(bankRes.data)) return
    reset(bankRes.data[0])
  }, [bankRes])

  const onSubmit = (data) => {
    // return console.log(data)
    const postData = {
      phone_no: parseInt(data.phone_no).toString(),
      account_no: data.account_no.toString(),
      bank_name: data.bank_name.toString(),
      ifsc_code: data.ifsc_code.toString(),
      name: data.name.toString(),
      email: "example@gmail.com",
      ...(bankRes.data.length > 0 && { withdrawl_id: bankRes.data[0].id }),
    }

    fetchData({
      method: "POST",
      url: "/addBank",
      headers: {
        accept: "*/*",
      },
      data: postData,
    })
      .then()
      .finally(() => setShowModal(false))
  }

  // bankRes

  // account_no: "12397"
  // bank_name: "bank name"
  // created_at: "2022-08-05T06:25:47.000000Z"
  // id: 6
  // ifsc_code: "kfdjh 12323"
  // name: "iyhf aidfh"
  // phone_no: "123123"
  // updated_at: "2022-08-05T06:25:47.000000Z"
  // user_id: "10"

  return (
    <>
      <BackWrapper text="Bind bank details">
        <div className="mt-14 flex flex-col p-6 py-8 space-y-8">
          {(loading || bankLoad) && <Backdrop color="blue" />}
          <Modal
            text={"Are you sure you want to update bank details"}
            show={showModal}
            onAbort={() => {
              reset()
              setShowModal(false)
            }}
            onConfirm={handleSubmit(onSubmit)}
          />

          {bankRes && bankRes.status == true && bankRes.data.length > 0 ? (
            <>
              <div>
                {/* <h2 className="text-xl font-bold underline">Current Bank details </h2>
                <h3 className="text-lg">
                  Bank Name: <span className="font-semibold"> {bankRes.data[0].bank_name}</span>
                </h3>
                <h3 className="text-lg">
                  Bank account number: <span className="font-semibold">{bankRes.data[0].account_no}</span>
                </h3>
                <h3 className="text-lg">
                  IFSC: <span className="font-semibold">{bankRes.data[0].ifsc_code}</span>
                </h3>
                <h3 className="text-lg">
                  Account holder name: <span className="font-semibold">{bankRes.data[0].name}</span>
                </h3>
                <h3 className="text-lg">
                  Phone Number: <span className="font-semibold">{bankRes.data[0].phone_no}</span>
                </h3> */}
                <div className="text-xl text-center my-2 text-blue-500">Update Bank details!</div>
              </div>
            </>
          ) : (
            <div className="text-xl text-center my-4 text-blue-500">NO Bank added. Add New!</div>
          )}

          <form className="flex flex-col space-y-3 w-full">
            <div className="flex space-x-4 items-center">
              <label htmlFor="bank_name" className="text-gray-700 text-lg w-1/3">
                Bank name:
              </label>

              <input
                {...register("bank_name")}
                name="bank_name"
                type="text"
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
            </div>

            <div className="flex space-x-4 items-center">
              <label htmlFor="phone" className="text-gray-700 text-lg w-1/3">
                Phone no.:
              </label>

              <input
                {...register("phone_no")}
                name="phone_no"
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
            </div>
            <div className="flex space-x-4 items-center">
              <label htmlFor="account_no" className="text-gray-700 text-lg w-1/3">
                Bank Account no.:
              </label>

              <input
                {...register("account_no")}
                name="account_no"
                type="text"
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
            </div>
            <div className="flex space-x-4 items-center">
              <label htmlFor="ifsc_code" className="text-gray-700 text-lg w-1/3">
                IFSC:
              </label>

              <input
                {...register("ifsc_code")}
                name="ifsc_code"
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
            </div>
            {/* 
            <div className="flex space-x-4 items-center">
              <label htmlFor="email" className="form-label inline-block mb-2 text-gray-700 text-lg w-1/3">
                Email:
              </label>

              <input
                {...register("email")}
                name="email"
                type="email"
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
            </div> */}
            <div className="flex space-x-4 items-center">
              <label htmlFor="name" className="form-label inline-block mb-2 text-gray-700 text-lg w-1/3">
                Enter Account holder's full name:
              </label>

              <input
                {...register("name")}
                name="name"
                type="text"
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
            </div>

            <Button type="button" disabled={!isDirty} bgColor={bankRes && bankRes.status == true && bankRes.data.length > 0 && "bg-green-600"} active={true} onClick={() => setShowModal(true)}>
              {bankRes && bankRes.status == true && bankRes.data.length > 0 ? "Update Bank Details" : "Add New Bank"}
            </Button>
          </form>
        </div>
      </BackWrapper>
    </>
  )
}

export default Bindbank
