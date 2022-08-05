import React from "react"
import { BrowserRouter, Routes, Route, HashRouter, useLocation, Navigate, Link } from "react-router-dom"
import "./index.css"
import Layout from "./layout/Layout"
import Account from "./screens/Account"
import Home from "./screens/Home"

import Login from "./screens/Login"
import Register from "./screens/Register"
import Recharge from "./screens/Recharge"
import Withdraw from "./screens/Withdraw"
import Invite from "./screens/Invite"
import ForgetPassword from "./screens/ForgetPassword"
import Newpassword from "./screens/Newpassword"
import Bindbank from "./screens/Bindbank"
import Record from "./screens/Record"
import { useAuth } from "./auth/authContext"
import Team from "./screens/Team"
import Profit from "./screens/Profit"
import NotFound from "./screens/NotFound"
import Invest from "./screens/Invest"
import MyPlans from "./screens/MyPlans"
import { Toaster } from "react-hot-toast"

const App = () => {
   
  return (
    <BrowserRouter>
      <>
        <Routes>
          {/* <Layout> */}
          <Route exact path="/" element={<Navigate to="/home" replace />} />

          <Route
            exact
            path="/my"
            element={
              <RequireAuth>
                <Layout>
                  <Account />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/invest"
            element={
              <RequireAuth>
                <Layout>
                  <Invest />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/home"
            element={
              <RequireAuth>
                <Layout>
                  <Home />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/profit"
            element={
              <RequireAuth>
                <Layout>
                  <Profit />
                </Layout>
              </RequireAuth>
            }
          />

          <Route
            exact
            path="/recharge"
            element={
              <RequireAuth>
                <Recharge />
              </RequireAuth>
            }
          />

          <Route
            exact
            path="/withdraw"
            element={
              <RequireAuth>
                <Withdraw />
              </RequireAuth>
            }
          />

          <Route
            exact
            path="/invite"
            element={
              <RequireAuth>
                <Invite />
              </RequireAuth>
            }
          />

          <Route
            exact
            path="/newPassword"
            element={
              <RequireAuth>
                <Newpassword />
              </RequireAuth>
            }
          />

          <Route
            exact
            path="/bindBank"
            element={
              <RequireAuth>
                <Bindbank />
              </RequireAuth>
            }
          />

          <Route
            exact
            path="/myPlans"
            element={
              <RequireAuth>
                <MyPlans />
              </RequireAuth>
            }
          />

          <Route
            exact
            path="/record"
            element={
              <RequireAuth>
                <Record />
              </RequireAuth>
            }
          />

          <Route
            exact
            path="/team"
            element={
              <RequireAuth>
                <Layout>
                  <Team />
                </Layout>
              </RequireAuth>
            }
          />

          <Route
            exact
            path="/login"
            element={
              <RedirectRoute>
                <Login />
              </RedirectRoute>
            }
          />
          <Route
            path="/register"
            element={
              <RedirectRoute>
                <Register />
              </RedirectRoute>
            }
          />
          <Route
            exact
            path="/forgetPassword"
            element={
              <RedirectRoute>
                <ForgetPassword />
              </RedirectRoute>
            }
          />

          {/* <Route
            exact
            path="/support"
            element={() => {
              window.location.href = "http://anotherhost/anotherroute5"
              return null
            }}
          /> */}

          <Route path="*" element={<NotFound />} />
        </Routes>

        <Toaster
          containerStyle={{
            marginBottom: "70px",
          }}
          position="bottom-center"
          toastOptions={{
            success: {
              duration: 3000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
      </>
    </BrowserRouter>
  )
}

export default App

function RequireAuth({ children }) {
  const { currentUser } = useAuth()
  // console.log("current user", currentUser)

  let location = useLocation()

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return children
}

function RedirectRoute({ children }) {
  const { currentUser } = useAuth()

  let location = useLocation()

  if (currentUser) {
    return <Navigate to="/" replace />
  }

  return children
}
