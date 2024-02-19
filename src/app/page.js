"use client"

import Image from "next/image";
import Column from "@/components/dashboard/Column";
import { clientLogo, clients } from "@/config/clients";
import { configuration } from "@/config/configuration";

// Didn't bother to create routing since this is only 1 page
export default function Dashboard() {
    const client = 'pokemon';

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center'}}>
                <Image
                    src={clientLogo[client]}
                    alt="client logo"
                    width={24}
                    height={24}
                    style={{
                        marginRight: 10,
                    }}
                />
                <h2>{clients[client]}</h2>
            </div>
            <hr />
            <div style={{ display: 'flex' }}>
                {configuration[client].columns.map((col) => (
                    <Column
                        key={col.heading}
                        heading={col.heading}
                        size={col.size}
                        widgets={col.widgets}
                    />
                ))}
            </div>
        </div>
    )
}