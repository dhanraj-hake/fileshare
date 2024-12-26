import React from 'react'
import QRCode from "react-qr-code";

const QRCodeRender = ({ url }) => {
    return (
        <div className='my-4 flex justify-center'>
            <QRCode
                size={250}
                style={{ height: "auto", width: "300px" }}
                value={url}
                viewBox={`0 0 100 100`}
            />
        </div>
    )
}

export default QRCodeRender
