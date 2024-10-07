export function ChipGroup({ values }: { values: string[] }) {
  return (
    <ul className="flex flex-wrap mt-2">
      {values.map((value, index) => (
        <Chip key={index} title={value} />
      ))}
    </ul>
  );
}

function Chip({ title }: { title: string }) {
  return (
    <li className="mr-1.5 mt-2">
      <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">
        {title}
      </div>
    </li>
  );
}
