import { useNavigate, useParams } from "react-router-dom"
import { Cache, cache_service_update_cache, ObjectID } from "../../api/cache_service"
import { EditCache, EditCacheState } from "../../components/EditCache"
import { AxiosError, isAxiosError } from "axios"


function Edit(): JSX.Element {
    let { id } = useParams()
    const navigate = useNavigate()

    if (!id) {
        return <></>
    }



    function editCache(cache_data: EditCacheState) {
        if (!cache_data.position || !id) {
            return
        }

        let oid: ObjectID = {
            $oid: id,
        }

        let cache: Cache = {
            _id: oid,
            position: cache_data.position,
            description: cache_data.description,
            hint: cache_data.hint,
            owner_id: 0 // Owner id is set by server
        }


        cache_service_update_cache(cache).then(
            (response) => {
                alert("Изменено")
                navigate("/cache/my")
            }
        ).catch(
            (reason: Error | AxiosError) => {
                if (isAxiosError(reason)) {
                    if (reason.response?.status === 401) {
                        alert("Необходимо войти на сайт перед изменением")
                        // Remove login info it is not valid
                        localStorage.clear()
                    } else {
                        alert("Внутреняя ошибка, попробуйте позже")
                        console.log("Status code:", reason.response?.status);
                        console.log("Body:", reason.toJSON());
                    }

                } else {
                    alert(reason)
                }

                navigate("/")
            }
        )
        console.log(cache)
    }

    return (
        <EditCache cache_id={id} dataSubmitted={editCache} ></EditCache>
    )
}

export default Edit