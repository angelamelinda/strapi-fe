import { InferGetServerSidePropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTopUpServerSide } from "../hooks/topup";
const TopUp = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const list = (title: string, data: any) => {
    return (
      <>
        <h3>{title}</h3>
        <div className="flex mt-2 mb-4">
          {data?.map((item: any) => {
            const src = `http://localhost:1337${item.image.data?.attributes.url}`;
            return (
              <Link
                key={item.id}
                href={`#${item.name}`}
                className="[&:not(:first-child)]:ml-4"
              >
                <div className="relative w-[100px] h-[100px] rounded shadow ">
                  <Image
                    loader={() => src}
                    src={src}
                    fill
                    alt=""
                    className="object-contain px-1"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </>
    );
  };

  const listBox = (data: any) => {
    return data?.map((item: any) => {
      const src = `http://localhost:1337${item.image.data?.attributes.url}`;
      return (
        <div key={item.id} id={item.name} className="p-4 border rounded mt-12">
          <div className="h-[100px] w-[100px] relative w">
            <Image
              loader={() => src}
              src={src}
              fill
              alt=""
              className="object-contain px-1"
            />
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: item.description,
            }}
          />
        </div>
      );
    });
  };

  return (
    <div className="max-w-[1200px] px-8 pt-4 mx-auto topup">
      {list("Cara top-up melalui bank", data.bank)}
      {list("Cara top-up melalui merchant", data.merchant)}
      <div className="border border-t-0 py-4 border-x-0" />
      <div className="last:mb-8">
        {listBox(data.bank)}
        {listBox(data.merchant)}
      </div>
    </div>
  );
};

export default TopUp;

export const getServerSideProps = getTopUpServerSide;
