"use client"

import Column from "@/components/dashboard/Column";
import { client } from "@/config/clients";
import { configuration } from "@/config/configuration";


export default function Dashboard () {
    return (
        <div>
            <h1>{client}</h1>
            <hr />
            {configuration[client].columns.map((col) => (
                <Column
                    key={col.heading}
                    heading={col.heading}
                    size={col.size}
                    widgets={col.widgets}
                />
            ))}
        </div>
    )
}