import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const User = () => {
    const location = useLocation();
    const { id,username } = location.state || {};
    const [userData, setUserData] = useState([]);
    const [total, setTotal] = useState(0);

    const getListing = async (id) => {
        try {
            const response = await fetch(`/api/admin/list/${id}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            setUserData(data.listings);
            setTotal(data.totalListings);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (id) {
            getListing(id);
        }
    }, [id]);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-slate-700">{username}<span className="ml-10 text-slate-600">{total} Listings</span></h1>
            </div>

            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-3 px-6 text-left">Name</th>
                        <th className="py-3 px-6 text-left">Description</th>
                        <th className="py-3 px-6 text-left">Address</th>
                        <th className="py-3 px-6 text-left">Regular Price</th>
                        <th className="py-3 px-6 text-left">Discounted Price</th>
                        <th className="py-3 px-6 text-left">Type</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((item, index) => (
                        <tr key={index} className="border-b border-gray-200">
                            <td className="py-3 px-6 max-w-xs break-words">{item.name}</td>
                            <td className="py-3 px-6 max-w-xs break-words">{item.description}</td>
                            <td className="py-3 px-6 max-w-xs break-words">{item.address}</td>
                            <td className="py-3 px-6 max-w-xs break-words">{item.regularPrice}</td>
                            <td className="py-3 px-6 max-w-xs break-words">{item.discountPrice}</td>
                            <td className="py-3 px-6">{item.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default User;
