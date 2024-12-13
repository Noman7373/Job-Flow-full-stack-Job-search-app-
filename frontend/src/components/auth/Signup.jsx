import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(); //formdata object
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <div class="flex items-center justify-center max-w-xl mx-auto">
        <form
          class="w-full border border-gray-200 rounded-md p-6 my-10 bg-white shadow-md"
          onSubmit={submitHandler}
        >
          <h1 class="font-bold text-2xl mb-5">Sign Up</h1>

          <div class="mb-4">
            <label class="block font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="fullname"
              placeholder="Enter Name"
              value={input.fullname}
              onChange={changeEventHandler}
              class="w-full border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div class="mb-4">
            <label class="block font-medium text-gray-700 mb-2">Email *</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={input.email}
              onChange={changeEventHandler}
              class="w-full border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div class="mb-4">
            <label class="block font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Enter Phone Number"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              class="w-full border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div class="mb-4">
            <label class="block font-medium text-gray-700 mb-2">
              Password *
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={input.password}
              onChange={changeEventHandler}
              class="w-full border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div class="flex items-center justify-between mb-6 sm:flex-col xs:flex-cols">
            <div class="flex gap-4">
              <div class="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  class="cursor-pointer"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                />
                <label class="ml-2">Student</label>
              </div>
              <div class="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  class="cursor-pointer"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                />
                <label class="ml-2">Recruiter</label>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <label>Profile</label>
              <input
                accept="image/*"
                type="file"
                name="file"
                class="cursor-pointer"
                onChange={changeFileHandler}
              />
            </div>
          </div>

          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-500"
          >
            Signup
          </button>

          <span class="text-sm mt-4 block text-center">
            Already have an account?{" "}
            <a href="/login" class="text-blue-600">
              Login
            </a>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
