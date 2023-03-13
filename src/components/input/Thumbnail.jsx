import React from 'react';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';

export default function Thumbnail({ setImgFile, viewImage, setViewImage }) {
  const handleImgChange = async (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImgFile(file);
      reader.onload = () => {
        setViewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImgFile(null);
      setViewImage(null);
    }
  };
  return (
    <div className="flex flex-wrap mb-2">
      <label
        htmlFor="file-input"
        className="border border-white/[0.1] bg-[#0B0B0B] h-16 w-26 lg:h-20 lg:w-36 m-4 ml-0 rounded-md cursor-pointer"
      >
        {viewImage ? (
          <img src={viewImage} alt="" className="h-full w-full rounded-md" />
        ) : (
          <MdOutlineAddPhotoAlternate className="text-white/[0.4] h-full w-full p-5" />
        )}
      </label>
      <input
        id="file-input"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImgChange}
      />

      {/* <button
        type="button"
        className=" border border-white/[0.1] bg-[#0B0B0B] h-16 w-26 lg:h-20 lg:w-36 m-4 ml-0 rounded-md"
      >
        <MdOutlineAddPhotoAlternate className="text-white/[0.4] h-full w-full p-5" />
      </button>
      {thumbnail1 && (
            <img
              src=""
              alt=""
              className="object-cover h-16 w-26 lg:h-20 lg:w-36 m-4 ml-0 rounded-md"
            />
          )}
          <img
            src=""
            alt=""
            className="object-cover h-16 w-26 lg:h-20 lg:w-36 m-4 ml-0 rounded-md"
          /> */}
    </div>
  );
}
