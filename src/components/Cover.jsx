// gambar project, atau cover generatif kalau belum ada screenshot
export default function Cover({ p, i = 0, eager }) {
  if (p.img) return <img src={p.img} alt={`Tampilan ${p.nama}`} loading={eager ? "eager" : "lazy"} draggable="false" />;
  const h = (i * 47 + 20) % 360;
  return (
    <div
      className="cover-gen"
      style={{ background: `linear-gradient(135deg,hsl(${h} 70% 38%),hsl(${(h + 60) % 360} 80% 22%))` }}>
      <span>{p.nama.slice(0, 2)}</span>
    </div>
  );
}
