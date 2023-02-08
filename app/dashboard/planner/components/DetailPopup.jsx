import { format, parseISO } from "date-fns";
import { Modal, Button } from "flowbite-react";
import React from "react";

export default function DetailPopup({
  setIsOpen,
  isOpen,
  setChangeOpen,
  event,
}) {
  const onOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleChangeOpen = () => {
    setChangeOpen((prev) => !prev);
    setIsOpen(false);
  };
  return (
    <React.Fragment>
      <Modal show={isOpen} size="lg" popup={true} onClose={onOpen}>
        <Modal.Header>
          <Button
            className="bg-indigo-600 hover:bg-indigo-700"
            onClick={handleChangeOpen}
          >
            Change
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">
              Event information
            </h3>
            <div>
              <div className="mb-5">
                <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Title
                </div>
                <div className="text-gray-600">{event.title}</div>
              </div>
              <div className="mb-5">
                <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Description
                </div>
                <div className="text-gray-600">{event.description}</div>
              </div>
              <div className="mb-5 flex items-center w-full">
                <div className="">
                  <div className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Start time
                  </div>
                  <div className="text-gray-600">{event.startTime}</div>
                </div>
                <div className="font-bold text-lg ml-5 mr-5">-</div>
                <div className="">
                  <div className=" mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    End time
                  </div>
                  <div className="text-gray-600">{event.endTime}</div>
                </div>
              </div>
              <div className="mb-5">
                <div className=" mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Date
                </div>
                <div className="text-gray-600">
                  {format(parseISO(event.date), "d MMMM yyyy")}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}
