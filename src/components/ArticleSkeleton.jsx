export default function ArticleSkeleton() {
  return (
    <div className="bg-heavy-metal m-2 p-2 rounded text-dark-grey animate-pulse">
      <div className="w-full h-64 bg-dark-grey rounded mb-2" />
      <h1 className="bg-dark-grey rounded-lg mb-2">...</h1>
      <p className="bg-dark-grey rounded-lg w-32 mb-2">...</p>
      <p className="bg-dark-grey rounded-lg ">
        This is a really cool skeleton but I don't think its made the best. Oh
        well. It works and looks cool
      </p>
    </div>
  );
}
