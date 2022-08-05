import React from "react"
import toast from "react-hot-toast"
import car from "../assets/car.jpg"
import { useAuth } from "../auth/authContext"
import BackWrapper from "../components/BackWrapper"
import { siteURL } from "../utils/url"
const Invite = () => {
  const { currentUser } = useAuth()

  const copyInvite = () => {
    navigator.clipboard.writeText(siteURL + "/register?code=" + currentUser.data.refer_code)
    toast.success("Invite Code copied")
  }

  // const navigate = useNavigate();
  return (
    <>
      <BackWrapper text="Invite">
        <div className="mt-14">
          <div>
            <img src={car} />
          </div>

          <div className="px-3 text-black mt-16">
            <div className="flex flex-col">
              <div className="bg-blue-600 px-2 py-2 flex justify-between items-center text-center rounded-lg ">
                <h4 className="flex-1 text-white font-bold">
                  <div className="flex-1 text-center p-2">
                    <h3>₹{currentUser.promotion.bonus}</h3>
                    <h3>Bonus</h3>
                  </div>
                </h4>
                <h4 className="flex-1 text-white border-l-2  border-white font-bold">
                  {" "}
                  <div className="flex-1 text-center border-l-2 border-gray-500 p-2">
                    <h3>{currentUser.promotion.peopleCount}</h3>
                    <h3>Total Invited</h3>
                  </div>
                </h4>
              </div>

              <div className="flex flex-col space-y-6 text-black items-center text-center mt-6">
                <h3 className="text-xl">
                  SHARE CODE:&nbsp;
                  <span className="text-blue-700 font-semibold">{currentUser.data.refer_code}</span>
                </h3>

                <button onClick={copyInvite} className="px-6 py-2 bg-blue-700 text-white rounded-full">
                  Click Copy
                </button>

                <h3 className="text-xl">{siteURL + "/register?code=" + currentUser.data.refer_code}</h3>
              </div>
            </div>
          </div>
        </div>
      </BackWrapper>
    </>
  )
}

export default Invite
