interface MemberCardProps {
  id: number
  name: string
  email: string
  phone: string
  status: string
}

export default function MemberCard({ id, name, email, phone, status }: MemberCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
      <p className="text-gray-600 mb-2">{email}</p>
      <p className="text-sm text-gray-500 mb-4">{phone}</p>
      
      <div className="flex justify-between items-center">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {status}
        </span>
        
        <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
          Edit Member
        </button>
      </div>
    </div>
  )
} 