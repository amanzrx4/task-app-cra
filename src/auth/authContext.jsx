import axios from "axios"
import React, { useContext, useState, useEffect } from "react"
import toast from "react-hot-toast"
import Backdrop from "../components/Backdrop"
import { apiURL } from "../utils/url"
const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // const getUser = () => {
  //   const token = localStorage.getItem("token")
  //   console.log("yes token running", token)
  //   if (!token) {
  //     console.log(1)
  //     return setLoading(false)
  //   }
  //   axios
  //     .get(`${apiURL}/user`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       if (res.data.status == true) {
  //         console.log("rest", res)
  //         return res.data
  //       }
  //       console.log(2)
  //       return null
  //     })
  //     .catch(() => {
  //       console.log(3)
  //       return null
  //     })
  //     .finally(() => {
  //       setLoading(false)
  //     })
  // }

  const setUser = () => {
    setLoading(true)
    const token = localStorage.getItem("token")

    if (!token) return setLoading(false)
    axios
      .get(`${apiURL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status == true) {
          setCurrentUser(res.data)
          setLoading(false)
          return
        }
        setCurrentUser(null)
        throw new Error("Unauthenticated")
      })
      .catch((e) => {
        setCurrentUser(null)
        toast.error(e.message || "Something went wrong")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const logOut = () => {
    localStorage.removeItem("token")
    setCurrentUser(null)
  }

  // function signup(email, password) {
  // 	return auth.createUserWithEmailAndPassword(email, password)
  // }

  // function login(email, password) {
  // 	return auth.signInWithEmailAndPassword(email, password)
  // }

  // function logout() {
  // 	return auth.signOut()
  // }

  // function resetPassword(email) {
  // 	return auth.sendPasswordResetEmail(email)
  // }

  // function updateEmail(email) {
  // 	return currentUser.updateEmail(email)
  // }

  // function updatePassword(password) {
  // 	return currentUser.updatePassword(password)
  // }

  useEffect(() => {
    setUser()
  }, [])

  // 	return unsubscribe
  // }, [])

  const value = {
    currentUser,
    setCurrentUser,
    logOut,
    setUser,
    loading,
  }

  return (
    <AuthContext.Provider value={value}>
      {loading ? <Backdrop color="blue" /> : children}
      {/* {!loading && children} */}
    </AuthContext.Provider>
  )
}
