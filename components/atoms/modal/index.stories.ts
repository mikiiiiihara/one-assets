import { Meta, StoryObj } from "@storybook/react";
import { Modal, ModalProps } from ".";

export default {
  title: "atoms/Modal",
  component: Modal,
} as Meta;

export const Default: StoryObj<ModalProps> = {
  args: {
    size: "md",
    onClose: () => alert("close"),
    children: "モーダルの内容がここに入ります",
  },
};

