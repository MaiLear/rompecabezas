import "./GridComponent.css";

export default function GridComponent({
  index,
  content,
  savePosition,
  classActive,
  classEmpty,
}) {
  const classGrid = "grid";

  const removeAllActiveClass = (classGrid, classGridActive) => {
    const GRIDS = document.querySelectorAll(`.${classGrid}`);
    GRIDS.forEach((grid) => grid.classList.remove(classGridActive));
  };

  const addActiveClass = (e, classGrid, classGridActive,classEmpty) => {
    const $element = e.target.tagName != "DIV" ? e.target.parentElement : e.target;

    removeAllActiveClass(classGrid, classGridActive);

    if (!$element.classList.contains(classGrid) || $element.classList.contains(classEmpty)) return;

      $element.classList.add(classGridActive);
  };

  const handleClick = (e) => {
    addActiveClass(e, classGrid, classActive,classEmpty);
    savePosition(e, index);
  };

  return (
    <div
      className={`border-1 rounded grid ${content?.classEmptyDiv ?? ""} ${
        content?.classEmpty ?? ""
      }`}
      onClick={handleClick}
    >
      {content && content.image && (
        <img src={content.image} alt={content.alt} className="grid-image" />
      )}
    </div>
  );
}
