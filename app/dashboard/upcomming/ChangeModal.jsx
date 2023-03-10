import { Modal, Button, TextInput, Label, Textarea } from "flowbite-react";
import React, { memo, useContext, useState } from "react";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { UserContext } from "../contexts/UserProvider";
import { toast } from "react-toastify";
export default memo(function PopUp({ setIsFetching, startTransition }) {
  const uid = useContext(UserContext);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit } = useForm();

  const onOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleAddMessage = async (data, uid) => {
    setIsFetching(true);
    await fetch("/api/changeUpcomming", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, uid: uid }),
    }).then((res) => res.json());

    setIsFetching(false);
    toast.success("Session updated!");
    startTransition(() => {
      router.refresh();
    });
  };

  const onSubmit = (data) => {
    handleAddMessage(data, uid);
    onOpen();
  };

  return (
    <React.Fragment>
      <button
        onClick={onOpen}
        className="mt-5 mb-10 w-full text-indigo-500 text-md font-semibold hover:text-indigo-600"
      >
        Edit
      </button>
      <Modal show={isOpen} size="lg" popup={true} onClose={onOpen}>
        <Modal.Header className="bg-[#192555]" />
        <Modal.Body className="bg-[#192555]">
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl text-center font-medium text-white">
              Edit session
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <div className="mb-2 block">
                  <Label
                    htmlFor="title"
                    value="Session name"
                    className="text-white"
                  />
                </div>
                <input
                  type="text"
                  id="title"
                  className="bg-[#111c44] text-white placeholder-gray-300 text-sm rounded-lg focus:ring-blue-900 border-none focus:border-blue-900 block w-full p-2.5"
                  placeholder="English class"
                  {...register("title", { required: true })}
                  required
                />
              </div>
              <div className="mb-4">
                <div className="mb-2 block">
                  <Label
                    htmlFor="description"
                    value="Session description"
                    className="text-white"
                  />
                </div>
                <textarea
                  id="description"
                  rows="8"
                  className="block p-2.5 w-full text-sm bg-[#111c44] text-white placeholder-gray-300  rounded-lg border-none focus:ring-blue-900  focus:border-blue-900 "
                  placeholder="Write event description..."
                  {...register("description")}
                />
              </div>
              <div className="mb-4">
                <div className=" font-semibold text-sm text-white mb-2">
                  Choose time of session
                </div>
                <input
                  type="time"
                  className="bg-[#111c44] text-white border-none rounded-lg"
                  {...register("time", { required: true })}
                />
              </div>
              <div className="mb-4">
                <div className=" font-semibold text-sm text-white mb-2">
                  Choose date of session
                </div>
                <input
                  className="bg-[#111c44] text-white border-none rounded-lg"
                  type="date"
                  {...register("date", { required: true })}
                />
              </div>
              <button
                type="submit"
                className="text-white justify-center flex items-center bg-indigo-700  w-full focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-3"
              >
                Confirm
              </button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
});
