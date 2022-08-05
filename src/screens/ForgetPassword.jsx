import { ErrorMessage } from "@hookform/error-message"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import Backdrop from "../components/Backdrop"
import { apiURL } from "../utils/url"
import toast from "react-hot-toast"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const ForgetPassword = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  })
  const [otpBtn, setOtpBtn] = useState({ disabled: false, time: 60 })

  const handleOtp = () => {
    const startTime = new Date().getTime()

    const timer = setInterval(() => {
      if (new Date().getTime() - startTime > 60000) {
        setOtpBtn({ disabled: false, time: 60 })
        return clearInterval(timer)
      }

      setOtpBtn((prev) => ({ disabled: true, time: prev.time - 1 }))
    }, 1000)

    const inputValues = getValues()

    if (inputValues.phone.length < 10 || inputValues.phone.length > 11) {
      return toast.error("Please enter a valid number & try again")
    }

    // console.log("register", getValues())

    axios
      .post(`${apiURL}/sendForgetPasswordOtp`, {
        mobile_no: parseInt(inputValues.phone).toString(),
      })
      .then(function (response) {
        // console.log(response)
        if (response.data.status == true) {
          return toast.success("OTP sent successfully!!")
        } else if (response.data.status == false) {
          return toast.error(response.data.msg)
        }

        throw new Error("Something went wrong")
      })
      .catch(function (error) {
        toast.error(error.message || "Something went wrong")
        // console.log("error", error)
      })
  }

  const onSubmit = (data) => {
    setLoading(true)
    // console.log(data)
    axios
      .post(`${apiURL}/changeForgetPassword`, {
        mobile_no: data.phone,
        otp: data.otp,
        password: data.newPassword,
      })
      .then((response) => {
        if (response.data.status == true) {
          toast.success("Password reset successfully. Redirecting to login!!")
          return navigate("/login")
        } else if (response.data.status == false) {
          return toast.error(response.data.msg || "Something went Wrong")
        }

        throw new Error("Something went wrong")
      })
      .catch((error) => {
        toast.error(error.message || "Something went wrong")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="w-full lg:w-1/2 bg-white p-1 rounded-lg lg:rounded-l-none py-10">
      {loading && <Backdrop color="blue" />}

      <h4 className="text-black text-3xl font-bold px-4 mb-6 ">Forget Password</h4>

      <div className="px-4 mb-4 text-start">
        {/* <h3 className="pt-4 mb-2 text-2xl font-bold">Forgot Your Password?</h3> */}
        <p className="mb-4 text-lg text-gray-700">Follow the below steps to set new password</p>
      </div>
      <form className="px-4 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="phone">
            Phone
          </label>
          <input
            {...register("phone", {
              validate: (v) => parseInt(v).toString().length === 10 || "Please Enter a valid 10 digit number",
            })}
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="phone"
            required
            type="number"
            placeholder="Enter registered phone number"
          />
          <ErrorMessage
            errors={errors}
            name="phone"
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
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="otp">
            OTP
          </label>
          <div className="flex space-x-1">
            <input
              {...register("otp")}
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="otp"
              type="number"
              placeholder="Enter OTP"
            />
            <button onClick={handleOtp} disabled={otpBtn.disabled} type="button" className={` bg-blue-500 w-1/3 p-1 px-4 rounded-lg ${otpBtn.disabled ? "opacity-25" : "hover:bg-blue-700"} `}>
              {otpBtn.disabled ? `${otpBtn.time}` : `Send OTP`}
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="newPassword">
            New password
          </label>
          <input
            {...register("newPassword", { minLength: { value: 5, message: "Password should be min 5 characters" }, maxLength: { value: 20, message: "Password should be max 20 characters" } })}
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="newPassword"
            name="newPassword"
            type="password"
            placeholder="New password"
            required
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

        <div className="mb-6 text-center">
          <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline">
            Reset Password
          </button>
        </div>
        <hr className="mb-6 border-t" />
        <div className="text-center">
          <Link className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800" to="/register">
            Create an Account!
          </Link>
        </div>
        <div className="text-center">
          <Link className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800" to="/login">
            Already have an account? Login!
          </Link>
        </div>
      </form>
    </div>
  )
}

export default ForgetPassword
