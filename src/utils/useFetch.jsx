import { useState, useEffect } from "react"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"

axios.defaults.baseURL = "https://admin.vrmgrooup.in/api"

export const useFetch = () => {
  const token = localStorage.getItem("token")
  const [response, setResponse] = useState(undefined)
  const [error, setError] = useState(undefined)
  const [loading, setLoading] = useState(false)

  const fetchData = async (params) => {
    params = { ...params, headers: { Authorization: `Bearer ${token}` } }

    setLoading(true)
    // console.log("_____________________fetch data")
    try {
      const result = await axios.request(params)
      // console.log("raw response_______", result)
      if (result.status == 200) {
        setResponse(result.data)

        if (result.data.status == true) {
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

  // useEffect(() => {
  //   const token = localStorage.getItem("token")
  //   config.headers.Authorization = `Bearer ${token}`
  //   console.log("config now", config)
  //   fetchData(config)
  //   console.log("fetch data ran")
  // }, [])

  return { response, error, loading, toast, fetchData }
}
