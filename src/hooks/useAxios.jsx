import { useState, useEffect } from "react"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"

axios.defaults.baseURL = "https://admin.vrmgrooup.in/api"

export const useAxios = (config, deps) => {
  const [response, setResponse] = useState(undefined)
  const [error, setError] = useState(undefined)
  const [loading, setLoading] = useState(true)

  const getData = async (params) => {
    setLoading(true)
    try {
      const result = await axios.request(params)
      // console.log("raw response", result)
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

  useEffect(() => {
    let isMounted = true

    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    if (isMounted) {
      // console.log("config now", config)
      getData(config)
    }

    return () => {
      isMounted = false
    }
  }, [deps])

  return { response, error, loading, toast, getData }
}
