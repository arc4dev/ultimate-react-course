import { Link } from 'react-router-dom';

function Button({
  children,
  disabled,
  to,
  type = 'primary',
  onClick,
  className,
}) {
  const base =
    'inline-block text-sm rounded-full bg-yellow-400 text-stone-800 font-semibold uppercase tracking-wide transition-colors duration-200 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-1 disabled:cursor-not-allowed';

  const styles = {
    // the space between the base and the rest of the classes is important
    primary: base + ' bg-yellow-400 text-stone-800 px-4 py-2.5 md:px-6 md:py-4',
    small: base + '  text-xs px-3 py-2 md:px-4 md:py-2.5',
    secondary:
      'inline-block text-sm rounded-full font-semibold uppercase tracking-wide transition-colors duration-200 focus:outline-none focus:ring focus:ring-offset-1 disabled:cursor-not-allowed bg-transparent px-4 py-2.5 md:px-6 md:py-4 border-2 border-stone-300 hover:bg-stone-300 text-stone-400 focus:ring-stone-400 focus:bg-stone-300 hover:text-stone-800',
    round: base + ' w-8 h-8 md:w-9 md:h-9',
  };

  if (to && !onClick)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  return (
    <button
      onClick={onClick}
      className={`${styles[type]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
