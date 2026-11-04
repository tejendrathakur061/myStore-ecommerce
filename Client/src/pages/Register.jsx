import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

const Register = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please complete all fields to create your account.");
      return;
    }

    try {
      await api("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        }),
      });

      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F5F0] px-4 py-10 text-[#292D28]">
      <div className="w-full max-w-md rounded-2xl border border-[#E7E5DC] bg-[#FCFCF8] p-6 shadow-sm sm:p-9">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#293E30] text-xl font-semibold text-white">
            A
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-[#293E30]">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-[#777A70]">
            Create an account to get started.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#41463E]">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={onChange}
              name="name"
              className="mt-1 w-full rounded-lg border border-[#DEDED4] bg-white px-4 py-3 text-sm text-[#292D28] outline-none transition placeholder:text-[#96988E] focus:border-[#526B54] focus:ring-2 focus:ring-[#293E30]/10"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#41463E]">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={onChange}
              className="mt-1 w-full rounded-lg border border-[#DEDED4] bg-white px-4 py-3 text-sm text-[#292D28] outline-none transition placeholder:text-[#96988E] focus:border-[#526B54] focus:ring-2 focus:ring-[#293E30]/10"
            />
          </div>

          <div className="relative">
            <label className="mb-1.5 block text-sm font-medium text-[#41463E]">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={onChange}
              name="password"
              className="mt-1 w-full rounded-lg border border-[#DEDED4] bg-white py-3 pl-4 pr-16 text-sm text-[#292D28] outline-none transition placeholder:text-[#96988E] focus:border-[#526B54] focus:ring-2 focus:ring-[#293E30]/10"
            />

            <button
              type="button"
              onClick={handlePassword}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-4 top-10.5 cursor-pointer text-sm font-semibold text-[#426047] transition-colors hover:text-[#293E30]"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-[#293E30] px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#3A5140] focus:outline-none focus:ring-2 focus:ring-[#293E30] focus:ring-offset-2"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#777A70]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#426047] transition-colors hover:text-[#293E30] hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
