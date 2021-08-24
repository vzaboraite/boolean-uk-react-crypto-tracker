export default function SideListItem({ name, isSelected, onClick }) {
  return (
    <li>
      <button className={isSelected ? "selected" : ""} onClick={onClick}>
        {name}
      </button>
    </li>
  );
}
