export default function Wrapper(props) {
  const { children, title } = props;
  return (
    <div className="bg-heavy-metal rounded p-2">
      <label className="text-white font-bold text-1xl sm:text-3xl capitalize">{title}</label>
      <div className="grid gap-2 text-white">{children}</div>
    </div>
  );
}
