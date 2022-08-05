import React from "react"

const Button = ({ children, active, onClick, bgColor, ...others }) => {
  return (
    <button onClick={onClick} className={`disabled:bg-opacity-25 w-full rounded-full text-white py-2 text-lg ${active ? " bg-blue-600" : "bg-gray-300"} ${bgColor} `} {...others}>
      {children}{" "}
    </button>
  )
}

export default Button
