import { Modal, Button, TextInput, Label, Textarea } from "flowbite-react";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
export default function PopUp({ setIsFetching, startTransition, uid }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit } = useForm();

  const onOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleAddMessage = async (data, uid) => {
    setIsFetching(true);
    await fetch("/api/addUpcomming", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, uid: uid }),
    }).then((res) => res.json());

    setIsFetching(false);

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
      <Button
        onClick={onOpen}
        className="mt-5 mb-10 w-full bg-indigo-600 hover:bg-indigo-700"
      >
        Add Session
      </Button>
      <Modal show={isOpen} size="lg" popup={true} onClose={onOpen}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">
              Add new session
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <div className="mb-2 block">
                  <Label htmlFor="title" value="Session name" />
                </div>
                <TextInput
                  {...register("title", { required: true })}
                  id="title"
                  placeholder="English"
                  required={true}
                />
              </div>
              <div className="mb-4">
                <div className="mb-2 block">
                  <Label htmlFor="description" value="Session description" />
                </div>
                <Textarea
                  type="text"
                  {...register("description", { required: true })}
                />
              </div>
              <div className="mb-4">
                <div className=" font-semibold text-sm ">
                  Choose time of session
                </div>
                <input type="time" {...register("time", { required: true })} />
              </div>
              <div className="mb-4">
                <div className=" font-semibold text-sm ">
                  Choose date of session
                </div>
                <input type="date" {...register("date", { required: true })} />
              </div>

              <Button className="mt-5 flex justify-center w-full" type="submit">
                Confirm
              </Button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}
