import { Client, Storage, ID } from "appwrite";

// Initialize the Appwrite client
const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Appwrite API URL from environment variables
    .setProject(import.meta.env.VITE_PROJECTID); // Appwrite Project ID from environment variables

export const storage = new Storage(client);


const BUCKET_ID = import.meta.env.VITE_BUCKET_ID;

export const uploadFile = async (file, onProgressCallback) => {
    try {
        if (!file) throw new Error("No file provided for upload.");
        if (!BUCKET_ID) throw new Error("BUCKET_ID is not set in the environment variables.");

        // Generate a unique file ID
        const fileId = ID.unique();

        // Upload the file with progress tracking
        const uploadResponse = await storage.createFile(BUCKET_ID, fileId, file, [], (progress) => {
                console.log(progress)
                if (onProgressCallback && typeof onProgressCallback === 'function') {
                    const percentage = Math.round((progress.loaded / progress.total) * 100);
                    onProgressCallback(percentage);
                }
            },
        );

        console.log("File uploaded successfully:", uploadResponse);

        // Generate the signed URL
        const signedUrl = await getSignedUrl(fileId);

        return { uploadResponse, signedUrl };
    } catch (error) {
        console.error("File upload failed:", error.message);
        throw error;
    }
};



export const getSignedUrl = async (fileId) => {
    try {
        if (!fileId) throw new Error("File ID is required to generate a signed URL.");
        if (!BUCKET_ID) throw new Error("BUCKET_ID is not set in the environment variables.");

        const signedUrl = await storage.getFileDownload(BUCKET_ID, fileId);
        
        console.log("Generated signed URL:", signedUrl);
        return signedUrl;
    } catch (error) {
        console.error("Failed to generate signed URL:", error.message);
        throw error;
    }
};
