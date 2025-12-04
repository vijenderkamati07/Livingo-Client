import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../Services/authService.js";
import { AuthContext } from "../../Context/AuthContext.jsx";

export default function Login() {
  const { setUser } = useContext(AuthContext);        // 👈 global auth state
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState([]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const res = await login(form);

    if (!res.success) {
      setErrors(res.errors);
      return;
    }

    // 🔥 update global auth instantly
    setUser(res.user);

    navigate("/"); // redirect to homepage
  };

  const togglePassword = () => {
    const input = document.getElementById("password");
    const btn = document.getElementById("togglePass");
    const isHidden = input.type === "password";
    input.type = isHidden ? "text" : "password";
    btn.textContent = isHidden ? "Hide" : "Show";
  };

  return (
    <main className="hero-glow text-[#E5E3F3] min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-14">

        {/* LEFT ILLUSTRATION */}
        <div className="flex-1 hidden md:flex flex-col items-center text-center px-6">
          <img
            draggable="false"
            loading="lazy"
            src="https://cdni.iconscout.com/illustration/premium/webp/people-travelling-with-luggage-5560442-4651593.webp"
            className="w-72 md:w-80 illustration drop-shadow-[0_0_45px_#8C5FF660]"
            alt="Travel"
          />

          <h2 className="mt-8 text-4xl font-bold tracking-tight leading-snug">
            Welcome back to <span className="text-[#8C5FF6]">comfort</span>
          </h2>

          <p className="text-[#A39EB8] text-sm max-w-sm mt-3 leading-relaxed">
            Log in to access your bookings, trips & wishlist.
          </p>
        </div>

        {/* LOGIN CARD */}
        <div className="flex-1 login-card rounded-3xl border border-[#2D2A37] p-8 md:p-10">
          <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>
          <p className="text-center text-[#B9B7C6] mb-8 text-sm">
            Log in to continue your LivinGo journey
          </p>

          {/* Error box */}
          {errors.length > 0 && (
            <div className="mb-6 p-4 bg-red-400/10 border border-red-500/40 text-red-400
                            rounded-xl text-[13px] shadow-lg animate-[shake_0.35s]">
              <ul className="list-disc list-inside space-y-1">
                {errors.map((msg, i) => (
                  <li key={i}>{msg}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full bg-[#0E0D13] border border-[#2D2A37] rounded-xl px-4 py-3 text-sm placeholder-[#807A93]
                         focus:border-[#8C5FF6] focus:shadow-[0_0_8px_#8C5FF650] outline-none transition"
            />

            {/* Password */}
            <div className="relative">
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full bg-[#0E0D13] border border-[#2D2A37] rounded-xl px-4 py-3 pr-12 text-sm placeholder-[#807A93]
                           focus:border-[#8C5FF6] focus:shadow-[0_0_8px_#8C5FF650] outline-none transition"
              />
              <button
                type="button"
                id="togglePass"
                onClick={togglePassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px]
                           text-[#8C5FF6] hover:text-[#F43F63] transition"
              >
                Show
              </button>
            </div>

            {/* Forgot password */}
            <div className="flex justify-end -mt-3">
              <a
                href="#"
                className="text-[11px] text-[#8C5FF6] hover:text-[#F43F63] hover:underline transition"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl text-white font-semibold text-lg
                         bg-gradient-to-r from-[#8C5FF6] to-[#F43F63]
                         shadow-lg shadow-[#8C5FF630]
                         hover:shadow-[#8C5FF660] hover:scale-[1.04] active:scale-[0.97]
                         transition-all duration-300 cursor-pointer"
            >
              Log In
            </button>
          </form>

          <p className="text-center text-[#A39EB8] text-sm mt-6">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-[#8C5FF6] hover:underline font-semibold">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
