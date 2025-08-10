import React from "react";

interface Props {
  style: string;
  toastMsg: string;
}
const ToastMsg = ({ style, toastMsg }: Props) => {
  return (
    <div
      className={` px-30 py-7 absolute top-20 right-0 border-2 border-gray-200 text-white font-semibold capitalize text-sm ${style}`}
    >
      {toastMsg}
    </div>
  );
};

export default ToastMsg;
