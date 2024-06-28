import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
export function useLoadingWithRefresh() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(
                    `http://localhost:5002/api/refresh`,
                    {
                        withCredentials: true,
                    }
                );
                console.log(data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        })();
    }, []);

    return { loading };
}

export default useLoadingWithRefresh;
