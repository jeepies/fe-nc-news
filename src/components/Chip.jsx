export default function Chip(props) {
  const { text, useDark, onClick, className } = props;
  return <span onClick={onClick} className={`${useDark ? "bg-heavy-metal" : "bg-dark-grey"} text-center text-white  rounded-lg p-1 capitalize text-xs hover:cursor-pointer ${className}`}>{text}</span>;
}
