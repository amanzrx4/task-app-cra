import React from "react"

import vector1bg from "../assets/vector/vector1bg.png"
import vector2bg from "../assets/vector/vector2bg.png"
import vector3bg from "../assets/vector/vector3bg.png"

import { Carousel } from "react-responsive-carousel"

import "react-responsive-carousel/lib/styles/carousel.min.css"

import CarouselVer from "react-elastic-carousel"

import { useAuth } from "../auth/authContext"
import { useAxios } from "../hooks/useAxios"
import Backdrop from "../components/Backdrop"
import { hideMiddle } from "../utils/hideMiddle"
const Home = () => {
  const carouselRef = React.useRef(null)
  let resetTimeout

  const n = 50
  const { currentUser } = useAuth()
  const { response, loading, error } = useAxios({
    method: "GET",
    url: "/slider",
    headers: {
      accept: "*/*",
    },
  })
  const {
    response: planRes,
    loading: planLoad,
    error: planError,
  } = useAxios({
    method: "GET",
    url: "/latestBuyedPlan",
    headers: {
      accept: "*/*",
    },
  })

  return (
    <>
      {(loading || planLoad) && <Backdrop color="blue" />}

      <div className="p-2">
        <Carousel className="m-auto rounded-full z-10 " autoPlay infiniteLoop showThumbs={false} showStatus={false} showIndicators={false} axis="horizontal">
          {response &&
            (response.data.length > 0 ? (
              response.data.map(({ id, image }) => (
                <div key={id}>
                  <img className="rounded-xl w-full h-80 object-cover object-center" src={image} />
                </div>
              ))
            ) : (
              <div className="text-xl text-center my-8 text-blue-500">Nothing to show here</div>
            ))}
        </Carousel>

        <section className="mx-auto w-full flex flex-col space-y-6 bg-white mt-5">
          <div className="mx-auto text-center">
            <h4 className="text-3xl text-blue-500">{currentUser && currentUser.data.amount} Rs</h4>
            <h1 className="text-gray-500 text-sm">Current Balance</h1>
          </div>

          <div className="flex justify-around space-x-2 items-center">
            <div className="text-center">
              <h4 className="text-2xl text-blue-500">{currentUser && currentUser.data.today_earning} Rs</h4>
              <h1 className="text-gray-500 text-sm">Today Earning</h1>
            </div>
            <div className="text-center">
              <h4 className="text-2xl text-blue-500">0 Rs</h4>
              <h1 className="text-gray-500 text-sm">Team Profit</h1>
            </div>
            <div className="text-center">
              <h4 className="text-2xl text-blue-500">{currentUser && currentUser.data.total_revenue} Rs</h4>
              <h1 className="text-gray-500 text-sm">Total Revenue</h1>
            </div>
          </div>
        </section>

        <section className="w-full flex bg-white mt-4 space-x-1 justify-center">
          <div className="space-y-2 flex-1 bg-blue-100 p-3 rounded-lg py-5 items-start flex flex-col justify-between">
            <h1 className="text-orange-500 font-semibold">Transaction</h1>
            <h1 className="text-gray-400">Wealth comes to you</h1>
            <img src={vector1bg} alt="" srcSet="" />
          </div>

          <div className="space-y-2 flex-1 bg-blue-100 p-3 rounded-lg py-5 items-start flex flex-col justify-between">
            <h1 className="text-orange-500 font-semibold">Recharge</h1>
            <h1 className="text-gray-400">Open wealth password</h1>
            <img src={vector2bg} alt="" srcSet="" />
          </div>

          <div className="space-y-2 flex-1 bg-blue-100 p-3 rounded-lg py-5 items-start flex flex-col justify-between">
            <h1 className="text-orange-500 font-semibold">Invest</h1>
            <h1 className="text-gray-400">Source of Wealth</h1>
            <img src={vector3bg} alt="" srcSet="" />
          </div>
        </section>

        <section>
          <h4 className="text-black font-semibold px-2 py-2">The latest real-time dynamic</h4>

          {planRes &&
            (planRes.data.length > 0 ? (
              <CarouselVer
                ref={carouselRef}
                onNextEnd={({ index }) => {
                  clearTimeout(resetTimeout)
                  resetTimeout = setTimeout(() => {
                    carouselRef?.current?.goTo(0)
                  }, 1000)
                }}
                enableAutoPlay
                autoPlaySpeed={500}
                showArrows={false}
                pagination={false}
                verticalMode
                itemsToShow={3}
                itemPadding={[4, 0]}
              >
                {planRes.data.map((props, i) => {
                  const { title, input_cost, mobile_no, image } = props

                  return (
                    <div key={i} className="w-full bg-indigo-200 text-black flex rounded-lg p-2 space-x-3 justify-between">
                      <img className="rounded-lg" width={80} height={80} src={image} />
                      <div className="flex-1">
                        <h4>{hideMiddle(mobile_no.toString(), 3, 2)}</h4>
                        <h4>{title}</h4>
                      </div>
                      <h4>₹{input_cost}</h4>
                    </div>
                  )
                })}
              </CarouselVer>
            ) : (
              <div className="text-xl text-center my-4 text-blue-500">Nothing to show here</div>
            ))}
        </section>
      </div>
    </>
  )
}

export default Home
