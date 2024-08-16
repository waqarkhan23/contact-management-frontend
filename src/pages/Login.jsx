import { Link, useNavigate } from "react-router-dom";
import bgImg from "../assets/bgImg.jpg";
import axios from "axios";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchemaLogin } from "../utils/YupValidator";
import { useDispatch } from "react-redux";
import { login, setUser } from "../store/slices/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const styles = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)), url(${bgImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "90vh",
  };

  const handleSubmit = async (values) => {
    console.log(values);
    await axios
      .post("http://localhost:5000/api/login", values)
      .then((res) => {
        console.log(res.data);
        toast.success("Login Successfully", {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
        });
        navigate("/dashboard");
        console.log(res.data.token);
        localStorage.setItem("token", res.data.token);
        dispatch(login());
        dispatch(setUser(res.data.newUserObject));
      })

      .catch((err) => {
        toast.error(err.response.data.errors[0].msg);
      });
  };
  return (
    <>
      <div
        className=" bg-gray-100  flex flex-col gap-4 justify-center"
        style={styles}>
        <div className="max-w-md w-full mx-auto ">
          <div className="text-3xl font-bold text-gray-300  text-center">
            Login
          </div>
        </div>
        <div
          className="max-w-md w-full mx-auto mt-4p-8 border mb-4 border-gray-300 p-5"
          style={{
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            borderRadius: "8px",
            border: "1px solid rgba(255, 255, 255, 0.18)",
          }}>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validationSchemaLogin}
            onSubmit={handleSubmit}>
            {() => (
              <Form>
                <div className="my-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-bold text-gray-600 block">
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="w-full p-2 border bg-transparent border-gray-300 rounded mt-1"
                  />
                  <ErrorMessage
                    className="text-red-600"
                    name="email"
                    component="div"
                  />
                </div>

                <div className="my-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-bold text-gray-600 block">
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="off"
                    className="w-full p-2 border border-gray-300 bg-transparent rounded mt-1"
                  />
                  <ErrorMessage className="text-red-600" name="password">
                    {(message) => (
                      <div
                        className="text-red-600"
                        dangerouslySetInnerHTML={{ __html: message }}
                      />
                    )}
                  </ErrorMessage>
                </div>

                <div className="my-2 px-4">
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 rounded-md text-white text-sm font-bold">
                    Login
                  </button>
                </div>
                <p>
                  Create an Account ?{" "}
                  <Link to="/register" style={{ color: "blue" }}>
                    Register
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Login;
