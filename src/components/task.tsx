import { Card } from './UI/card';

interface props {
  name: string;
  startHour: `${number}:${number}`;
  endHour: `${number}:${number}`;
}

export const Task = ({ name, startHour, endHour }: props) => {
  return (
    <Card>
      <h2 className="font-medium">{name}</h2>
      <span>{startHour}</span>
      <br />
      <span>{endHour}</span>
    </Card>
  );
};
