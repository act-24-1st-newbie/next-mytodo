"use client";

export default function TaskCheckbox({ defaultChecked }) {
  /** @param {React.ChangeEvent<HTMLInputElement>} e */
  function handleChange(e) {
    e.currentTarget.form?.requestSubmit();
  }

  return (
    <input type="checkbox" defaultChecked={defaultChecked} onChange={handleChange} name="is-done" />
  );
}
