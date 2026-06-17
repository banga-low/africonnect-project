import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { supabase } from '../supabase/supabaseClient';

export default function EscrowPayment({ amount, buyerEmail, sellerEmail, txId }) {
  const config = {
    public_key: 'FLWPUBK_TEST-48162696f2dd43dc6363a2ce4d50e746-X',
 // Replace with your test key from Flutterwave dashboard
    tx_ref: txId || Date.now().toString(),
    amount: amount,
    currency: 'ZAR',
    payment_options: 'card,mobilemoney,ussd',
    customer: { email: buyerEmail },
    customizations: {
      title: 'MasikanaM Escrow',
      description: 'Payment held until delivery confirmation',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const payNow = () => {
    handleFlutterPayment({
      callback: async (response) => {
        const { error } = await supabase.from('escrow_payments').insert({
          buyer_email: buyerEmail,
          seller_email: sellerEmail,
          amount: amount,
          status: 'held',
          flutterwave_tx_id: response.transaction_id,
          tx_ref: response.tx_ref
        });
        
        if (!error) alert('Payment held in escrow ✅');
        else alert('Error: ' + error.message);
        closePaymentModal();
      },
      onClose: () => {},
    });
  };

  return (
    <button 
      onClick={payNow}
      style={{padding:'10px 20px', background:'#0d9488', color:'white', border:'none', borderRadius:'8px', cursor:'pointer'}}
    >
      Pay R{amount} via Escrow
    </button>
  );
}
