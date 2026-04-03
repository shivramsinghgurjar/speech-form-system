export default function FormRenderer({ data, setData }) {
  return (
    <div className="mt-4">
      {Object.keys(data).map((key) => (
        <input
          key={key}
          value={data[key]}
          onChange={(e) =>
            setData({ ...data, [key]: e.target.value })
          }
          placeholder={key}
          className="border p-2 block mb-2 w-full"
        />
      ))}
    </div>
  );
}