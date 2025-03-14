import React, { useState, useEffect } from "react";

const pharmaciesData = [
    { id: 1, name: "City Pharmacy", location: "Downtown" },
    { id: 2, name: "Green Health Pharmacy", location: "Uptown" },
    { id: 3, name: "Wellness Pharmacy", location: "Suburb" },
    { id: 4, name: "CarePlus Pharmacy", location: "Midtown" },
];

export default function PharmacySearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPharmacies, setFilteredPharmacies] = useState(pharmaciesData);

    useEffect(() => {
        const results = pharmaciesData.filter((pharmacy) =>
            pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPharmacies(results);
    }, [searchTerm]);

    return (
        <div className="max-w-lg mx-auto p-4">
            <div className="relative flex items-center mb-4 border border-gray-300 rounded-lg shadow-sm">
                <span className="absolute left-3 text-gray-500">🔍</span>
                <input
                    type="text"
                    placeholder="Search for a pharmacy..."
                    className="pl-10 w-full border-none rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="space-y-2">
                {filteredPharmacies.map((pharmacy) => (
                    <div key={pharmacy.id} className="p-3 border rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold">{pharmacy.name}</h2>
                        <p className="text-gray-600">{pharmacy.location}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}