export default function CustomInputField({ label, error, ...props }) {
  return (
    <label className="input-field">
      {label && <span>{label}</span>}
      <input {...props} />
      {error && <em className="input-error">{error}</em>}
    </label>
  );
}
