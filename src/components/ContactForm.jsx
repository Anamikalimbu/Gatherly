import { useState } from "react";
import FormField from "./FormField.jsx";
import { sendContactMessage } from "../api/contact.js";

const emptyForm = { name: "", email: "", subject: "", message: "" };

function validate(values) {
  const errors = {};

  if (!values.name.trim()) errors.name = "Please enter your name.";

  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = "That email address doesn't look right.";
  }

  if (!values.subject.trim()) errors.subject = "Please add a subject.";

  if (values.message.trim().length < 10) {
    errors.message = "The message should be at least 10 characters.";
  }

  return errors;
}

function ContactForm() {
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    // clear the error for this field as soon as the user starts fixing it
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const foundErrors = validate(values);
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) return;

    try {
      setSending(true);
      await sendContactMessage(values);
      setSent(true);
      setValues(emptyForm);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="notice notice-success" role="status">
        <p className="status-title">Message sent</p>
        <p>Thanks for writing to us. We usually reply within two working days.</p>
        <button className="btn btn-outline" onClick={() => setSent(false)}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
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
        type="email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
        autoComplete="email"
      />
      <FormField
        label="Subject"
        name="subject"
        value={values.subject}
        onChange={handleChange}
        error={errors.subject}
      />
      <FormField
        label="Message"
        name="message"
        as="textarea"
        rows="6"
        value={values.message}
        onChange={handleChange}
        error={errors.message}
      />

      {submitError && (
        <p className="form-error" role="alert">
          {submitError}
        </p>
      )}

      <button className="btn" type="submit" disabled={sending}>
        {sending ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}

export default ContactForm;
