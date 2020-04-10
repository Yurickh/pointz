import React from 'react'

type SubmitButtonProps = {
  label: string
  onClick: (event: React.MouseEvent) => void
  disabled?: boolean
}

export const SubmitButton: React.FunctionComponent<SubmitButtonProps> = ({
  label,
  onClick,
  disabled,
}) => (
  <div className="control">
    <button className="button is-primary" onClick={onClick} disabled={disabled}>
      {label}
    </button>
  </div>
)
