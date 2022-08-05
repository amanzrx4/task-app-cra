import React, { useState } from "react"
import { useForm } from "react-hook-form"
import BackWrapper from "../components/BackWrapper"
import Backdrop from "../components/Backdrop"
import { ErrorMessage } from "@hookform/error-message"
import {apiURL} from "../utils/url"
import axios from "axios"
import toast from "react-hot-toast"
const Newpassword = () => {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm({
    criteriaMode: "all",
  })

  const onSubmit = (data, event) => {
    const token = localStorage.getItem("token")

    const { currentPassword, newPassword, confirm } = data

    setLoading(true)

    axios
      .post(
        `${apiURL}/resetPassword`,
        {
          old_password: currentPassword,
          new_password: newPassword,
          cnf_password: confirm,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // console.log(response)
        if (response.data.status === true) {
          return toast.success(response.data.msg)
        } else if (response.data.status === false) {
          return toast.error(response.data.msg || "Something went Wrong")
        }
        throw new Error("something went wrong!")
      })
      .catch((error) => {
        toast.error(error.message || "Something Went wrong!!")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <BackWrapper text="Update password">
      {loading && <Backdrop color="blue" />}

      <div onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-14">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Set New Password</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm space-y-6">
              <div>
                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="currentPassword">
                  Current Password
                </label>
                <input
                  {...register("currentPassword")}
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  autoComplete="on"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  //   placeholder="Username or Phone Number"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="newPassword">
                  New Password
                </label>

                <input
                  {...register("newPassword", { minLength: { value: 5, message: "Password should be min 5 characters" }, maxLength: { value: 20, message: "Password should be max 20 characters" } })}
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  required
                  className="flex-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
                <ErrorMessage
                  errors={errors}
                  name="newPassword"
                  render={({ messages }) => {
                    // console.log("messages", messages)
                    return messages
                      ? Object.entries(messages).map(([type, message]) => (
                          <p className="text-red-500" key={type}>
                            {message}
                          </p>
                        ))
                      : null
                  }}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="confirm">
                  Confirm Password
                </label>
                <input
                  {...register("confirm", { validate: (v) => v === getValues().newPassword || "Passwords do not match" })}
                  id="confirm"
                  name="confirm"
                  type="password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
                <ErrorMessage
                  errors={errors}
                  name="confirm"
                  render={({ messages }) => {
                    // console.log("messages", messages)
                    return messages
                      ? Object.entries(messages).map(([type, message]) => (
                          <p className="text-red-500" key={type}>
                            {message}
                          </p>
                        ))
                      : null
                  }}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group text-lg relative w-full flex justify-center py-4 px-6 border border-transparent  font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                UPDATE PASSWORD
              </button>
            </div>
          </form>
        </div>
      </div>

       
    </BackWrapper>
  )
}

export default Newpassword
