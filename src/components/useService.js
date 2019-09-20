import {useEffect, useState} from "react";
import getChatLog from './../service'

function useService() {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState({});
    const [cancelRequest, setCancelRequest] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await getChatLog();
            if (!cancelRequest) {
                setData(res);
                setLoading(false);
            }
        } catch (e) {
            if (!cancelRequest) {
                setError(e);
                setLoading(false);
            }
        }

    };

    useEffect(() => {
        fetchData();
        return () => {
            setCancelRequest(true);
        };
    }, []);


    return {
        data, error, loading, cancelRequest
    }
}

export default useService;
