import { useState } from "react";
import FormField from "./FormField.jsx";
import { registerForEvent } from "../api/registration.js";
import { eventShape } from "./propTypes.js";

function RegisterForm({ event }) {
  const [values, setValues] = useState({ name: "", email: "", tickets: "1" });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [submitError, setSubmitError] = useState("");

  const maxTickets = Math.min(5, event.seatsLeft);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const found = {};
    if (!values.name.trim()) found.name = "Please enter your name.";
    if (!values.email.trim()) {
      found.email = "Please enter your email.";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      found.email = "That email address doesn't look right.";
    }
    return found;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    try {
      setSending(true);
      const result = await registerForEvent({
        eventId: event.id,
        name: values.name,
        email: values.email,
        tickets: Number(values.tickets),
      });
      setConfirmation({ ref: result.id, tickets: values.tickets });
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSending(false);
    }
  };

  if (event.seatsLeft === 0) {
    return (
      <div className="notice">
        <p className="status-title">This event is sold out</p>
        <p>There are no seats left. Have a look at our other events.</p>
      </div>
    );
  }

  if (confirmation) {
    return (
      <div className="notice notice-success" role="status">
        <p className="status-title">You're registered</p>
        <p>
          {confirmation.tickets} {confirmation.tickets === "1" ? "ticket" : "tickets"} booked
          for {event.title}. Your booking reference is <strong>GL-{confirmation.ref}</strong>.
        </p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <h2>Reserve your seat</h2>
      <FormField
        label="Your name"
        name="name"
        value={values.name}
        onChange={handleChange}
        error={errors.name}
        autoComplete="name"
      />
      <FormField
        label="Email"
        name="email"
        hint="Your booking reference is shown on screen after you register."
        type="email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
        autoComplete="email"
      />
      <FormField
        label="Number of tickets"
        name="tickets"
        as="select"
        value={values.tickets}
        onChange={handleChange}
      >
        {Array.from({ length: maxTickets }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </FormField>

      {submitError && (
        <p className="form-error" role="alert">
          {submitError}
        </p>
      )}

      <button className="btn" type="submit" disabled={sending}>
        {sending ? "Registering..." : "Register now"}
      </button>
    </form>
  );
}

RegisterForm.propTypes = { event: eventShape.isRequired };

export default RegisterForm;
