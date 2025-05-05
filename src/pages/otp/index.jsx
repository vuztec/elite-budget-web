import React, { useState, useRef, useEffect } from 'react';
import axios from '../../config/axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useUserStore from '../../app/user';
import { toast } from 'react-toastify';
import { handleAxiosResponseError } from '../../utils/handleResponseError';
import Logo from '../../assets/logo.png';
import { getOtp } from '../../config/api';
import { useQuery, useQueryClient } from 'react-query';

const OtpPage = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const { setUser, setJwt, user } = useUserStore();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const type = searchParams.get('type');
  const [timeLeft, setTimeLeft] = useState(0);
  const queryClient = useQueryClient();

  const { data: otpData } = useQuery({
    queryKey: ['otp', email],
    queryFn: () => getOtp(email),
    staleTime: 1000 * 60 * 60,
  });

  const inputs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    user && navigate('/');
  }, [user]);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const code = otp.join('');
    const id = toast.loading('Loading....');
    if (code.length < 6) {
      toast.update(id, {
        render: 'Please enter all 6 digits.',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
      return;
    }

    setLoading(true);
    axios
      .post('/api/otp/verify', {
        Email: email,
        Code: code,
        type: type,
      })
      .then(({ data }) => {
        toast.update(id, {
          render: 'Otp verified successfully.',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        });
        if (type === 'reset') {
          navigate(`/update-password?id=${data.id}`);
        } else {
          setUser(data.user);
          setJwt(data.jwt);
          navigate(`/`);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.update(id, {
          render: handleAxiosResponseError(err),
          type: 'error',
          isLoading: false,
          autoClose: 3000,
        });
      });
  };

  useEffect(() => {
    if (!otpData?.ExpiresAt) return;

    const expiry = new Date(otpData.ExpiresAt).getTime(); // Ensure it's a valid date string
    const now = new Date().getTime();
    const diff = Math.floor((expiry - now) / 1000);

    setTimeLeft(diff > 0 ? diff : 0);
  }, [otpData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleResend = () => {
    axios
      .post(`/api/otp`, { Email: email })
      .then(({ data }) => {
        console.log(data);
        queryClient.setQueryData(['otp', email], () => data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full flex flex-col mb-4 items-center">
        <img src={Logo} alt="logo" className="h-32 lg:h-32 pb-5" />
        <p className="w-full text-center">
          <strong>A One-Time PIN (OTP)</strong> has been sent to <strong>{email}</strong>.
        </p>
        <p className="w-full text-center">
          If you do not see it in your inbox, please check your <strong>Spam/Junk folder</strong>.
        </p>
        <h1 className="text-2xl font-bold pt-5">Enter the 6-digit OTP</h1>
        {timeLeft > 0 && (
          <p className="w-full text-center">
            This OTP will expire in <span className="text-red-500 font-extrabold">{formatTime(timeLeft)}</span>.
          </p>
        )}
        {timeLeft <= 0 && (
          <p className="w-full text-center">
            The OTP has <span className="text-red-500 font-extrabold">expired</span>.
          </p>
        )}
      </div>

      {timeLeft > 0 && (
        <>
          <div className="flex gap-2 mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-xl border rounded-md focus:outline-blue-500"
              />
            ))}
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Submit'}
          </button>
        </>
      )}
      {timeLeft <= 0 && (
        <button
          onClick={handleResend}
          disabled={loading}
          className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 disabled:opacity-50"
        >
          {loading ? 'Sending OTP...' : 'Resend OTP'}
        </button>
      )}
    </div>
  );
};

export default OtpPage;
