export default function Wrapper(props) {
  const { children, title, description } = props;
  return (
    <div className="bg-heavy-metal rounded p-2">
      <h1 className="text-white font-bold text-2xl sm:text-3xl capitalize">
        {title}
      </h1>
      {description && (
        <>
          <label className="text-white">
            {description}
          </label>
        </>
      )}
      <div className="grid gap-2 text-white">{children}</div>
    </div>
  );
}