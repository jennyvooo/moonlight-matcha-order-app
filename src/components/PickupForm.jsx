import { useState } from 'react'

const PICKUP_TIMES = [
  '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM',
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM', '5:00 PM',
]

function validate(values) {
  const errors = {}
  if (!values.name.trim())
    errors.name = 'Name is required.'
  if (!values.email.trim())
    errors.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = 'Enter a valid email address.'
  if (!values.pickupTime)
    errors.pickupTime = 'Please select a pickup time.'
  return errors
}

export default function PickupForm({ onSubmit, disabled }) {
  const [values, setValues] = useState({ name: '', email: '', pickupTime: '' })
  const [touched, setTouched] = useState({ name: false, email: false, pickupTime: false })

  const errors  = validate(values)
  const isValid = Object.keys(errors).length === 0

  function handleChange(e) {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleBlur(e) {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    // Mark all fields touched so errors show if the user skipped fields
    setTouched({ name: true, email: true, pickupTime: true })
    if (!isValid) return
    onSubmit(values)
  }

  return (
    <form className="pickup-form" onSubmit={handleSubmit} noValidate>

      <div className="form-field">
        <label htmlFor="pf-name">Name</label>
        <input
          id="pf-name"
          name="name"
          type="text"
          placeholder="Your name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          className={touched.name && errors.name ? 'input-error' : ''}
        />
        {touched.name && errors.name && (
          <span className="field-error">{errors.name}</span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="pf-email">Email</label>
        <input
          id="pf-email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          className={touched.email && errors.email ? 'input-error' : ''}
        />
        {touched.email && errors.email && (
          <span className="field-error">{errors.email}</span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="pf-pickup-time">Pickup Time</label>
        <select
          id="pf-pickup-time"
          name="pickupTime"
          value={values.pickupTime}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          className={touched.pickupTime && errors.pickupTime ? 'input-error' : ''}
        >
          <option value="">Select a time…</option>
          {PICKUP_TIMES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        {touched.pickupTime && errors.pickupTime && (
          <span className="field-error">{errors.pickupTime}</span>
        )}
      </div>

      <button
        type="submit"
        className="submit-button"
        disabled={disabled || !isValid}
      >
        Place Order
      </button>

    </form>
  )
}
