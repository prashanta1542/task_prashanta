import React, { useState, useEffect } from "react";
import Navbar from "./navbar";

export default function Dashboard() {
    const [queries, setQueries] = useState([]);
    const navbar=[
      {
        path:"/login",
        navitem: "Logout"
      }
       
    ]

    useEffect(() => {
        const fetchQueries = async () => {
            try {
                const response = await fetch("http://localhost:5000/queries");
                if (response.ok) {
                    const data = await response.json();
                    setQueries(data.queries);
                } else {
                    console.error("Failed to fetch queries");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchQueries();
    }, []);

    return (
        <>
            <Navbar props={navbar}/>
            <div class="md:px-32 py-8 w-full">
                <div class="shadow overflow-hidden rounded border-b border-gray-200">
                    <table class="min-w-full bg-white mt-12">
                        <thead class="bg-gray-800 text-white">
                            <tr>
                                <th class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                                <th class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Last name</th>
                                <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Phone</th>
                                <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
                            </tr>
                        </thead>
                        <tbody class="text-gray-700">
                            {queries.map((query, index) => (
                                <tr key={index} className={index % 2 === 0 ? "" : "bg-gray-100"}>
                                    <td class="w-1/3 text-left py-3 px-4">{query.name}</td>
                                    <td class="w-1/3 text-left py-3 px-4">{query.lastname}</td>
                                    <td class="text-left py-3 px-4">
                                        <a class="hover:text-blue-500" href={`tel:${query.phone}`}>{query.phone}</a>
                                    </td>
                                    <td class="text-left py-3 px-4">
                                        <a class="hover:text-blue-500" href={`mailto:${query.email}`}>{query.email}</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
