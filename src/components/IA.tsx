export const IA = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center gap-y-16 text-center">
      <div>
        <h1 className="font-bold text-2xl lg:text-3xl">
          Describe your daily routine
        </h1>
        <p className="text-center lg:text-xl">
          Use AI to create a daily routine
        </p>
      </div>
      <input
        className="w-full max-w-xl h-12 border-card lg:max-w-2xl lg:h-14 px-2"
        type="text"
      />
    </section>
  );
};
