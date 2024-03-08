import Wrapper from "@/layout/wrapper/Wrapper";
import { Avatar, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import validationText from "@/json/messages/validationText";
import emailRegex from "@/lib/regex";
import { useMutation } from "@tanstack/react-query";
import { loginMutation } from "@/api/functions/user.api";
import { toast } from "sonner";
import { useParams, useSearchParams } from "next/navigation";
import axiosInstance from "@/api/axiosInstance";
import Link from "next/link";
import { GetServerSideProps } from "next";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email(validationText.error.email_format)
    .required(validationText.error.enter_email)
    .matches(emailRegex.emailRegex, validationText.error.email_format)
});
const login = ({ auth_data }) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "all",
    defaultValues: {
      email: ""
    }
  });
  const { mutate, isSuccess } = useMutation({
    mutationFn: loginMutation
  });

  const handleLogin = (data: typeof loginSchema) => {
    console.log("login", data);
    mutate(
      { ...data },
      {
        onSuccess: (response) => {
          if (response?.data?.status === true) {
            toast.success(response?.data?.message);
            // router.push(`https://saturn-ui.dedicateddevelopers.us/auth-confirm?session_id=ng2d2AsEsGRwWAuY4G2i&email=devid@yopmail.com`);
            router.push('/auth/authConfim')
          } else {
            toast.error(response?.data?.validation_errors);
          }
        }
      }
    );
  };

  const { token } = useParams();
  const searchParams = useSearchParams();
  console.log("token", searchParams.has("email"));
  console.log("auth_data", auth_data);

  return (
    <Wrapper>
      <Container maxWidth="sm" sx={{ my: 4 }}>
        {!isSuccess ? (
          <Box width="50%" margin="auto">
            <Avatar sx={{ m: 1, bgcolor: "secondary.main", margin: "auto" }}>
              <LockOutlinedIcon />
            </Avatar>
            <form onSubmit={handleSubmit(handleLogin)}>
              <InputFieldCommon
                required
                type="email"
                label="Email"
                sx={{
                  my: 1
                }}
                {...register("email")}
              />
              <CustomButtonPrimary
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  margin: "auto"
                }}
              >
                <Typography>Login</Typography>
              </CustomButtonPrimary>
            </form>
          </Box>
        ) : null}
      </Container>
    </Wrapper>
  );
};



export default login;
