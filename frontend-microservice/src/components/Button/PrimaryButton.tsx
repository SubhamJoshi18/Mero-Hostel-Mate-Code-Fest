function PrimaryButton({ title, ...restProps }) {
  return (
    <button
      {...restProps}
      className="text-white text-md bg-[--btn-primary] px-6 py-2 rounded-lg hover:bg-[--btn-secondary] transition-all active:translate-y-0.5"
    >
      {title}
    </button>
  );
}

export default PrimaryButton;
