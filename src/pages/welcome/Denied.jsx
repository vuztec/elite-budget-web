import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const Denied = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
        <div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">
          <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center">
            <div className="form-container w-full md:w-[700px] flex flex-col items-center gap-y-8 bg-[#FFC7CE] px-10 pt-14 pb-14">
              <div className="text-center text-[#9C0006]">
                <p className="text-3xl font-bold">We cannot verify your user account information</p>
                <p className="font-bold mt-5">
                  Please email <strong className="text-blue-500">michelle@elitecashflowproducts.com</strong> for
                  assistance
                </p>
              </div>
              {/* <div className="w-fit">
                <Button
                  type="button"
                  className={clsx('w-fit h-10 hover:bg-green-800 text-white rounded-full bg-black uppercase')}
                  label="Login Page"
                  onClick={() => navigate('/login')}
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Denied;
