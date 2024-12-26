import { Box, Button, LinearProgress, styled, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { uploadFile } from '../appwrite-config';
import { toast } from 'react-toastify';
import CopyURL from './CopyURL';
import QRCodeRender from './QRCodeRender';

const BACKEND_API = import.meta.env.VITE_BACKEND_API;

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


const UploadFile = () => {

    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("pending");
    const [url, setUrl] = useState("");
    const [metaData, setMetaData] = useState({});


    useEffect(() => {
        // toast("Wow so easy!")
        fetch(BACKEND_API)
            .then((response) => response.json())
            .then((files) => {
                console.log("Files", files)
            })
    }, []);


    const onProgressCallback = (progress) => {
        setProgress(progress);
        console.log('Uploading progress ' + progress + '...');
    }

    const handalFileUplaod = (event) => {
        console.log(event.target.files)
        const file = event?.target?.files[0]
        if (file) {
            console.log({ name: file.name, size: file.size, type: file.type })

            setStatus("uploading")
            uploadFile(file, onProgressCallback).then(({ uploadResponse, signedUrl }) => {
                console.log(signedUrl)
                console.log(metaData)
                fetch(BACKEND_API, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: file.name, size: file.size, type: file.type, path: signedUrl }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        const url = `${window.location.origin}/${data.id}`;
                        setUrl(url)
                        console.log(data)
                        setStatus("completed")
                        toast("File uploaded successfully")
                    }).catch((error) => {
                        toast.error("Error")
                        setStatus("pending")
                    });
            })
                .catch((error) => {
                    toast.error("Error")
                    setStatus("pending")
                });
        }
    }

    if (status === 'pending') {
        return (
            <div className='flex flex-col items-center'>
                <h1 className='text-center font-bold text-3xl my-4'>Upload File</h1>
                <form action="" className='w-full mx-2 sm:w-1/2 md:w-1/3 lg:w-1/4'>
                    {/* <TextField id="outlined-basic" label="Name" variant="outlined" className='w-full' /> */}

                    <div className="w-full flex justify-center my-4">
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload files
                            <VisuallyHiddenInput
                                type="file"
                                onChange={handalFileUplaod}
                                multiple
                            />
                        </Button>
                    </div>
                </form>
            </div>
        )
    }

    else if (status === 'uploading') {
        return (
            <div className='flex flex-col items-center'>
                <h1 className='text-center font-bold text-3xl my-4'>Uploading </h1>
                <div className='w-full mx-2 sm:w-1/2 md:w-1/3 lg:w-1/4'>
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>

                </div>
            </div>
        )
    }

    if (status === 'completed') {
        return (
            <div className='flex flex-col items-center'>
                <h1 className='text-center font-bold text-3xl my-4'>Completed </h1>
                <div className='w-full mx-2 sm:w-1/2 md:w-1/3 lg:w-1/4'>

                    <QRCodeRender url={url} />
                    <CopyURL url={url} />

                </div>
            </div>
        )
    }


    // return (
    //     <div className='flex flex-col items-center'>
    //         <h1 className='text-center font-bold text-3xl my-4'>Upload File</h1>

    //         <form action="" className='w-full mx-2 sm:w-1/2 md:w-1/3 lg:w-1/4'>
    //             {/* <TextField id="outlined-basic" label="Name" variant="outlined" className='w-full' /> */}

    //             <div className="w-full flex justify-center my-4">
    //                 <Button
    //                     component="label"
    //                     role={undefined}
    //                     variant="contained"
    //                     tabIndex={-1}
    //                     startIcon={<CloudUploadIcon />}
    //                 >
    //                     Upload files
    //                     <VisuallyHiddenInput
    //                         type="file"
    //                         onChange={handalFileUplaod}
    //                         multiple
    //                     />
    //                 </Button>
    //             </div>

    //             {
    //                 uploading ? (<Box sx={{ width: '100%' }}>
    //                     <LinearProgress />
    //                 </Box>) :
    //                     (<p className='font-medium text-2xl'>{metaData?.filename}</p>)
    //             }

    //         </form>
    //     </div>
    // )
}

export default UploadFile
