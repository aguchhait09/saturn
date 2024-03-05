import { HomeCmsInterface } from "@/interface/homeCms.interface";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

export const fetchAboutUs = async () => {
  const res = await axiosInstance.get(endpoints.cms.about);
  return res;
};

// Faq
export const faqQuery = () => {
  const res = axiosInstance.get(endpoints.cms.faq);

  return res;
};

// Home
export const homeCms = async ()=>{
  const res = await axiosInstance.get<HomeCmsInterface>(
    endpoints.cms.home_cms
  )
  // console.log('cmsHome', res);  
  return res?.data?.data
}
