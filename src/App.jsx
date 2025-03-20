import './App.css';
import React, { useState, useEffect, useMemo } from 'react';

const Card = React.memo(({ name, image, position, biography }) => {
    // console.log('card');
    return (
        <>
            <img src={image} alt={`cool ${name} image`} />
            <div>
                <strong>{name}</strong>
                <span> ({position})</span>
                <p>{biography}</p>
            </div>
        </>
    );
});

function App() {
    const [politicians, setPoliticians] = useState([]);
    const [search, setSearch] = useState('');

    async function fetchData() {
        const res = await fetch(
            'https://boolean-spec-frontend.vercel.app/freetestapi/politicians'
        );
        const data = await res.json();

        setPoliticians(data);
    }

    const filteredPoliticians = useMemo(() => {
        return politicians.filter((p) => {
            return (
                p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.biography.toLowerCase().includes(search.toLowerCase())
            );
        });
    }, [search, politicians]);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <h1>My Politicians</h1>
            <input
                type="text"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            />
            <ul>
                {filteredPoliticians.map((p, i) => {
                    return (
                        <li key={i}>
                            <Card {...p} />
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

export default App;
