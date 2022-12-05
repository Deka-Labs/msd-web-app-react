import { useState } from "react"
import { CacheView } from "../../components/CacheView"
import { MapView } from "../../components/MapView"

type MyMapState = {
    selected_cache_id: string | null,
    user_id: number,
}

function MyMap(): JSX.Element {

    const [state, setState] = useState<MyMapState>(
        {
            selected_cache_id: null,
            user_id: parseInt(localStorage.getItem("user_id") || "0")
        }
    );

    const onCacheSelected = (id: string) => {
        setState({
            ...state,
            selected_cache_id: id,
        })
    }

    if (!localStorage.getItem("user_id")) {
        return (
            <div className="d-flex flex-column container-fluid h-100">
                <div className="row">
                    <h1 className="text-center">Карта всех тайников</h1>
                </div>
                <div className="row flex-fill">
                    <h2>Для доступа к странице необходимо войти</h2>
                </div>
            </div>
        )
    }



    return (
        <div className="d-flex flex-column container-fluid h-100">
            <div className="row">
                <h1 className="text-center">Карта всех тайников</h1>
            </div>
            <div className="row flex-fill">
                <div className="col-xl-8">
                    <MapView cacheSelected={onCacheSelected} user_id={state.user_id}></MapView>
                </div>
                <div className="col">
                    <CacheView unlocked selected_id={state.selected_cache_id}></CacheView>
                </div>
            </div>
        </div>


    )
}

export default MyMap