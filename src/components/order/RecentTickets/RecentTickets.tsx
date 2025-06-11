export default function RecentTickets() {
  return (
    <div className="bg-white p-4 rounded-md border">
      <h3 className="text-lg font-medium mb-4">Recent Tickets</h3>
      <div className="space-y-4">
        {[
          { from: 'London', to: 'Manchester', price: '£45' },
          { from: 'London', to: 'Edinburgh', price: '£85' },
          { from: 'Manchester', to: 'Glasgow', price: '£65' },
        ].map((ticket, index) => (
          <div key={index} className="border-b pb-3 last:border-0">
            <div className="flex justify-between">
              <div>
                <p className="font-medium">{ticket.from}</p>
                <p className="text-sm text-gray-500">Euston Station</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{ticket.to}</p>
                <p className="text-sm text-gray-500">Central Station</p>
              </div>
            </div>
            <div className="flex justify-end mt-2">
              <p className="text-orange-500 font-bold">{ticket.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}