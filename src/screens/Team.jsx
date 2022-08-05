import _ from "lodash"
import React, { useState } from "react"
import Backdrop from "../components/Backdrop"
import { useAxios } from "../hooks/useAxios"
import { hideMiddle } from "../utils/hideMiddle"

const Team = () => {
  const [level, setLevel] = useState(1)

  const { response, loading, error, toast } = useAxios(
    {
      method: "GET",
      url: `/teams/${level}`,
      headers: {
        accept: "*/*",
      },
    },
    level
  )

  return (
    <>
      <div>
        <div className="flex w-full border-blue-500 text-center fixed top-0 h-12">
          <div
            onClick={() => {
              if (level === 1) return
              setLevel(1)
            }}
            className={`bg-red-400 flex items-center justify-center flex-1 py-4 text-lg px-1 cursor-pointer hover:bg-red-800 ${level === 1 ? "border-b-8 border-black !bg-red-900" : ""}`}
          >
            <h1 className="text-center text-sm font-semibold drop-shadow-2xl shadow-black text-white">First Level</h1>
          </div>
          <div
            onClick={() => setLevel(2)}
            className={`bg-blue-400 flex items-center justify-center flex-1 py-4 text-lg px-1 cursor-pointer hover:bg-blue-800 ${level === 2 ? "border-b-8 border-black !bg-blue-900" : ""}`}
          >
            <h1 className="text-center  text-sm  font-semibold drop-shadow-2xl shadow-black text-white">Second Level</h1>
          </div>
          <div
            onClick={() => setLevel(3)}
            className={`bg-green-500 flex items-center justify-center flex-1 py-4 text-lg px-1 cursor-pointer hover:bg-green-800 ${level === 3 ? "border-b-8 border-black !bg-green-900" : ""}`}
          >
            <h1 className="text-center text-sm  font-semibold drop-shadow-2xl shadow-black text-white">Third Level</h1>
          </div>
        </div>

        <div className="bg-blue-600 px-2 py-4 flex justify-between items-center text-center rounded-lg m-2 mt-14">
          <h4 className="flex-1 text-white font-bold">Mobile</h4>

          <h4 className="flex-1 text-white border-l-2 border-r-2 border-white font-bold">Username</h4>
          <h4 className="text-white flex-1 font-bold">Earning</h4>
        </div>

        {loading && <Backdrop color="blue" />}

        {/*  */}
        {response &&
          (response.data.length > 0 ? (
            <div>
              {response.data.map((profit, i) => {
                const { mobile_no, today_amount, username } = profit

                return (
                  <div key={i} className="bg-blue-100 px-2 py-4 flex justify-between items-center rounded-lg m-2 text-center border border-gray-200 shadow-md">
                    <h4 className="flex-1 text-sm text-black">{hideMiddle(mobile_no.toString(), 3, 2)}</h4>
                    <h4 className="flex-1 text-sm text-black">{parseInt(username).toString().length == 10 ? hideMiddle(username.toString(), 3, 2) : username}</h4>
                    <div className="flex flex-col items-center flex-1">
                      <h4 className="text-blue-700 text-sm">₹{today_amount}</h4>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-xl text-center my-8 text-blue-500">Nothing to show here</div>
          ))}
      </div>
    </>
  )
}

export default Team
