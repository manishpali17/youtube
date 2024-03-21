import VideoDetails from "@/components/video/videoDetails";

export default async function VideoDetail({
  params,
}: {
  params: { _id: string };
}) {
  const id = decodeURIComponent(params._id);

  return (
    <>
      <VideoDetails id={id} />
    </>
  );
}
