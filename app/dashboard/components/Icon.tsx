export const Icon = ({ name, color, size }) => {
  return (
    <svg width={size} fill={color}>
      <use href={`../../../public/svg/icons.svg#icon-${name}`} />
    </svg>
  );
};
