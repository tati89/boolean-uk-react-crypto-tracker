export default function SideListItem({
  isSelectedCripto,
  selectCripto,
  item: { id, name },
}) {
  return (
    <li key={id}>
      <button
        className={isSelectedCripto(id) ? "selected" : ""}
        onClick={() => selectCripto(id)}
      >
        {name}
      </button>
    </li>
  );
}
