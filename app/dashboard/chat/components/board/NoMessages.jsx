export default function NoMessages({ height }) {
  return (
    <div
      className="justify-center overflow-y-auto items-center w-full flex flex-col p-3 "
      style={{
        height: `calc(100vh - ${
          height < 50 ? 50 : height > 200 ? 200 : height
        }px - 118px)`,
      }}
    >
      No messages yet
    </div>
  );
}
