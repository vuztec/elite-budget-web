import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import axios from "../../config/axios";
import clsx from "clsx";
import { toast } from "react-toastify";
import { handleAxiosResponseError } from "../../utils/handleResponseError";
import { useLocation, useNavigate } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const VerifyOtp = () => {
  const { handleSubmit } = useForm();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const params = useQuery();
  const email = params.get("email");
  const navigate = useNavigate();

  const [expiryTime, setExpiryTime] = useState(3 * 60); // 3 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setExpiryTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace") {
      setOtp([...otp.map((d, idx) => (idx === index ? "" : d))]);

      // Focus previous input
      if (event.target.previousSibling) {
        event.target.previousSibling.focus();
      }
    }
  };

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const submitHandler = () => {
    const id = toast.loading("Loading....");

    axios
      .post("/api/auth/verifyotp", { otp: otp.join(""), email })
      .then(({ data }) => {
        console.log(data);
        toast.update(id, {
          render: data.message,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        navigate("/updatepassword?email=" + email);
      })
      .catch((err) => {
        console.log(handleAxiosResponseError(err));
        toast.update(id, {
          render: handleAxiosResponseError(err),
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      });
  };

  const minutes = Math.floor(expiryTime / 60);
  const seconds = expiryTime % 60;

  return (
    <>
      <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
        <div className="container mx-auto">
          <div className="max-w-sm mx-auto md:max-w-lg">
            <div className="w-full">
              <form onSubmit={handleSubmit(submitHandler)} className="bg-white h-auto py-3 rounded text-center">
                <h1 className="text-2xl font-bold">OTP Verification</h1>
                <div className="flex flex-col mt-4">
                  <span>We have sent a code to your email {email}</span>
                  <p>
                    Expires in: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                  </p>
                </div>
                <div id="otp" className="flex flex-row justify-center text-center px-2 mt-5">
                  {otp.map((data, index) => {
                    return (
                      <input
                        className="m-2 border h-10 w-10 text-center form-control rounded"
                        type="text"
                        name="otp"
                        maxLength="1"
                        key={index}
                        value={data}
                        onChange={(e) => handleChange(e.target, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        ref={(el) => (inputRefs.current[index] = el)}
                      />
                    );
                  })}
                </div>
                <Button
                  type="submit"
                  label="Verify"
                  className={clsx("my-4 w-full h-10 hover:bg-green-800 text-white rounded-full bg-black")}
                />
                {/* <div className="flex justify-center text-center mt-5">
                  <a className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer">
                    <span className="font-bold">Resend OTP</span>
                    <i className="bx bx-caret-right ml-1"></i>
                  </a>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyOtp;
