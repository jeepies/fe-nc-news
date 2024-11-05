export default function Chip(props) {
  const { text, useDark } = props;
  return <span className={`${useDark ? "bg-heavy-metal" : "bg-dark-grey"} rounded-lg p-1 capitalize text-xs`}>{text}</span>;
}
