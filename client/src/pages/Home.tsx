function Home() {
  return (
    <div className="min-h-screen flex flex-col p-10">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
        <div className="col-span-2">
          <h1 className="text-7xl font-extrabold mb-4 tracking-wider">
            FIND YOUR <br />
            <span className="text-blue-500">DREAM </span>JOB
          </h1>

          <p className="text-lg text-gray-500">
            Your gateway to exciting job opportunities. <br />
            <span className="ml-4">
              Explore, connect, and find your dream job with us.
            </span>
          </p>

          {/* HERE GOES  THE SEARCH BAR */}
        </div>
      </div>
    </div>
  );
}

export default Home;
