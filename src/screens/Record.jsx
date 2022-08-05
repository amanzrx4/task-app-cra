import React from "react"
import BackWrapper from "../components/BackWrapper"
import Backdrop from "../components/Backdrop"
import car from "../assets/car.jpg"
import { useAxios } from "../hooks/useAxios"

const Record = () => {
  const { response, loading, error, toast } = useAxios({
    method: "GET",
    url: "/transactionHistory",
    headers: {
      accept: "*/*",
      // Authorization: `Bearer ${token}`,
    },
  })

  return (
    <>
      <BackWrapper text="Record">
        {loading && <Backdrop color="blue" />}

        <div className="mt-20">
          <div>
            <img src={car} />
          </div>

          <div className="px-3 text-black mt-4">
            <div className="flex flex-col">
              <div className="bg-blue-600 px-2 py-2 flex justify-between items-center text-center rounded-lg ">
                <h4 className="flex-1 text-white font-bold">
                  <div className="flex-1 text-center p-2">
                    <h3>₹{response && response.balance}</h3>
                    <h3>personal balance</h3>
                  </div>
                </h4>
                <h4 className="flex-1 text-white border-l-2 border-r-2 border-white font-bold">
                  {" "}
                  <div className="flex-1 text-center border-l-2 border-gray-500 p-2">
                    <h3>₹{response && response.accumulated_amount}</h3>
                    <h3>Accumulated team</h3>
                  </div>
                </h4>
                <h4 className="text-white flex-1 font-bold">
                  <div className="flex-1 text-center border-l-2 border-gray-500 p-2">
                    <h3>₹{response && response.cumulative_rec}</h3>
                    <h3>Cumulative Record</h3>
                  </div>
                </h4>
              </div>

             

              <div className="flex flex-col space-y-6 text-black items-center text-center mt-6 pb-10">
                {response &&
                  (response.data.length > 0 ? (
                    response.data.map(({ id, title: name, created_at, amount, time, status: type, date }) => {
                      return (
                        <div key={id} className="flex justify-between w-full bg-pink-200 px-4 py-4 rounded-xl items-center">
                          <div className="text-start">
                            <h4 className="text-xl font-semibold">{name}</h4>
                            <h3>{created_at}</h3>
                          </div>
                          <div className="w-1/3">
                            <h4
                              className={`text-2xl
											 font-bold
											${type.toLowerCase() == "c" ? "text-green-600" : "text-red-600"}
											`}
                            >
                              {type.toLowerCase() == "c" ? "+" : "-"}₹{amount}
                            </h4>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className="text-xl text-center my-8 text-blue-500">Nothing to show here</div>
                  ))}
              </div>
            </div>
          </div>
        </div>

       
      </BackWrapper>
    </>
  )
}

export default Record
