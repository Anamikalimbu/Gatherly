import PropTypes from "prop-types";

function FormField({ label, name, value, onChange, error, hint, as = "input", children, ...rest }) {
  const Control = as;
  const describedBy = error ? `${name}-error` : hint ? `${name}-hint` : undefined;

  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <Control
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={describedBy}
        className={error ? "input input-invalid" : "input"}
        {...rest}
      >
        {children}
      </Control>
      {hint && !error && (
        <p className="field-hint" id={`${name}-hint`}>
          {hint}
        </p>
      )}
      {error && (
        <p className="field-error" id={`${name}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  hint: PropTypes.string,
  as: PropTypes.oneOf(["input", "textarea", "select"]),
  children: PropTypes.node,
};

export default FormField;
