import React from 'react'

type TextInputProps = {
  onChange: (newValue: string) => void
  value: string
  placeholder?: string
  id: string
  label: string
  help?: string
  error?: string
}

export const TextInput: React.FunctionComponent<TextInputProps> = ({
  onChange,
  value,
  placeholder,
  id,
  label,
  help,
  error,
}) => (
  <div className="control is-expanded is-family-primary">
    <label className="label" htmlFor={id}>
      {label}
    </label>
    <input
      className={`input ${error ? 'is-danger' : ''}`}
      type="text"
      id={id}
      name={id}
      placeholder={placeholder}
      value={value || ''}
      onChange={(event) => onChange(event.currentTarget.value)}
    />
    {error && <p className="help is-danger is-family-secondary">{error}</p>}
    <p className="help is-family-secondary">{help}</p>
  </div>
)
