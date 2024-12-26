import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import UploadFile from "./components/UploadFile";
import DownloadFile from "./components/DownloadFile";


export const router = createBrowserRouter([
    {
        path : '/',
        element : <Home />,
        children : [
            {
                path : '',
                element : <UploadFile />
            },
            {
                path : '/:id',
                element : <DownloadFile />
            }
        ]
    }
]);