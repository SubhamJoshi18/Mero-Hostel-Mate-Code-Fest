function PrimaryButton({ title, ...restProps }) {
  return (
    <button
    className="text-white text-md bg-[--btn-primary] px-6 py-2 rounded-lg hover:bg-[--btn-secondary] transition-all active:translate-y-0.5"
    {...restProps}
    >
      {title}
    </button>
  );
}

export default PrimaryButton;
