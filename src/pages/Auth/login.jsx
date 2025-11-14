import Logo from "../../assets/logo.png";
import MedicineCapsule from "../../assets/whiteroundpill.png";
import Element from "../../assets/elements.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://192.168.1.20:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid email or password");
        setLoading(false);
        return;
      }

      // Save token
      localStorage.setItem("Token", data.token);
      localStorage.setItem("User", JSON.stringify(data.user));

      setLoading(false);

      navigate("/dashboard"); // redirect
    } catch (err) {
      setError("Network Error! Try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container mx-auto">
        <img
          src={Element}
          alt="Element"
          className="absolute bottom-0 right-0 w-[300px] md:w-[420px] object-contain opacity-90"
        />

        <div className="px-10 pt-8">
          <img src={Logo} alt="Main Logo" width={172} height={44} />
        </div>

        <div className="flex flex-row justify-between items-center px-10 h-[80vh]">
          {/* LEFT */}
          <div className="flex items-center justify-center">
            <div className="max-w-3xl">
              <div className="flex flex-row items-center">
                <h2 className="text-[54px] font-semibold leading-tight">
                  Your medication,
                </h2>
                <img
                  src={MedicineCapsule}
                  alt="Medicine Capsule"
                  className="w-[179px] h-[175px] object-contain drop-shadow-xl mt-[-100px]"
                />
              </div>

              <div className="mt-[-25px]">
                <p className="text-[54px] font-semibold text-gray-900">
                  delivered Say goodbye
                </p>
                <p className="text-[54px] font-semibold text-gray-900 mt-[-25px]">
                  to all{" "}
                  <span className="text-[#59B17A] font-semibold">
                    your healthcare
                  </span>
                </p>
                <p className="text-[54px] font-semibold text-gray-900 mt-[-25px]">
                  worries with us
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-transparent">
            <form
              onSubmit={handleLogin}
              className="flex flex-col gap-4 w-[420px]"
            >
              {error && (
                <p className="text-red-500 text-center bg-red-50 border border-red-200 rounded-full py-2">
                  {error}
                </p>
              )}

              <input
                type="email"
                placeholder="Email address"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white rounded-full border border-gray-200 px-5 py-3 outline-none focus:ring-2 focus:ring-[#59B17A]"
                required
              />
              <input
                type="password"
                placeholder="Password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white rounded-full border border-gray-200 px-5 py-3 outline-none focus:ring-2 focus:ring-[#59B17A]"
                required
              />

              <button
                type="submit"
                className="bg-[#59B17A] hover:bg-[#4ba46f] text-white font-medium py-3 rounded-full transition-all disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
