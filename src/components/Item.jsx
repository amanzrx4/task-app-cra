import React from "react"
import Button from "./Button"

const Item = ({ carImg, name, period, dailyIncome, price, active, how_many_time_buy, bought_limit = 0, total_revenue, onClick }) => {
  return (
    <div
      className="w-full bg-white drop-shadow-md rounded-lg

"
    >
      <div className="flex flex-col space-y-3 bg-gray-white p-4 relative ">
        <div className="bg-blue-600 rounded-l-full absolute px-3 py-1 right-0">
          {bought_limit} / {how_many_time_buy}
        </div>

        <div className="flex space-x-4 items-center">
          <div>
            <img className="h-[100px] w-[100px] rounded-lg" src={carImg} />
          </div>

          <div className="flex flex-col space-y-1">
            <h4 className="text-blue-600 font-bold text-start">{name}</h4>

            <h4 className="text-gray-400 text-start">
              Period:&nbsp;
              <span className="text-blue-600 font-bold">{period}</span> Days
            </h4>

            <h4 className="text-gray-400  text-start">
              Daily income:&nbsp; <span className="text-blue-600 font-bold">{dailyIncome} Rs</span>
            </h4>

            <h4 className="text-gray-400 text-start">
              Price:&nbsp;
              <span className="text-blue-600 font-bold">{price} Rs</span>
              <span className="text-blue-600 text-sm font-bold">&nbsp;&nbsp;&nbsp;Total Income: {total_revenue} Rs</span>
            </h4>
          </div>
        </div>

        <button onClick={onClick} className="py-2 rounded-full w-full bg-blue-600 disabled:bg-gray-300 text-white text-lg" disabled={!active}>
          {active ? "Invest Now" : "Coming Soon"}
        </button>
      </div>
    </div>
  )
}

export default Item
