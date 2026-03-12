export default function Botao({ text, className, linkClick }) {
  const handleClick = () => {
    if (typeof linkClick === "string") {
      window.open(linkClick, "_blank");
    } else if (typeof linkClick === "function") {
      linkClick();
    }
  };

  return (
    <button className={`btn-primary ${className}`} onClick={handleClick}>
      {text}
    </button>
  );
}