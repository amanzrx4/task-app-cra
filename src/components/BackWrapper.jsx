import { faArrowLeftLong, faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { useNavigate } from "react-router-dom"

const BackWrapper = ({ children, text }) => {
  const navigate = useNavigate()

  return (
    <>
      <div className="text-black">
        <div className="flex space-x-5 w-full text-white text-semibold bg-gradient-to-l from-blue-500 via-blue-600 to-blue-800 h-14 fixed items-center p-4 top-0 font-semibold">
          <FontAwesomeIcon onClick={() => navigate(-1)} className="cursor-pointer p-2" size="lg" icon={faChevronLeft} />
          <h4 className="text-xl">{text}</h4>
        </div>

        {children}
      </div>
    </>
  )
}

export default BackWrapper
