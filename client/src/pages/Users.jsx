import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Users = () => {
    const navigate=useNavigate();
    const { currentUser } = useSelector((state) => state.user);
    const [userData, setUserData] = useState([]);

    const handleId = async (id,username) => {
        navigate(`/admin/user`, { state: { id: id,username: username} });
    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/admin/delete/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if(response.ok){
                getUsers();
            }
        } catch (error) {
            console.error('Delete request failed:', error);
        }
    };


    const getUsers = async () => {
        try {
            const response = await fetch("/api/admin/user");
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUsers();
    }, [handleDelete]);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-slate-700">Users</h1>
            </div>

            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-3 px-6 text-left">UserName</th>
                        <th className="py-3 px-6 text-left">Email</th>
                        <th className="py-3 px-6 text-left">View</th>
                        <th className="py-3 px-6 text-left">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((item, index) => (
                        <tr key={index} className="border-b border-gray-200">
                            <td className="py-3 px-6">{item.username}</td>
                            <td className="py-3 px-6">{item.email}</td>
                            <td className="py-3 px-6 cursor-default" onClick={() => handleId(item._id,item.username)}>
                                <span className="text-white bg-green-500 px-2 py-1 rounded-full">
                                    Listing
                                </span>
                            </td>
                            <td className="py-3 px-6 cursor-default" onClick={() => handleDelete(item._id)}>
                                <span className="text-white bg-red-500 px-2 py-1 rounded-full">
                                    Delete
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
