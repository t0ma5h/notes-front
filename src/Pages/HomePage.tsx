import { imageUrl } from "../utils/utils";

const HomePage = () => {
  return (
    <div className="h-screen w-full overflow-hidden bg-cover">
      <div
        className="h-full w-full bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      >
        <div className="flex flex-col items-center justify-center h-full bg-black bg-opacity-50">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center">
            Welcome to the Note App
          </h1>
          <p className="text-base md:text-lg lg:text-xl font-semibold p-4 text-gray-300 text-center max-w-2xl">
            You can create your own notes for all your tasks and categorize them
            as you like.
            <br />
            You can also mark your favorite notes and access them easily.
          </p>
        </div>
      </div>
      <footer className="fixed bottom-0 w-screen text-center p-4 bg-gray-600 text-white dark:bg-gray-800">
        Page created by Edvinas
      </footer>
    </div>
  );
};

export default HomePage;
