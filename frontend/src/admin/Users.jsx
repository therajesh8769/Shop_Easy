import { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get("https://shop-easyb.vercel.app/api/users", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => setUsers(res.data))
            .catch((err) => console.error("User fetch failed", err));
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Users</h1>
            <table className="min-w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Mobile</th>
                        <th className="p-2 border">Date</th>
                        <th className="p-2 border">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u._id}>
                            <td className="p-2 border">{u.name}</td>
                            <td className="p-2 border">{u.email}</td>
                            <td className="p-2 border">{u.mobile}</td>
                            <td className="p-2 border">
                                {new Date(u.createdAt).toLocaleString('en-IN', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true,
                                })}
                            </td>
                            <td className="p-2 border">{u.isAdmin ? "Admin" : "User"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
