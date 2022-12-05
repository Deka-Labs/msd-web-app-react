import { useParams } from "react-router-dom"
import { EditCache, EditCacheState } from "../../components/EditCache"


function Edit(): JSX.Element {
    let { id } = useParams()

    function editCache(cache: EditCacheState) {
        console.log(cache)
    }

    return (
        <EditCache cache_id={id} dataSubmitted={editCache} ></EditCache>
    )
}

export default Edit