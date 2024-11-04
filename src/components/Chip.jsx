export default function Chip(props) {
  const { text } = props;
  return <span className="bg-dark-grey rounded-lg p-1 capitalize text-xs">{text}</span>;
}
