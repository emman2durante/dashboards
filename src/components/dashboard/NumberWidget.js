import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const NumberWidget = ({ title, subtitle, api }) => {
    const [data, setData] = useState();

    const fetchApi = useCallback(async () => {
        try {
            const res = await axios.get(api);
            setData(res.data.pokemon_species_details.length); // putting this here for simplicity, but if we'll have different clients, we can put the parser elsewhere
        } catch (err) {
            console.log('Suppressed error', err);
            setData('Did not load properly...');
        }
    }, [api]);

    useEffect(() => {
        fetchApi();
    }, [fetchApi]);

    return (
        <div className="widget">
            <h3>{title}</h3>
            {subtitle && (
                <h5>{subtitle}</h5>
            )}
            {data && (
                <div>{data}</div>
            )}
        </div>
    )
}

export default NumberWidget;
