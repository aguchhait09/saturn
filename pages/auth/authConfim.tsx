import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import { GetServerSideProps } from "next";

const index = ({ auth_data }) => {
  return <>
    <h3></h3>
    </>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { email, session_id } = ctx.query;

  let body = null;

  if (ctx.query) {
    body = {
      email: email,
      token: session_id 
    };
  }

  let { data: auth_data } = await axiosInstance.post(
    endpoints.auth.magicAuth
    , body);
  return {
    props: {
      auth_data
    }
  };
};

export default index;
