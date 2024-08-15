import { Button, Modal, UnstyledButton } from "@mantine/core";

interface Props {
  onClose: () => void;
  opened: boolean;
  title: string;
  text: React.ReactNode;
  onConfirm: () => void;
  loading?: boolean;
}

export default function ModalDelete({
  onClose,
  opened,
  text,
  title,
  onConfirm,
  loading,
}: Props) {
  return (
    <Modal onClose={onClose} opened={opened} centered>
      <div className="font-semibold text-center flex flex-col text-2xl">
        {title}
      </div>
      <div className="font-medium text-center flex flex-col my-4">{text}</div>
      <div className="flex flex-row justify-between mt-10">
        <UnstyledButton
          onClick={onClose}
          className="flex flex-1 items-center justify-center"
        >
          No
        </UnstyledButton>
        <Button
          loading={loading}
          onClick={onConfirm}
          className="flex flex-1 items-center justify-center"
        >
          Yes
        </Button>
      </div>
    </Modal>
  );
}
