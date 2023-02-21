export default function Status({ column, tasks }) {
  return (
    <div className="bg-white flex flex-col items-center py-5 w-[100px] h-[100px] rounded-lg">
      <div className="font-bold text-lg">{tasks ? tasks : 0}</div>
      <div className="font-normal text-sm">{column}</div>
    </div>
  );
}
