import { useState } from "react"
import Item from "../components/Item"
import Backdrop from "../components/Backdrop"
import { useAxios } from "../hooks/useAxios"
import { useFetch } from "../utils/useFetch"
import _ from "lodash"
import Modal from "../utils/Modal"

function Invest() {
  const [model, setModel] = useState({
    show: false,
    planId: null,
  })

  const { response, loading, error, toast } = useAxios({
    method: "GET",
    url: "/plans",
    headers: {
      accept: "*/*",
    },
  })

  const { response: planRes, loading: planLoad, error: planError, fetchData } = useFetch()

  const onConfirm = () => {
    fetchData({
      method: "POST",
      url: "/purchaseProduct",
      data: {
        plan_id: model.planId,
      },
    }).then(() => {
      setModel({ show: false, planId: null })
    })
  }

  const renderNoPlans = () => {
    return (
      <>
        <div className="flex justify-center items-center h-full w-full">
          <h4 className="text-xl mt-8 text-gray-800 text-center h-full w-full">No plans available for you</h4>
        </div>
      </>
    )
  }

  if (loading) return <Backdrop color="blue" />

  return (
    <>
      {planLoad && <Backdrop color="blue" />}
      <Modal text={"Do you want to buy this plan? "} show={model.show} onAbort={() => setModel({ show: false, planId: null })} onConfirm={onConfirm} />
      <div className="flex flex-col space-y-4 justify-center w-full px-2">
        {error && <h4>{error.message || "something went really wrong"}</h4>}

        {response &&
          (response.data.length > 0
            ? response.data.map((item) => {
                const { id, title: name, input_cost: price, daily_income: dailyIncome, how_many_time_buy, revenue_cycle: period, image: carImg, total_revenue, bought_limit } = item

                return (
                  <Item
                    onClick={() => setModel({ show: true, planId: id })}
                    key={id}
                    how_many_time_buy={how_many_time_buy}
                    carImg={carImg}
                    name={name}
                    period={period}
                    price={price}
                    dailyIncome={dailyIncome}
                    active={true}
                    bought_limit={bought_limit}
                    total_revenue={total_revenue}
                  />
                )
              })
            : renderNoPlans())}
      </div>
    </>
  )
}

export default Invest
