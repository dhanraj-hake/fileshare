import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import { Link, useParams } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import { toast } from 'react-toastify';
import { saveAs } from 'file-saver';

const BACKEND_API = import.meta.env.VITE_BACKEND_API;

const DownloadFile = () => {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [isDownload, setIsDownload] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  const { id } = useParams()

  useEffect(() => {
    setLoading(true);
    fetch(`${BACKEND_API}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Error fetching file");
      });
  }, [])


  const handalDownload = () => {
    setDownloadLoading(true);
    fetch(data.path)
      .then((res) => res.blob())
      .then((blob) => {
        setDownloadLoading(false);
        setIsDownload(true);
        saveAs(blob, data.name)
      });

  }


  if (loading) {
    return (
      <>

        <div className="flex items-center justify-center bg-gray-100 p-2 rounded-lg shadow-md max-w-md mx-auto mt-6">
          <Skeleton variant="rounded" width="100%" height={50} />
        </div>

        <div className="flex items-center justify-between bg-gray-100 p-2 rounded-lg shadow-md max-w-md mx-auto mt-6 px-4">
          <Link to="/">
            <Button
              variant="contained"
              color="primary"

              className="!bg-blue-500 hover:!bg-blue-600 text-white"
            >
              Home
            </Button>
          </Link>
          <Link to="/">
            <Button
              variant="contained"
              color="primary"
              className="!bg-blue-500 hover:!bg-blue-600 text-white"
            >
              Upload New
            </Button>
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md max-w-md mx-auto mt-6">
        {data ? (
          <>
            <span className="text-gray-800 text-lg font-medium truncate">{data.name}</span>
            <Button
              disabled={downloadLoading}
              variant="contained"
              color="primary"
              startIcon={<DownloadIcon />}
              onClick={handalDownload}
              className="!bg-blue-500 hover:!bg-blue-600 text-white"
            >
              {isDownload ? 'Download Again' : 'Download'}
            </Button></>
        ) : 'File not Found'}
      </div>
      <div className="flex items-center justify-between bg-gray-100 p-2 rounded-lg shadow-md max-w-md mx-auto mt-6 px-4">
        <Link to="/">
          <Button
            variant="contained"
            color="primary"

            className="!bg-blue-500 hover:!bg-blue-600 text-white"
          >
            Home
          </Button>
        </Link>
        <Link to="/">
          <Button
            variant="contained"
            color="primary"

            className="!bg-blue-500 hover:!bg-blue-600 text-white"
          >
            Upload New
          </Button>
        </Link>
      </div>
    </>
  );
};

export default DownloadFile;