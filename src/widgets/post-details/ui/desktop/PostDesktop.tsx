import React, { ReactNode, useState } from "react";

import { useAppSelector } from "@/common/lib/hooks/reduxHooks";
import { authSlice } from "@/entities/auth";
import { Post } from "@/entities/posts";
import { AddCommentTextarea, DesktopCommentsList } from "@/features/comments";
import { EditPost } from "@/features/edit-post";
import { PostActionsBlock, PostDescription } from "@/features/posts";
import { Button, Modal } from "@byte-creators/ui-kit";
import { Close } from "@byte-creators/ui-kit/icons";
import { Slider } from "@byte-creators/ui-kit";
import { cn } from "@byte-creators/utils";
import { useRouter } from "next/router";

import { PostModalTitle } from "./PostModalTitle";

type Props = {
  comments: { id: string; text: string }[];
  post: Post;
  slides: ReactNode[];
};

export const PostDesktop = ({ comments, post, slides }: Props) => {
  const router = useRouter();
  const isAuth = useAppSelector(authSlice.selectors.selectAccessToken);
  const [editMode, setEditMode] = useState<boolean>(false);

  const postWithPic = post.images.length !== 0;

  const handleOpenChange = () => {
    router.back();
  };

  return (
    <>
      <EditPost
        changeEditMode={setEditMode}
        isOpen={editMode}
        post={post}
        slides={slides}
      />
      <Modal
        className={cn([
          "w-full border-x-8",
          postWithPic ? "border-dark-900" : "border-none",
          "lg-md:border-none",
        ])}
        isOpen={!editMode}
        maxWidth={postWithPic ? "max-w-[980px]" : ""}
        mode={"custom"}
        onOpenChange={handleOpenChange}
      >
        <Button
          variant="icon"
          className={"absolute -top-8 -right-8 bg-transparent p-0"}
          onClick={handleOpenChange}
        >
          <Close
            className={cn(
              "fill-current rounded-full text-light-100",
              postWithPic && "bg-dark-100",
              "lg-md:bg-transparent",
            )}
          />
        </Button>
        <div className={cn(["flex flex-row"])}>
          {postWithPic && (
            <Slider
              height={"full"}
              slides={slides}
              stylesSlider={"max-w-[500px] min-w-[390px]"}
            />
          )}
          <>
            <div
              className={
                "max-w-[480px] max-h-[564px] flex flex-col overflow-hidden"
              }
            >
              <PostModalTitle changeEditMode={setEditMode} post={post} />
              <div className={"border-y-[1px] border-dark-100"} />
              <DesktopCommentsList
                comments={comments}
                description={<PostDescription post={post} />}
              />
              <PostActionsBlock post={post} />
              {isAuth && <AddCommentTextarea />}
            </div>
          </>
        </div>
      </Modal>
    </>
  );
};
