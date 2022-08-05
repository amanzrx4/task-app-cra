import { ErrorMessage } from "@hookform/error-message"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import { apiURL } from "../utils/url"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Backdrop from "../components/Backdrop"
import { useAuth } from "../auth/authContext"
import logo from "../assets/logo.png"
const Login = () => {
  const navigate = useNavigate()
  const { setCurrentUser, setUser } = useAuth()

  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  })

  const onSubmit = (data) => {
    setLoading(true)

    axios
      .post(`${apiURL}/login`, {
        mobile_no: parseInt(data.userNum).toString(),
        password: data.password,
      })
      .then((response) => {
        if (response.data.status == true) {
          localStorage.setItem("token", response.data.token)
          setUser()
          toast.success(response.data.msg)
          navigate("/")
          setLoading(false)
          return
        }

        throw new Error(response.data.msg || "Something Went wrong")
      })
      .catch((error) => {
        // console.log(error)

        toast.error(error.message || "Something went wrong")
        setLoading(false)
      })

    // console.log("onSubmit", data)
  }

  return (
    <>
      {loading && <Backdrop color="blue" />}
      <div className="min-h-full h-[100vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img className="mx-auto w-auto h-40" src={logo} alt="Workflow" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm space-y-4">
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
                  id="userNum"
                  name="userNum"
                  type="number"
                  autoComplete="on"
                  required
                  className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                        <p className="text-red-500 !mt-0" key={type}>
                          {message}
                        </p>
                      ))
                    : null
                }}
              />

              <div>
                <input
                  {...register("password")}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgetPassword" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                disabled={loading}
                type="submit"
                className="file:group relative w-full flex justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 bg-indigo-600"
              >
                Sign in
              </button>
            </div>

            <div className="text-gray-900 text-lg mx-auto text-center">
              Don't have an account?{" "}
              <span className="text-indigo-600 font-semibold cursor-pointer ">
                <Link to="/register">Register</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
