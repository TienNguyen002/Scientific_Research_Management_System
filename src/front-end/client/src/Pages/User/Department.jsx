import React, {useEffect} from "react";

const Department = () => {
    useEffect(() => {
        document.title = "Danh sách các Khoa"
    }, [])

    return(
        <>
            <h1>Dy la Khoa</h1>
        </>
    )
}

export default Department;