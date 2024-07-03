import Uploader from "@/components/Uploader";
import UploadThumbnail from "@/components/UploadThumbnail";
import { faImage, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UploadResponse } from "imagekit/dist/libs/interfaces";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  files: UploadResponse[];
  setFiles: Dispatch<SetStateAction<UploadResponse[]>>;
};

export default function UploadArea({ files, setFiles }: Props) {
  const [isUploading, setIsUploading] = useState(false);
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-center text-sm text-gray-400 uppercase font-bold">
        Add photos of your product
      </h2>
      <div className="flex flex-col items-center">
        <FontAwesomeIcon icon={faImage} className="h-24 text-gray-500 mb-4"/>
        <label
          className={
            'upload-btn mt-2 border px-6 py-2 rounded-lg inline-flex gap-2 items-center justify-center transition ' +
            (isUploading
              ? 'text-gray-500 border-gray-500 cursor-not-allowed'
              : 'border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white cursor-pointer')
          }
        >
          <Uploader
            onUploadStart={() => setIsUploading(true)}
            onSuccess={file => {
              setFiles(prev => [...prev, file]);
              setIsUploading(false);
            }}
          />
          {isUploading ? (
            <span>Uploading...</span>
          ) : (
            <>
              <FontAwesomeIcon icon={faPlus} />
              <span>Add photos</span>
            </>
          )}
        </label>
        <div className="flex gap-4 mt-4 flex-wrap">
          {files.map(file => (
            <div key={file.fileId} className="w-16 h-16 rounded overflow-hidden border border-gray-600 shadow-lg">
              <UploadThumbnail file={file} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
