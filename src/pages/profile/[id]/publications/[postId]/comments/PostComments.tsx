import React from "react";

import { PostComment } from "@/features/comments";
import { ArrowBackOutline } from "@byte-creators/ui-kit";
import { ScrollArea, Typography } from "@byte-creators/ui-kit";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function PostComments() {
  // MOCK (remove later)------------//
  const comments = [
    {
      id: "1",
      text: "eiusmodcididunt ut laboreagna aliquaeiusmod tempor incididunt ut labore et dolore magna aliquaeiusmod tempor incididunt ut labore et dolore magna aliquaeiusmod tempor incididunt ut labore et dolore magna aliqua",
    },
    { id: "2", text: "eiusmod" },
    { id: "3", text: "eiusmod tempor labore et dolore magna aliqua" },
    {
      id: "4",
      text: "eiusmod tempor incididunt ut labore et dolore magna aliquadolore magna aliqua",
    },
  ];
  //-------------------------------------------------------

  const params = useParams<{ id: string; postId: string }>();
  const id = params?.id;
  const postId = params?.postId;

  return (
    <div className={"-my-6 md:hidden"}>
      {/*Header*/}
      <div className={"flex items-center justify-center"}>
        <button className={"absolute left-4"}>
          <Link href={`/profile/${id}/publications/${postId}/`}>
            <ArrowBackOutline viewBox={"0 -2 24 24"} />
          </Link>
        </button>
        <Typography className={"font-weight700"} variant={"h2"}>
          Comments
        </Typography>
      </div>
      {/*Comments*/}
      <ScrollArea className={"flex-1 px-6 pt-5 pb-2 w-full"}>
        <div className={"flex flex-col gap-4 h-[336px]"}>
          {comments.map((el) => (
            <PostComment key={el.id} text={el.text} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
