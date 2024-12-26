import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const instance = axios.create({
  baseURL: "https://job-portal-server-for-recruiter-part3-neon-omega.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { signOutUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    instance.interceptors.response.use(
      (resonse) => {
        return resonse;
      },
      (err) => {
        if (err.status === 401 || err.status === 403) {
          signOutUser()
            .then(() => {
              navigate("signIn");
            })
            .catch((error) => {
              console.log("error kahasa", error);
            });
        }
      }
    );
  }, []);
  return instance;
};

export default useAxiosSecure;
