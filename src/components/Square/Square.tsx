type Position = `${"a" | "b" | "c" | "d" | "e" | "f" | "g" | "h"}${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}`;

type FieldProps = {
  color: "black" | "white";
  position?: Position;
};

const Square = ({ color, position }: FieldProps) => {
  console.log(`Field at position ${position} with color ${color}`);
  return <div style={{ backgroundColor: color }}></div>;
};

export default Square;
