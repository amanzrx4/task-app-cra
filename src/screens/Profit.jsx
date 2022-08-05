import _ from "lodash"
import React, { useEffect, useState } from "react"
import { useAuth } from "../auth/authContext"


const Profit = () => {
  const { currentUser } = useAuth()
  const [profitDetails, setProfitDetails] = useState(null)

  useEffect(() => {
    if (!currentUser) return
    setProfitDetails(currentUser.profit_data)
  }, [currentUser])

  return (
    <div className="py-6 px-3">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {profitDetails && Object.keys(profitDetails).map((keyName, i) => <ProfitBox key={keyName} amount={profitDetails[keyName]} name={keyName} />)}
      </div>
    </div>
  )
}

export default Profit

const ProfitBox = ({ amount, name }) => {
  name = _.startCase(name)
  return (
    <div className="flex flex-col px-4 py-2 bg-purple-500 rounded-xl text-center">
      <h4 className="text-lg text-white">{amount}</h4>
      <h4 className="text-lg text-white">{name}</h4>
    </div>
  )
}
