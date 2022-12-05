import { useState } from "react"
import { CacheView } from "../../components/CacheView"
import { MapView } from "../../components/MapView"

type MapState = {
    selected_cache_id: string | null,
    reupdate_trigger: boolean,
}

function Map(): JSX.Element {

    const [state, setState] = useState<MapState>(
        {
            selected_cache_id: null,
            reupdate_trigger: false,
        }
    );

    const onCacheSelected = (id: string) => {
        setState({
            ...state,
            selected_cache_id: id,
        })
    }

    const onCacheDeleted = () => {
        setState({
            ...state,
            selected_cache_id: null,
            reupdate_trigger: !state.reupdate_trigger,
        })

    }


    return (
        <div className="d-flex flex-column container-fluid h-100">
            <div className="row">
                <h1 className="text-center">Карта всех тайников</h1>
            </div>
            <div className="row flex-fill">
                <div className="col-xl-8">
                    <MapView reupdate_trigger={state.reupdate_trigger} cacheSelected={onCacheSelected}></MapView>
                </div>
                <div className="col">
                    <CacheView selected_id={state.selected_cache_id} onCacheDeleted={onCacheDeleted}></CacheView>
                </div>
            </div>
        </div>


    )
}

export default Map