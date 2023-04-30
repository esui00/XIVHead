import { useState } from "react";
import{ Box,
Button,
TextField,
useMediaQuery,
Typography,
useTheme,
} from "@mui/material";
import EditOutlinedIcon from"@mui/icons-material/EditOutlined";
import {Formik} from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import { mainURL } from "lib/api";

const registerSchema = yup.object().shape({
    displayName: yup.string().required('required'),
    email: yup.string().email('invalid email').required('required'),
    password: yup.string().required('required'),
  });

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),   
});

const initialValuesRegister = {
    displayName: "",
    email: "",
    password: "",
};

const initialValuesLogin = {
    email: "",
    password: "",
};

const Form = () => {
    const [pageType, setPageType] = useState("login");
    const {palette} = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery(("min-width: 600px"));
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const register = async (values, onSubmitProps) => {
        
        try {
           
            const savedUserResponse = await fetch(
                `${mainURL}/auth/register`,
                {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify(values),
                }
            );
            const savedUser = await savedUserResponse.json();
            onSubmitProps.resetForm();

            if(savedUser){
                setPageType("login");
            }
        } catch (error) {
            console.error(error);
            onSubmitProps.setSubmitting(false);
        }
    };

    const login = async (values, onSubmitProps) => {
        try {
          const loggedInResponse = await fetch(`${mainURL}/auth/login`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(values),
          });
      
          if (loggedInResponse.ok) {
            const loggedIn = await loggedInResponse.json();
            onSubmitProps.resetForm();
            if (loggedIn) {
              dispatch(
                setLogin({
                  user: loggedIn.user,
                  token: loggedIn.token,
                })
              );
              navigate("/");
            }
          } else {
            throw new Error(
              `HTTP error! status: ${loggedInResponse.status}, message: ${await loggedInResponse.text()}`
            );
          }
        } catch (error) {
          console.error(error);
          onSubmitProps.setSubmitting(false);
          alert("Email or password is incorrect!");
        }
      };

    const handleFormSubmit = async(values,onSubmitProps) =>{
        if(isLogin) await login(values, onSubmitProps);
        if(isRegister) await register(values, onSubmitProps);

    };

    return (
        <Formik
            onSubmit = {handleFormSubmit}
            initialValues = {isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema = {isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm
            }) => (
                <form onSubmit = {handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4,minmax(0,1fr))"
                        sx = {{
                            "& > div": {gridColumn: isNonMobile ? undefined : "span 4"},
                        }}
                    >
                        {isRegister && (
                            <>
                                <TextField
                                    label = "displayName"
                                    onBlur = {handleBlur}
                                    onChange = {handleChange}
                                    value = {values.displayName}
                                    name = "displayName"
                                    error = {Boolean(touched.displayName) && Boolean(errors.displayName)}
                                    helperText = {touched.displayName && errors.displayName}
                                    sx = {{gridColumn: "span 2"}}
                                />
                            </>
                        )}

                    <TextField
                       label = "Email"
                        onBlur = {handleBlur}
                        onChange = {handleChange}
                        value = {values.email}
                        name = "email"
                        error = {Boolean(touched.email) && Boolean(errors.email)}
                        helperText = {touched.email && errors.email}
                        sx = {{gridColumn: "span 2"}}
                       />
                    <TextField
                       label = "Password"
                       type="password"                             
                        onBlur = {handleBlur}
                        onChange = {handleChange}
                        value = {values.password}
                        name = "password"
                        error = {Boolean(touched.password) && Boolean(errors.password)}
                        helperText = {touched.password && errors.password}
                        sx = {{gridColumn: "span 2"}}
                       />
                    </Box>


                    {/*Buttons*/}
                    <Box>
                        <Button
                            fullWidth
                            type= "submit"
                            sx = {{
                                m: "2rem 0",
                                p: "1rem",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": {color: palette.primary.main},
                            }}
                        >
                            {isLogin? "LOGIN" : "REGISTER"}
                        </Button>
                        <Typography
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login");
                                resetForm();
                            }}
                            sx = {{
                                textDecoration: "underline",
                                color: palette.primary.main,
                                "&:hover": {
                                    cursor: "pointer",
                                    color: palette.primary.light,
                                },
                            }}
                        >
                            {isLogin ? "Sign up here!" : "Already have an account? Login here."}
                        </Typography>
                    </Box>
                </form>
            )}
        </Formik>
    )
};

export default Form;