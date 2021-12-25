import { supabase } from "../utils/supabase";
import Link from "next/link";
import { useUser } from "../context/user";

export default function Home({ lessons }) {
  const { user } = useUser();
  console.log({ user });
  return (
    <div className="w-full max-w-3xl px-2 mx-auto my-16">
      {lessons.map((lesson) => (
        <Link key={lesson.id} href={`/${lesson.id}`}>
          <a className="flex h-40 p-8 mb-4 text-xl rounded shadow">
            {lesson.title}
          </a>
        </Link>
      ))}
    </div>
  );
}

export const getStaticProps = async () => {
  const { data: lessons } = await supabase.from("lesson").select("*");

  return {
    props: {
      lessons,
    },
  };
};

