export interface ButtonProps {
  value: string;
  onClick: () => void;
}

export default function TmpButton(props: ButtonProps) {
  const { value, onClick } = props;

  return <button onClick={onClick}>{value}</button>;
}
