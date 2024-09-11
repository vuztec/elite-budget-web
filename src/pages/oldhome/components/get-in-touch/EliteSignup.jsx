import Background from '../../../../assets/image/bgimage.png';

function EliteSignup() {
  return (
    <div className="relative bg-gray-800 text-white flex justify-center items-center min-h-screen w-full">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${Background})`,
        }}
      />

      {/* Overlay (Signup Form) */}
      <div className="relative z-10 text-center w-full sm:w-1/2 p-4">
        <h2 className="mb-4 font-medium text-[34px] text-white">Get started with ELITE today</h2>
        <div className="flex md:flex-col lg:flex-row flex-col md:gap-2 lg:gap-1 gap-2 items-center justify-center space-x-4">
          <input type="email" placeholder="Email" className="p-4 rounded text-gray-800 w-3/4" />
          <a href="/login" className="bg-[#00AE5B] px-6 py-4  rounded text-white whitespace-nowrap">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}

export default EliteSignup;
