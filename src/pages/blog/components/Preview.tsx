import { Carousel } from "antd";
import { BaseText } from "../../../components";
import { useBlogState } from "../store";
import Images from "../../../assets/gen";

export const Preview = () => {
  const { blog } = useBlogState((state) => state);
  console.log("blog", blog?.images);

  return (
    <div className="max-w-[468px] min-w-[468px] p-6 overflow-auto flex flex-col">
      {blog?.content ||
      (blog?.images && blog.images[0]) ||
      blog?.title ||
      (blog?.tags && blog.tags[0]) ? (
        <>
          <BaseText locale bold size={24}>
            Review
          </BaseText>
          <Carousel draggable autoplay className="h-[256px] rounded-lg mt-4">
            {(blog?.images || []).map((item) => (
              <img
                src={
                  typeof item === "string" ? item : URL.createObjectURL(item)
                }
                className="rounded-lg mb-6 h-[256px] object-cover"
              />
            ))}
          </Carousel>
          <BaseText locale bold size={24} className="mt-4">
            {blog?.title}
          </BaseText>
          <div className="flex flex-wrap flex-row gap-x-3">
            {[
              (blog?.tags || []).map((item, index) => (
                <div
                  key={index}
                  className="relative  mt-3 px-4 py-1 bg-darkNight50 rounded-full flex justify-center items-center"
                >
                  <BaseText className="text-darkNight700" medium>
                    #{item}
                  </BaseText>
                </div>
              )),
            ]}
          </div>
          <div
            className="mt-4"
            dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
          ></div>
        </>
      ) : (
        <div className="flex flex-1 justify-center items-center flex-col">
          <img src={Images.noPost} className="w-[120px] h-[120px]" />
          <BaseText locale className="!text-darkNight500" medium size={16}>
            No posts yet
          </BaseText>
        </div>
      )}
    </div>
  );
};
