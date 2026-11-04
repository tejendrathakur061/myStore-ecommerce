import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import api from "../utils/api";

const Login = () => {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    try {
      const data = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        }),
      });

      login(data.user);

      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/products");
      }
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
            Login
          </h2>

          <p className="mt-2 text-sm text-[#777A70]">
            Sign in to your account to continue.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#41463E]">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-[#DEDED4] bg-white px-4 py-3 text-sm text-[#292D28] outline-none transition placeholder:text-[#96988E] focus:border-[#526B54] focus:ring-2 focus:ring-[#293E30]/10"
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
              className="w-full rounded-lg border border-[#DEDED4] bg-white py-3 pl-4 pr-16 text-sm text-[#292D28] outline-none transition placeholder:text-[#96988E] focus:border-[#526B54] focus:ring-2 focus:ring-[#293E30]/10"
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
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-[#293E30] px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#3A5140] focus:outline-none focus:ring-2 focus:ring-[#293E30] focus:ring-offset-2 cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#777A70]">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-[#426047] transition-colors hover:text-[#293E30] hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
