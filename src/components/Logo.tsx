export default function Logo({
  className = '',
  variant = 'color',
}: {
  className?: string;
  variant?: 'color' | 'white';
}) {
  const src = variant === 'white' ? '/img/logo-pccad-white.png' : '/img/logo-pccad.png';
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt="PCCAD"
      width={697}
      height={119}
      className={`w-auto object-contain ${className}`}
      style={{ aspectRatio: '5.86 / 1' }}
    />
  );
}
