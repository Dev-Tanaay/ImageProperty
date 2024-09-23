import { useEffect, useState } from "react";

const Payment = ({setTotalAmount}) => {
    const [paymentData, setpaymentData] = useState([]);
    const [totalAmount,settotalAmount]=useState(0);

    const getPayment = async () => {
        try {
            const response = await fetch("/api/admin/pay");
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            settotalAmount(data.totalAmount);
            setpaymentData(data.pay);
            setTotalAmount(data.totalAmount);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPayment();
    }, []);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-slate-700">Payments</h1>
            </div>

            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-3 px-6 text-left">Payment_ID</th>
                        <th className="py-3 px-6 text-left">Username</th>
                        <th className="py-3 px-6 text-left">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {paymentData.map((item, index) => (
                        <tr key={index} className="border-b border-gray-200">
                            <td className="py-3 px-6">{item.payment_id}</td>
                            <td className="py-3 px-6">{item.username}</td>
                            <td className="py-3 px-6">{item.amount}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="2" className="py-3 px-6 font-bold text-right">Total</td>
                        <td className="py-3 px-6 font-bold">{parseFloat((totalAmount).toFixed(2))}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default Payment;
