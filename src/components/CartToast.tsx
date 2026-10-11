interface CartToastProps {
  message: string | null
}

export default function CartToast({ message }: CartToastProps) {
  if (!message) {
    return null
  }

  return <div className="cart-toast">{message}</div>
}
