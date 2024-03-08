import { homeCms } from "@/api/functions/cms.api";
import StorySec from "@/components/StorySec/StorySec";
import assest from "@/json/assest";
import { cardList } from "@/json/mock/cardlist.mock";
import Wrapper from "@/layout/wrapper/Wrapper";
import Typography from "@mui/material/Typography";
import { Box, flexbox } from "@mui/system";
import { useMutation, useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import styles from "@/styles/home.module.css";
import { Grid } from "@mui/material";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";

export default function Home() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  const sliderSettings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    height: 400,
    // color: "white",
    // borderTop: "4px solid orange",
    // bgcolor: "rgba(192,192,192,0.4)",
    // borderBottom: "2px solid #000",
    // boxShadow: 24,
    m: "auto",
    px: 4,
    zindex: 10
  };

  // Fetch Data
  const { data: homeCmsData } = useQuery({
    queryKey: ["home-cms"],
    queryFn: homeCms
  });
  console.log("homeCMSData", homeCmsData);

  return (
    <Wrapper>
      {/* Carousel */}
      <Slider {...sliderSettings}>
        {homeCmsData?.homebanner?.map((banner, key) => {
          return (
            <div>
              <Typography className={styles.carousel_caption}>
                {banner?.banner_title}
              </Typography>
              <div
                style={{ paddingLeft: "35vw" }}
                className={styles.carousel_caption2}
                dangerouslySetInnerHTML={{ __html: banner?.banner_description }}
              />
              <img
                src={banner?.banner_image_path}
                alt=""
                style={{ position: "relative" }}
              />
              <CustomButtonPrimary
                type="button"
                variant="contained"
                color="primary"
                className={styles.carousel_button}
              >
                <Typography>{homeCmsData?.birth_chart_report_title}</Typography>
              </CustomButtonPrimary>
            </div>
          );
        })}
      </Slider>
      {/* Section 2 */}
      <Box sx={{ backgroundColor: "#FEF9F6", mt: 3 }}>
        <Typography
          sx={{ textAlign: "center", color: "black", fontSize: "2rem", pt: 2 }}
        >
          {homeCmsData?.what_help_section_title}
        </Typography>
        <Grid
          sx={{ p: 5, pl: 40 }}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={4}>
            <img src={homeCmsData?.what_help_section1_image_path} alt="" />
            <Typography>{homeCmsData?.what_help_section1_title}</Typography>
          </Grid>
          <Grid item xs={4}>
            <img src={homeCmsData?.what_help_section2_image_path} alt="" />
            <Typography>{homeCmsData?.what_help_section2_title}</Typography>
          </Grid>
          <Grid item xs={4}>
            <img src={homeCmsData?.what_help_section3_image_path} alt="" />
            <Typography>{homeCmsData?.what_help_section2_title}</Typography>
          </Grid>
        </Grid>
      </Box>
      {/* Section 3 */}
      <Box className={styles.section3_background}>
        <Typography className={styles.section3_title}>
          {homeCmsData?.birth_chart_report_title}
        </Typography>
        <div
          className={styles.section3_secondary_text}
          dangerouslySetInnerHTML={{
            __html: homeCmsData?.birth_chart_report_desc as string
          }}
        />
        <CustomButtonPrimary
          type="button"
          variant="contained"
          color="primary"
          className={styles.section3_button}
        >
          <Typography>{homeCmsData?.birth_chart_report_link_text}</Typography>
        </CustomButtonPrimary>
      </Box>
      {/* Section 4 */}
      <Box className={styles.section4_box}>
        <Slider {...sliderSettings2}>
          <div>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <img
                  src={homeCmsData?.what_client_say_image1_path}
                  alt=""
                  style={{ background: "#2C4867", borderRadius: "50%" }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>{homeCmsData?.what_client_say_topic1}</Typography>
              </Grid>
            </Grid>
          </div>
          <div></div>
          <div></div>
        </Slider>
      </Box>
    </Wrapper>
  );
}
