import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const ListWidget = ({ title, subtitle, api }) => {
    const [data, setData] = useState();

    const fetchApi = useCallback(async () => {
        try {
            const res = await axios.get(api);
            setData(res.data.results.map(({ name }) => name)); // putting this here for simplicity, but if we'll have different clients, we can put the parser elsewhere
        } catch (err) {
            console.log('Suppressed error', err);
            setData('Did not load properly...');
        }
    }, [api]);

    useEffect(() => {
        fetchApi();
    }, [fetchApi]);

    return (
        <div className="widget" data-testid="widget">
            <h3>{title}</h3>
            {subtitle && (
                <h5>{subtitle}</h5>
            )}
            {data && Array.isArray(data) && (
                <ul>
                    {data.map((name) => (
                        <li key={name}>{name}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default ListWidget;
