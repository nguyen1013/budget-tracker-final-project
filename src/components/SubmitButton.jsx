import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending}>
    {pending ? "Adding..." : "Add Transaction"}
    </button>
  )
}
export default SubmitButton