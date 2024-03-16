import VideoDetails from "@/components/video/videoDetails";

export default async function VideoDetail({
  params,
}: {
  params: { _id: string };
}) {
  const id = params._id;

  return (
    <>
      <VideoDetails id={id} />
    </>
  );
}
