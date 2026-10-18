// Icons come from the SVG sprite in index.html
export default function Icon({ name, className }) {
  return (
    <svg className={className}>
      <use href={`#i-${name}`} />
    </svg>
  )
}
