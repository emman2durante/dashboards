import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const ListWidget = ({ title, subtitle, api }) => {
    const [response, setResponse] = useState();

    const fetchApi = useCallback(async () => {
        try {
            const res = await axios.get(api);
            setResponse(res.data);
        } catch (err) {
            console.log('Suppressed error', err);
        }
    }, [api]);

    useEffect(() => {
        fetchApi();
    }, [fetchApi]);

    return (
        <div>
            <h3>{title}</h3>
            <h6>{subtitle}</h6>
            {response && (
                <div>{JSON.stringify(response)}</div>
            )}
        </div>
    )
}

export default ListWidget;
