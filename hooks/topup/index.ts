import axios from "axios";
import { GetServerSideProps } from "next";

export const getTopUpServerSide: GetServerSideProps = async () => {
  try {
    console.log("sini");
    const strapi =
      "http://localhost:1337/api/top-up?populate=*&populate=bank.image&populate=merchant.image";
    // console.log(strapi, process.env.STRAPI);
    const response = await axios({
      url: strapi,
      headers: {
        Authorization: `bearer ${process.env.STRAPI}`,
      },
    });
    return {
      props: {
        data: {
          bank: response.data.data.attributes.bank,
          merchant: response.data.data.attributes.merchant,
        },
      },
    };
  } catch (e) {
    // console.log("e", e);
    return {
      props: {
        data: {},
      },
    };
  }
};
