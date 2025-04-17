export default function Error({ title, errors, onConfirm }) {
  return (
    <div className="error">
      <h2>{title}</h2>
      <ul className="error">
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      {onConfirm && (
        <div id="confirmation-actions">
          <button onClick={onConfirm} className="button">
            Okay
          </button>
        </div>
      )}
    </div>
  );
}
