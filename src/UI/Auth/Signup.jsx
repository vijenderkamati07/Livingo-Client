import { useState } from "react";
import { signup } from "../../Services/authService.js";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "guest",
  });

  const [errors, setErrors] = useState([]);
  const [strength, setStrength] = useState({
    width: "0%",
    label: "",
    class: "",
  });

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // password strength logic
  const checkStrength = (value) => {
    let score = 0;
    if (value.length >= 8) score++;
    if (value.length >= 12) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    if (!value) return setStrength({ width: "0%", label: "", class: "" });
    if (score <= 2)
      return setStrength({
        width: "35%",
        label: "Weak – add more security.",
        class: "strength-weak",
      });
    if (score <= 4)
      return setStrength({
        width: "70%",
        label: "Medium – but can be stronger.",
        class: "strength-medium",
      });
    return setStrength({
      width: "100%",
      label: "Strong password ✅",
      class: "strength-strong",
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const result = await signup(form);

    if (!result.success) {
      setErrors(result.errors);
      return;
    }

    navigate("/login");
  };

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-10 text-[#E5E3F3] min-h-screen bg-[#0E0D13]">
      <div className="signup-shell w-full max-w-5xl rounded-3xl border border-[#2D2A37] overflow-hidden grid grid-cols-1 md:grid-cols-[1.1fr_1.2fr]">
        {/* LEFT IMAGE PANEL */}
        <div className="signup-hero hidden md:flex flex-col justify-between p-8 border-r border-[#2D2A37]">
          <div className="space-y-4">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#C9C5D4]">
              <span className="h-[2px] w-8 bg-gradient-to-r from-[#8C5FF6] to-[#F43F63] rounded-full"></span>
              Welcome to LivinGo
            </p>
            <h1 className="text-3xl font-extrabold leading-tight">
              Host smarter. <span className="text-[#8C5FF6]">Stay better.</span>
            </h1>
            <p className="text-sm text-[#B9B7C6] max-w-sm">
              Manage premium stays in vibrant cityscapes or peaceful getaways.
            </p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&w=900&q=80"
            className="w-full max-w-xs rounded-2xl border border-[#2D2A37] object-cover shadow-lg shadow-[#000000aa]"
          />
        </div>

        {/* FORM PANEL */}
        <div className="bg-[#18171F]/90 px-6 py-8 md:px-8 md:py-10 flex flex-col">
          <h2 className="text-2xl md:text-3xl font-bold mb-1">
            Create your account
          </h2>
          <p className="text-xs md:text-sm text-[#A39EB8] mb-6">
            Sign up to start booking stays or hosting.
          </p>

          {errors.length > 0 && (
            <div className="mb-6 p-4 bg-[#F9737320] border border-[#F97373] text-[#F97373] rounded-xl text-sm shadow-md animate-[shake_0.35s]">
              <h4 className="font-semibold mb-2">Please fix the following:</h4>
              <ul className="list-disc list-inside space-y-1">
                {errors.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={submit} className="space-y-5">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="field-shell border px-4 py-1 rounded-xl bg-[#0E0D13] border-[#2D2A37]">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  onChange={update}
                  value={form.firstName}
                  required
                  className="w-full bg-transparent py-2.5 text-sm outline-none"
                />
              </div>
              <div className="field-shell border px-4 py-1 rounded-xl bg-[#0E0D13] border-[#2D2A37]">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  onChange={update}
                  value={form.lastName}
                  required
                  className="w-full bg-transparent py-2.5 text-sm outline-none"
                />
              </div>
            </div>

            <div className="field-shell border px-4 py-1 rounded-xl bg-[#0E0D13] border-[#2D2A37]">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                onChange={update}
                value={form.email}
                required
                className="w-full bg-transparent py-2.5 text-sm outline-none"
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <div className="field-shell border px-4 py-1 rounded-xl bg-[#0E0D13] border-[#2D2A37]">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  className="w-full bg-transparent py-2.5 text-sm outline-none"
                  onChange={(e) => {
                    update(e);
                    checkStrength(e.target.value);
                  }}
                />
              </div>

              <div className="h-1.5 bg-[#1E1B2A] rounded-full overflow-hidden">
                <div
                  style={{ width: strength.width }}
                  className={`h-full rounded-full transition-all duration-300 ${strength.class}`}
                ></div>
              </div>
              <p className="text-[11px] text-[#A39EB8]">{strength.label}</p>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="field-shell border px-4 py-1 rounded-xl bg-[#0E0D13] border-[#2D2A37]">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                onChange={update}
                value={form.confirmPassword}
                required
                className="w-full bg-transparent py-2.5 text-sm outline-none"
              />
            </div>

            {/* ROLE SELECT */}
            <p className="text-xs uppercase font-medium text-[#C9C5D4]">
              Register as
            </p>
            <div className="grid grid-cols-2 gap-3">
              {["guest", "host"].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setForm({ ...form, userType: role })}
                  className={`role-card flex flex-col items-center gap-2 border rounded-2xl px-4 py-3 text-sm transition 
                    ${form.userType === role ? "role-card-active" : ""}`}
                >
                  {role === "guest" ? "👤" : "🏠"}
                  <span className="font-semibold">
                    {role === "guest" ? "Guest" : "Host"}
                  </span>
                  <span className="text-[11px] text-[#A39EB8]">
                    {role === "guest" ? "Book stays" : "List properties"}
                  </span>
                </button>
              ))}
            </div>

            {/* TERMS */}
            <label className="flex items-start gap-3 text-xs cursor-pointer">
              <input
                type="checkbox"
                name="terms"
                onChange={(e) =>
                  setForm({ ...form, terms: e.target.checked ? "on" : "" })
                }
              />

              <span>
                I agree to the <span className="text-[#8C5FF6]">Terms</span> &{" "}
                <span className="text-[#8C5FF6]">Privacy Policy</span>
              </span>
            </label>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#8C5FF6] to-[#F43F63] rounded-xl text-white font-semibold shadow-xl
              hover:scale-[1.02] active:scale-[0.97] transition"
            >
              Create account
            </button>
          </form>

          <p className="text-center text-[#A39EB8] text-xs mt-6">
            Already have an account?
            <Link to="/login" className="text-[#8C5FF6] font-semibold">
              {" "}
              Login instead
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
