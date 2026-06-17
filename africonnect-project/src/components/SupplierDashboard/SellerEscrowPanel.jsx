import { useEffect, useState } from 'react'
import { supabase } from '../../supabase/supabaseClient'
import { ShieldCheck, PackageCheck } from 'lucide-react'

export default function SupplierDashboard({ sellerEmail }) {
  const [escrows, setEscrows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHeldPayments()
  }, [sellerEmail])

  async function fetchHeldPayments() {
    const { data, error } = await supabase
     .from('escrow_payments')
     .select('*')
     .eq('seller_email', sellerEmail)
     .eq('status', 'held')

    if (error) console.error(error)
    else setEscrows(data)
    setLoading(false)
  }

  async function releaseFunds(paymentId) {
    const { error } = await supabase
     .from('escrow_payments')
     .update({ status: 'released', released_at: new Date() })
     .eq('id', paymentId)

    if (error) alert('Release failed')
    else {
      alert('Funds released to you ✅')
      fetchHeldPayments() // refresh list
    }
  }

  if (loading) return <p>Loading escrow payments...</p>

  return (
    <div className="supplier-dashboard">
      <h2>Escrow Payments Awaiting Release</h2>
      {escrows.length === 0? (
        <p>No payments held in escrow</p>
      ) : (
        escrows.map(payment => (
          <div key={payment.id} className="escrow-card">
            <ShieldCheck />
            <p>Buyer: {payment.buyer_email}</p>
            <p>Amount: ${payment.amount}</p>
            <p>Status: Escrow Active</p>
            <button onClick={() => releaseFunds(payment.id)}>
              <PackageCheck /> Release Funds
            </button>
          </div>
        ))
      )}
    </div>
  )
}
