import { CheckCircle, XCircle } from 'lucide-react'

function Toast({ message, type = 'success' }) {
  const isSuccess = type === 'success'
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium transition-all
      ${isSuccess ? 'bg-green-500' : 'bg-red-500'}`}>
      {isSuccess
        ? <CheckCircle className="h-5 w-5 shrink-0" />
        : <XCircle className="h-5 w-5 shrink-0" />}
      {message}
    </div>
  )
}

export default Toast
