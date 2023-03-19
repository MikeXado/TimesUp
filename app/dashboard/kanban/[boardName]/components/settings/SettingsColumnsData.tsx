"use client";
import { useContext, useState } from "react";
import { KanbanColumnsType } from "../../../../../../types";
import { UserContext } from "../../../../contexts/UserProvider";
import useSWR, { mutate } from "swr";
import { Spinner } from "flowbite-react";
import { toast } from "react-toastify";
export default function SettingsColumnsData({ boardId }) {
  const [isFetching, setIsFetching] = useState(false);
  const uid = useContext(UserContext);
  const columnsFetcher = async (): Promise<KanbanColumnsType[]> => {
    const res = await fetch(`/api/v1/${uid}/kanban/${boardId}/columns`, {
      method: "GET",
    });

    const columns = await res.json();
    return columns;
  };

  const { data: columns, isLoading } = useSWR(
    `/api/v1/${uid}/kanban/${boardId}/columns`,
    columnsFetcher
  );

  const handleDeleteColumn = async (columnId: string) => {
    setIsFetching(true);
    await fetch(`/api/v1/${uid}/kanban/${boardId}/column/${columnId}`, {
      method: "DELETE",
    });

    mutate(`/api/v1/${uid}/kanban/${boardId}/columns`);
    toast.success("Column deleted");
    setIsFetching(false);
  };

  return (
    <div>
      {columns?.length === 0 ? (
        <div className="text-center text-white text-md">No columns yet</div>
      ) : (
        columns?.map((el) => {
          return (
            <li key={el.id} className="relative px-5 list-none">
              <h6 className="list-none w-full text-white  rounded-md py-3 pl-3 mb-3">
                {el.column}
              </h6>

              <button
                onClick={() => handleDeleteColumn(el.id)}
                type="button"
                className="bg-transparent border border-[#6e6ae4] p-2 rounded-lg absolute right-[26px] top-[5.5px]"
              >
                <div className="w-5 h-5 flex justify-center items-center">
                  {isFetching ? (
                    <Spinner />
                  ) : (
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="#fff"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  )}
                </div>
              </button>
            </li>
          );
        })
      )}
    </div>
  );
}
