import React, { useState } from "react"
import { routesData } from "../data/routesData"

import { Link, useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Layout = ({ children }) => {
  const location = useLocation()

  return (
    <div className="h-full w-full">
      <div className="h-[calc(100vh-65px)] overflow-scroll overflow-x-hidden scroll-hide bg-white ">{children}</div>

      <section id="bottom-navigation" className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
        <section id="bottom-navigation" className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
          <div id="tabs" className="flex justify-around">
            {routesData.map((item) => {
              return (
                <Link key={item.label} className="flex-1" to={item.route}>
                  <div className="flex-col space-y-1 w-full justify-center inline-block text-center pt-2 pb-1 flex-1">
                    <FontAwesomeIcon className="text-opacity-40" color={location.pathname == item.route ? "#3b82f6" : "#d1d5db"} icon={item.icon} />
                    <h4 className={`text-sm ${location.pathname == item.route ? "text-blue-500" : " text-gray-400"}`}>{item.label}</h4>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      </section>
    </div>
  )
}

export default Layout
