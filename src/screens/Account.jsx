import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import toast from "react-hot-toast"

import { IoWalletOutline as Withdraw } from "react-icons/io5"
import { RiWallet3Line as Recharge } from "react-icons/ri"
import { TbFileDollar as Record } from "react-icons/tb"
import { Link } from "react-router-dom"
import { useAuth } from "../auth/authContext"
import Backdrop from "../components/Backdrop"
import ListItem from "../components/ListItem"
import { listItemData } from "../data/listItemData"

const Account = () => {
  const { currentUser, logOut, setUser, loading } = useAuth()

  const statsRefresh = () => {
    setUser()
    toast.success("Refresh success")
  }

  return (
    <>
      {loading && <Backdrop color="blue" />}
      <main className="p-2 py-2">
        <section className="bg-blue-600 rounded-lg flex flex-col w-full space-y-5 p-2 py-4">
          <div>
            <h4 className="text-white text-sm text-opacity-40">Total Revenue</h4>
            <h2 className="text-xl pt-1">{currentUser && currentUser.data.total_revenue} Rs</h2>
          </div>

          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-white text-sm text-opacity-40">Current Balance</h4>
              <h2 className="text-xl pt-1">{currentUser && currentUser.data.amount} Rs</h2>
            </div>
            <div>
              <Link to="/recharge">
                <button className="p-2 px-3 rounded-lg bg-blue-800 text-sm">Recharge</button>
              </Link>
              <Link to="/withdraw">
                <button className="p-2 px-3 ml-2 bg-blue-800 rounded-lg text-sm">Withdraw</button>
              </Link>
            </div>
          </div>
        </section>

        <section className="flex flex-col space-y-5 my-6">
          <div className="flex items-center">
            {/* icon */}
            <FontAwesomeIcon onClick={statsRefresh} size="lg" icon={faArrowsRotate} color="blue" className="inline p-2 cursor-pointer" />

            <h4 className="text-black font-semibold ml-2 text-lg">Money Record</h4>
          </div>

          <div className="flex justify-around ">
            <Link to="/record" className="flex flex-col space-y-1   flex-1 items-center">
              <Record size={50} className="bg-blue-500 p-2 rounded-full" />
              <h4 className="text-black text-sm">Record</h4>
            </Link>

            <Link to="/recharge" className="flex flex-col space-y-1 flex-1 items-center">
              <Recharge size={50} className="text-sm bg-blue-500 p-2 rounded-full" />

              <h4 className="text-black text-sm">Recharge</h4>
            </Link>

            <Link to="/withdraw" className="flex flex-col space-y-1 flex-1 items-center">
              <Withdraw size={50} className="  bg-blue-500 p-2 rounded-full" />

              <h4 className="text-black text-sm">Withdraw</h4>
            </Link>
          </div>
        </section>

        {listItemData.map(({ text, icon, route }) => {
          return <ListItem key={text} icon={icon} text={text} route={route} />
        })}

        <button className="text-white bg-blue-600 w-full mt-10 py-2 rounded-full" onClick={logOut}>
          LOG OUT
        </button>
      </main>
    </>
  )
}

export default Account
