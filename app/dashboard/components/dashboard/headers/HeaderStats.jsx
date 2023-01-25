export default function HeaderStats() {
  return (
    <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
      <div className="px-4 md:px-10 mx-auto w-full">
        <div>
          {/* Card stats */}
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4 bg-white">
              Stat0
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4 bg-white">
              Stat1
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4 bg-white">
              Stat2
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4 bg-white">
              Stat3
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
