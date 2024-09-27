import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function PaymentSuccess() {
  const { state } = useLocation();
  const { formData } = state || {};  
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const createListing = async () => {
      if (!formData) {
        return navigate('/'); 
      }
      console.log(formData);
      
      try {
        setLoading(true);
        const res = await fetch('/api/listing/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            userRef: currentUser._id,
            startDate: new Date().toISOString() 
          }),
        });
        const data = await res.json();
        setLoading(false);
        if (data.success === false) {
          setError(data.message);
        } else {
          // navigate(`/listing/${data._id}`);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    createListing();
  }, [formData, navigate, currentUser]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p className='text-red-700'>{error}</p>}
      {!loading && !error && <p>Payment Successful! Your listing is being created...</p>}
    </div>
  );
}
