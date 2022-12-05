import { AxiosError, isAxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import { CacheCreateInfo, cache_service_insert_cache } from "../../api/cache_service"
import { EditCache, EditCacheState } from "../../components/EditCache"
import { MapSelectPoint } from "../../components/MapSelectPoint"



function Add(): JSX.Element {
    const navigate = useNavigate();


    function onSubmit(cache: EditCacheState) {
        if (!cache.position)
            return

        let create_info: CacheCreateInfo = {
            description: cache.description,
            position: cache.position,
            hint: cache.hint
        }

        cache_service_insert_cache(create_info).then(
            (response) => {
                alert("Добавлено")
                navigate("/cache/my")
            }
        ).catch(
            (reason: Error | AxiosError) => {
                if (isAxiosError(reason)) {
                    if (reason.response?.status === 401) {
                        alert("Необходимо войти на сайт перед добавлением")
                    } else {
                        alert("Внутреняя ошибка, попробуйте позже")
                        console.log("Status code:", reason.response?.status);
                        console.log("Body:", reason.toJSON());
                    }

                } else {
                    alert(reason)
                }

            }
        )

    }

    return (
        <EditCache dataSubmitted={onSubmit}></EditCache>
    )
}

export default Add