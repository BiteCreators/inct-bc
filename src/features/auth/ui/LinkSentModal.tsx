import { Dispatch, SetStateAction } from "react";

import { Button, Modal, Typography } from "@byte-creators/ui-kit";

type Props = {
  bodyText: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
};

export const LinkSentModal = ({
  bodyText,
  isOpen,
  setIsOpen,
  title,
}: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      mode={"default"}
      onOpenChange={setIsOpen}
      title={title}
    >
      <div className={"flex flex-col gap-[18px] pb-6 pt-[18px] w-72 sm:w-80"}>
        <Typography className={"text-center sm:text-start"}>
          {bodyText}
        </Typography>
        <Button
          className={"self-center sm:self-end w-full sm:w-[96px]"}
          onClick={() => setIsOpen(false)}
        >
          Ok
        </Button>
      </div>
    </Modal>
  );
};
