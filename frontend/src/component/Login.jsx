import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { BASE_URL } from "../../config";

export default function Login() {
  const handleLogin = () => {
    window.location.href = `${BASE_URL}/auth/google`;
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      window.location.href = "/chat";
    }
  }, []);

  return (
    <>
      <div className="mx-auto flex justify-center h-screen items-center">
        <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <h5 class="text-2xl font-bold text-center text-gray-900 dark:text-white">
            Sign in to Chat Buddy 🤞
          </h5>
          <button
            onClick={handleLogin}
            class="w-full mt-7 text-black border border-solid border-b-slate-400 bg-white hover:bg-grey-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            <div className=" flex items-center justify-center gap-2">
              <div>
                <FcGoogle />
              </div>
              Login with Google
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
