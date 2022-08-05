import React from "react"
import { IoIosArrowForward } from "react-icons/io"
import { Link } from "react-router-dom"
import { RiBankCardLine } from "react-icons/ri"
import { AccountBalanceWallet } from "@mui/icons-material"
import { supportURL } from "../utils/url"

const icons = {
  AccountBalanceWallet,
  RiBankCardLine,
}

const ListItem = ({ icon, text, route }) => {
  if (route.toLowerCase() == "support") {
    return (
      <>
        <a href={supportURL} target="_blank" rel="noreferrer">
          <div className="w-full flex hover:bg-gray-100 items-center py-2 rounded-lg ">
            {React.createElement(icon, { fontSize: "small", className: "mr-2 border-1 border border-blue-500 rounded-full p-0.5 text-blue-500" })}
            <h4 className="text-black text-[1rem]">{text}</h4>
            <IoIosArrowForward size={20} className="ml-auto" color="black" />
          </div>
        </a>
      </>
    )
  }

  return (
    <>
      <Link to={`/${route}`}>
        <div className="w-full flex hover:bg-gray-100 items-center py-2 rounded-lg ">
          {React.createElement(icon, { fontSize: "small", className: "mr-2 border-1 border border-blue-500 rounded-full p-0.5 text-blue-500" })}
          <h4 className="text-black text-[1rem]">{text}</h4>
          <IoIosArrowForward size={20} className="ml-auto" color="black" />
        </div>
      </Link>
    </>
  )
}

export default ListItem
