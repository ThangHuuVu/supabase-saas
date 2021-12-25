import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import Video from "react-player";

const LessonDetails = ({ lesson }) => {
  const [videoUrl, setVideoUrl] = useState();

  const getPremiumContent = async () => {
    const { data } = await supabase
      .from("premium_content")
      .select("video_url")
      .eq("id", lesson.id)
      .single();

    setVideoUrl(data?.video_url);
  };

  useEffect(() => {
    getPremiumContent();
  }, []);

  return (
    <div className="w-full max-w-3xl px-8 py-16 mx-auto">
      <h1 className="mb-6 text-3xl">{lesson.title}</h1>
      <p>{lesson.description}</p>
      {!!videoUrl && <Video url={videoUrl} width="100%" />}
    </div>
  );
};

export const getStaticPaths = async () => {
  const { data: lessons } = await supabase.from("lesson").select("id");

  const paths = lessons.map(({ id }) => ({
    params: {
      id: id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { id } }) => {
  const { data: lesson } = await supabase
    .from("lesson")
    .select("*")
    .eq("id", id)
    .single();

  return {
    props: {
      lesson,
    },
  };
};

export default LessonDetails;