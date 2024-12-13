function SecondaryButton({ title, ...restProps }) {
  return (
    <button
    className="bg-white border-[--btn-primary] text-md px-6 py-2 rounded-lg font-semibold hover:bg-[--btn-secondary] transition-all active:translate-y-0.5"
    {...restProps}
    >
      {title}
    </button>
  );
}

export default SecondaryButton;
