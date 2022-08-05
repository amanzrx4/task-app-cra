import React from "react"
import BackWrapper from "../components/BackWrapper"
import { useAxios } from "../hooks/useAxios"
import Backdrop from "../components/Backdrop"

function Item({
  image: carImg,
  title: name,
  revenue_cycle: period,
  daily_income: dailyIncome,
  amountReceived: amt_received,
  input_cost: price,
  active,
  bought_limit,
  total_revenue,
  timeLeft,
  plan_id: id,
  how_many_time_buy,
}) {
  return (
    <>
      <div className="w-full bg-green-100 drop-shadow-md rounded-lg">
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
              <h4 className="text-gray-400  text-start">
                Amount Recieved:&nbsp; <span className="text-blue-600 font-bold">{amt_received} Rs</span>
              </h4>

              <h4 className="text-gray-400 text-start">
                Price:&nbsp;
                <span className="text-blue-600 font-bold">{price} Rs</span>
                <span className="text-blue-600 text-sm font-bold">&nbsp;&nbsp;&nbsp;Total Income: {total_revenue} Rs</span>
              </h4>

              <h4 className="text-gray-400  text-start">
                Time left:&nbsp; <span className="text-blue-600 font-bold">{timeLeft} Days</span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const MyPlans = () => {
  const { response, loading, error } = useAxios({
    method: "GET",
    url: "/purchasedPlan",
    headers: {
      accept: "*/*",
    },
  })
  return (
    <>
      <BackWrapper text="My Plans">
        <div className="px-2 py-2 mt-14 flex flex-col space-y-4">
          {loading && <Backdrop color="blue" />}

          {error && (error.message || <div className="text-xl text-center my-8 text-blue-500">Something went Wrong</div>)}

          {response &&
            response.status == true &&
            (response.data.length > 0 ? response.data.map((item) => <Item key={item.title} {...item} />) : <div className="text-xl text-center my-8 text-blue-500">Nothing to show here</div>)}
        </div>
      </BackWrapper>
    </>
  )
}

export default MyPlans
