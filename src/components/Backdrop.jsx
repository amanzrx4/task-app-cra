import React from "react"
import { RotatingLines } from "react-loader-spinner"

const Backdrop = ({ color }) => {
  return (
    <div
      className={`top-0 left-0 z-10 w-full h-full opacity-40 bg-black fixed`}
      style={{
        transition: "opacity 0.2s",
      }}
    >
      <div className="absolute top-10 left-1/2 -translate-x-2/4">
        <RotatingLines strokeColor={color} strokeWidth="5" animationDuration="0.75" width="96" visible={true} />
      </div>
    </div>
  )
}

export default Backdrop
