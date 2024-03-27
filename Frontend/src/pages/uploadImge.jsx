import React from 'react'

function UploadImge() {
    return (
        <form action="http://localhost:8000/api/update/profilePic" method='POST' enctype="multipart/form-data">
            <input type="file" name="profileImage" />
            <button type='submit'>Upload</button>
        </form>
    )
}

export default UploadImge
