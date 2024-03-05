import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { Autocomplete, Avatar, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import dynamic from "next/dynamic";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import validationText from "@/json/messages/validationText";
import emailRegex from "@/lib/regex";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { useRouter } from "next/router";
import { signUpMutation } from "@/api/functions/user.api";

const Wrapper = dynamic(() => import("@/layout/wrapper/Wrapper"));

export const SignupSchema = yup
  .object()
  .shape({
    full_name: yup.string().required(),
    email: yup
      .string()
      .trim()
      .email(validationText.error.email_format)
      .required(validationText.error.enter_email)
      .matches(emailRegex.emailRegex, validationText.error.email_format),
    password: yup.string().trim().required(validationText.error.enter_password),
    birth_year: yup.number().required(),
    birth_month: yup.number().required(),

    birth_date: yup.number().required(),
    birth_hour: yup.number().required(),
    birth_minute: yup.number().required(),
    birth_meridian: yup.string().required(),
    birth_place: yup.string().required(),
    current_location: yup.string().required(),
    lat: yup.number().required(),
    lon: yup.number().required()
  })
  .required();

export type signupSchemaType = yup.InferType<typeof SignupSchema>;

const register = () => {
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm({
    resolver: yupResolver(SignupSchema),
    mode: "all",
    defaultValues: {
      full_name: "",
      email: "",
      birth_year: null,
      birth_month: null,
      birth_date: null,
      birth_hour: null,
      birth_minute: null,
      birth_meridian: "",
      birth_place: "",
      current_location: "",
      password: "",
      lat: null,
      lon: null
    }
  });

  const { mutate } = useMutation({
    mutationFn: signUpMutation
  });

  const handleSignup = (data: typeof SignupSchema) => {
    console.log("signup", data);

    mutate(
      { ...data },
      {
        onSuccess: (response) => {
          if (response?.data?.status === true) {
            toast.success(response?.data?.message);
          }
        }
      }
    );
  };

  return (
    <Wrapper>
      <Container maxWidth="sm" sx={{ my: 4 }}>
        <Box width="50%" margin="auto">
          <Avatar sx={{ m: 1, bgcolor: "secondary.main", margin: "auto" }}>
            <LockOutlinedIcon />
          </Avatar>
          <form onSubmit={handleSubmit(handleSignup)}>
            <InputFieldCommon
              required
              type="text"
              label="Full Name"
              sx={{
                my: 1
              }}
              {...register("full_name")}
            />
            <InputFieldCommon
              required
              type="text"
              label="Email"
              sx={{
                my: 1
              }}
              {...register("email")}
            />
            <InputFieldCommon
              required
              type="number"
              label="Birth_year"
              sx={{
                my: 1
              }}
              {...register("birth_year")}
            />
            <InputFieldCommon
              required
              type="number"
              label="Birth_month"
              sx={{
                my: 1
              }}
              {...register("birth_month")}
            />
            <InputFieldCommon
              required
              type="number"
              label="Birth_date"
              sx={{
                my: 1
              }}
              {...register("birth_date")}
            />
            <InputFieldCommon
              required
              type="number"
              label="Birth_hour"
              sx={{
                my: 1
              }}
              {...register("birth_hour")}
            />
            <InputFieldCommon
              required
              type="number"
              label="Birth_minute"
              sx={{
                my: 1
              }}
              {...register("birth_minute")}
            />
            <InputFieldCommon
              required
              type="text"
              label="Birth_meridian"
              sx={{
                my: 1
              }}
              {...register("birth_meridian")}
            />
            <InputFieldCommon
              required
              type="text"
              label="Birth_place"
              sx={{
                my: 1
              }}
              {...register("birth_place")}
            />
            <InputFieldCommon
              required
              type="text"
              label="Current_location"
              sx={{
                my: 1
              }}
              {...register("current_location")}
            />
            <InputFieldCommon
              required
              type="password"
              label="Password"
              sx={{
                my: 1
              }}
              {...register("password")}
            />
            <InputFieldCommon
              required
              type="number"
              label="Lat"
              sx={{
                my: 1
              }}
              {...register("lat")}
            />
            <InputFieldCommon
              required
              type="number"
              label="lon"
              sx={{
                my: 1
              }}
              {...register("lon")}
            />
            <CustomButtonPrimary
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                margin: "auto"
              }}
            >
              <Typography>Register</Typography>
            </CustomButtonPrimary>
          </form>
        </Box>
      </Container>
    </Wrapper>
  );
};

export default register;
