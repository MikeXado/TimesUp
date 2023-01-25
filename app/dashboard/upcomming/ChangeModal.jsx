import { Modal, Button, TextInput, Label, Checkbox } from "flowbite-react";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
export default function ChangeModal({ setIsFetching, startTransition }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [sessionName, setSessionName] = useState("");
  const [sessionDescription, setSessionDescription] = useState("");

  const onOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelectedDays = (e) => {
    setDate(e.target.value);
  };

  const handleTime = (e) => {
    setTime(e.target.value);
  };

  const handleSessionName = (e) => {
    setSessionName(e.target.value);
  };

  const handleSessionDescription = (e) => {
    setSessionDescription(e.target.value);
  };

  const handleAddMessage = async () => {
    const data = {
      title: sessionName,
      description: sessionDescription,
      time: time,
      date: date,
    };

    setIsFetching(true);
    await fetch("/api/changeUpcomming", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    setIsFetching(false);

    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <React.Fragment>
      <button
        onClick={onOpen}
        className="text-blue-500 font-semibold hover:text-blue-700"
      >
        Edit
      </button>
      <Modal
        show={isOpen}
        className="overflow-auto"
        size="lg"
        popup={true}
        onClose={onOpen}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">
              Edit session
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="title" value="Session name" />
              </div>
              <TextInput
                onChange={handleSessionName}
                value={sessionName}
                id="title"
                placeholder="English"
                required={true}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="Session description" />
              </div>
              <TextInput
                onChange={handleSessionDescription}
                value={sessionDescription}
                id="description"
                required={true}
              />
            </div>
            <div className=" font-semibold text-sm ">
              Choose time of session
            </div>
            <input type="time" onChange={handleTime} value={time} />
            <div className=" font-semibold text-sm ">
              Choose date of session
            </div>
            <input type="date" onChange={handleSelectedDays} value={date} />
            <Button
              className="mt-5 flex justify-center w-full"
              onClick={() => {
                handleAddMessage();
                onOpen();
              }}
            >
              Confirm
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}
