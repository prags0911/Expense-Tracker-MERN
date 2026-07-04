const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="flex flex-col items-center gap-4">
        <div className="w-14 h-14 border-4 border-white border-t-transparent rounded-full animate-spin"></div>

        <p className="text-white text-lg font-semibold">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loader;