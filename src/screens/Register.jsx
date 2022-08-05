import React, { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import toast from "react-hot-toast"
import axios from "axios"
import { useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../auth/authContext"
import { apiURL } from "../utils/url"
import Backdrop from "../components/Backdrop"
import logo from "../assets/logo.png"

const Register = () => {
  const { currentUser, setCurrentUser, setUser } = useAuth()
  const [loading, setLoading] = useState(false)
  let [searchParams, setSearchParams] = useSearchParams()

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  })

  useEffect(() => {
    const code = searchParams.get("code")
    if (code) {
      setValue("referCode", code, { shouldDirty: true })
    }
  }, [])

  const [otpBtn, setOtpBtn] = useState({ disabled: false, time: 60 })

  const handleOtp = () => {
    const startTime = new Date().getTime()

    const timer = setInterval(() => {
      // console.log("yes")

      if (new Date().getTime() - startTime > 60000) {
        setOtpBtn({ disabled: false, time: 60 })
        return clearInterval(timer)
      }

      setOtpBtn((prev) => ({ disabled: true, time: prev.time - 1 }))
    }, 1000)

    const inputValues = getValues()

    if (inputValues.userNum.length < 10 || inputValues.userNum.length > 11) {
      return toast.error("Please enter a valid number & try again")
    }

    // console.log("register", getValues())

    axios
      .get(`${apiURL}/sendOtpForRegisteration/${inputValues.userNum}`)
      .then(function (response) {
        if (response.data.status == true) {
          return toast.success("OTP sent successfully!!")
        }

        throw new Error(response.data.msg)
      })
      .catch(function (error) {
        toast.error(error.message)
      })

    return
  }

  const onSubmit = (data) => {
    setLoading(true)

    axios
      .post(`${apiURL}/register`, {
        mobile_no: data.userNum,
        password: data.password,
        cnf_password: data.password,
        username: data.userNum,
        withdrawl_password: data.password,
        refer_code: data.referCode,
        otp: data.otp,
      })
      .then((res) => {
        if (res.data.status === true) {
          toast.success("User registered successfully!!")
          localStorage.setItem("token", res.data.token)
          setUser()
          navigate("/home")
          setLoading(false)
          return
        }

        // console.log("first", res)

        throw new Error(res.data.msg)
      })
      .catch((error) => {
        // console.log("error", error)
        toast.error(error.message || "Something went Wrong")
        setLoading(false)
        return
      })
  }

  return (
    <>
      {loading && <Backdrop color="blue" />}
      <div className="min-h-full h-[100vh]  flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img className="mx-auto w-auto h-40" src={logo} alt="Workflow" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register an account</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm space-y-6">
              <div>
                <label htmlFor="username" className="sr-only">
                  username
                </label>

                <div>
                  <div className="flex space-x-2">
                    <input
                      id="num"
                      name="num"
                      type="text"
                      disabled
                      value="+91"
                      className="appearance-none w-1/3 flex px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    />
                    <input
                      {...register("userNum", {
                        validate: (v) => parseInt(v).toString().length === 10 || "Please Enter a valid 10 digit number",
                      })}
                      required
                      minLength="10"
                      maxLength="11"
                      id="userNum"
                      name="userNum"
                      type="number"
                      className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Username or Phone Number"
                    />
                  </div>

                  <ErrorMessage
                    errors={errors}
                    name="userNum"
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

              <div className="flex space-x-3 justify-between">
                <div className="w-full">
                  <label htmlFor="otp" className="sr-only">
                    otp
                  </label>

                  <div className="flex space-x-2">
                    <input
                      {...register("otp")}
                      id="otp"
                      name="otp"
                      type="number"
                      required
                      className="appearance-none flex w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Enter OTP"
                    />

                    <button
                      type="button"
                      onClick={handleOtp}
                      disabled={otpBtn.disabled}
                      className={`w-1/3 text-lg justify-center py-1 px-3 border border-transparent  font-medium rounded-md text-white bg-indigo-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                        otpBtn.disabled ? "opacity-25" : "hover:bg-indigo-700"
                      }`}
                    >
                      {otpBtn.disabled ? `${otpBtn.time}` : `Send OTP`}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="referCode">
                  Referral code
                </label>
                <input
                  {...register("referCode")}
                  id="referCode"
                  name="referCode"
                  type="text"
                  className="appearance-none flex w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Referal code"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  {...register("password", {
                    minLength: {
                      value: 5,
                      message: "Password must be at least 5 characters",
                    },
                    maxLength: {
                      value: 15,
                      message: "Password should not exceed 15 characters",
                    },
                  })}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                <ErrorMessage
                  errors={errors}
                  name="password"
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

            <div className="flex items-start justify-between flex-col space-y-4">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="flex items-center">
                <input required id="privacy-policy" name="privacy-policy" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="privacy-policy" className="ml-2 block text-sm text-gray-900">
                  I agree to the&nbsp;
                  <span className="text-indigo-600 cursor-pointer">privacy policy</span>
                </label>
              </div>
            </div>

            <div>
              <button
                disabled={loading}
                type="submit"
                // onClick={handleSubmit(onSubmit)}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                Register
              </button>
            </div>

            <div className="text-gray-900 text-lg mx-auto text-center">
              Already have an account?{" "}
              <span className="text-indigo-600 font-semibold cursor-pointer ">
                <Link to="/login">Login</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register
