import { useState, useEffect } from 'react';
import { BsUpload } from 'react-icons/bs';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import UploadVideo from '../components/video/UploadVideo';
import { useStateContext } from '../context';

export default function UploadButton() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      const handleBeforeUnload = (event) => {
        event.preventDefault();
        event.returnValue = '';
      };
      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [selectedFile]);

  return (
    <>
      {selectedFile ? (
        <ThirdwebProvider>
          <UploadVideo
            name={selectedFile.name}
            videoFile={selectedFile}
            setVideoFile={setSelectedFile}
          />
        </ThirdwebProvider>
      ) : (
        <div className="flex flex-col items-center justify-center h-full max-h-[600px] px-4">
          <span className="text-4xl font-medium mb-8">Upload Videos</span>
          <button className="h-28 w-28 mb-8 p-6  bg-white/[0.07] rounded-3xl">
            <BsUpload className="h-full w-full " />
          </button>
          <span className="text-lg mb-3">
            Select a video file you want to upload
          </span>
          <span className="text-sm text-white/[0.5] mb-6 text-center">
            Your video will be uploaded to IPFS, where anyone can watch it from
            anywhere.{' '}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://docs.ipfs.tech/concepts/what-is-ipfs/"
              className="text-[#9891ff]"
            >
              Know more
            </a>
          </span>

          <label
            htmlFor="file-input"
            className="bg-[#6F6BF2] px-5 py-2 rounded-xl cursor-pointer"
          >
            Browse
          </label>
          <input
            id="file-input"
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleFileInputChange}
          />
        </div>
      )}
    </>
  );
}
