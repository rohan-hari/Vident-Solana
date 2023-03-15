import { useState, useEffect } from 'react';
import { useStorageUpload } from '@thirdweb-dev/react';
import { useStateContext } from '../../context';
import axios from 'axios';

import VideoCard from '../feed/VideoCard';
import FormField from '../input/FormField';
import Thumbnail from '../input/Thumbnail';

export default function UploadVideo({ name, videoFile, setVideoFile }) {
  const { router, user } = useStateContext();
  const [form, setForm] = useState({
    userId: 's',
    title: name,
    description: '',
    tags: '',
    thumbnail: '',
    videoUrl: '',
    visibility: 'public',
  });
  const handleFormFieldChange = (fieldName, e) => {
    if (fieldName === 'tags') {
      const tags = e.target.value.split(',');
      setForm({ ...form, [fieldName]: tags });
    } else {
      setForm({ ...form, [fieldName]: e.target.value });
    }
  };

  const [imgFile, setImgFile] = useState(null);
  const [viewImage, setViewImage] = useState(null);
  const [loadingText, setLoadingText] = useState('Publish');

  const handlePublish = async (event) => {
    event.preventDefault();

    setLoadingText('Uploading...');

    const imgUri = await uploadToIpfs(imgFile);
    const videoUri = await uploadToIpfs(videoFile);

    setLoadingText('Wait...');
    setForm({
      ...form,
      thumbnail: `https://gateway.ipfscdn.io/ipfs/${
        imgUri[0].split('ipfs://')[1]
      }`,
      videoUrl: `https://gateway.ipfscdn.io/ipfs/${
        videoUri[0].split('ipfs://')[1]
      }`,
    });
  };

  const { mutateAsync: upload } = useStorageUpload();
  const uploadToIpfs = async (file) => {
    const uri = await upload({
      data: [file],
      options: {
        uploadWithoutDirectory: true,
      },
    });
    return uri;
  };

  useEffect(() => {
    if (form.thumbnail && form.videoUrl) {
      dbSave(form);
    }
  }, [form.thumbnail, form.videoUrl]);

  const dbSave = async (form) => {
    try {
      await axios.post('/api/videos/upload', form);
      setLoadingText('Uploaded');
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (err) {
      setLoadingText('Error - Retry');
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex flex-row p-6 justify-center">
        <div className="md:flex w-full md:w-screen max-w-5xl">
          <div className="w-full mr-10 md:min-w-[400px] xl:min-w-[650px]">
            <form onSubmit={handlePublish} method="POST">
              <div className="text-3xl font-medium mb-5"> Details</div>
              <FormField
                labelName="Title"
                placeholder="Add a title that describes your video"
                inputType="text"
                isRequired
                value={form.title}
                handleChange={(e) => handleFormFieldChange('title', e)}
              />
              <FormField
                labelName="Description"
                placeholder="Tell viewers about your video"
                isTextArea
                value={form.description}
                handleChange={(e) => handleFormFieldChange('description', e)}
              />
              <Thumbnail
                setImgFile={setImgFile}
                viewImage={viewImage}
                setViewImage={setViewImage}
              />
              <FormField
                labelName="Tags"
                placeholder="Add tag (Enter a comma after each tag)"
                inputType="text"
                value={form.tags}
                handleChange={(e) => handleFormFieldChange('tags', e)}
              />
              <label className=" text-white/[0.8] tracking-wider">
                Visibility
              </label>
              <div className="mt-3 text-white/[0.5] p-2 w-full  border border-white/[0.1] bg-[#0B0B0B] rounded-xl">
                <div className="flex mb-2">
                  <input
                    checked={form.visibility === 'public'}
                    type="radio"
                    id="public"
                    name="visibility"
                    value="public"
                    className="hidden peer"
                    required
                    onChange={(e) => handleFormFieldChange('visibility', e)}
                  />
                  <label
                    htmlFor="public"
                    className="inline-flex items-center justify-between w-full px-4 py-3  rounded-lg cursor-pointer
                    peer-checked:text-[#9891ff] border border-transparent peer-checked:border-[#9891ff]  hover:bg-white/[0.05]"
                  >
                    <div className="block">
                      <div className="w-full ">Public</div>
                      <div className="w-full text-sm">
                        Everyone can watch your video
                      </div>
                    </div>
                  </label>
                </div>
                <div className="flex mb-2">
                  <input
                    checked={form.visibility === 'private'}
                    type="radio"
                    id="private"
                    name="visibility"
                    value="private"
                    className="hidden peer"
                    required
                    onChange={(e) => handleFormFieldChange('visibility', e)}
                  />
                  <label
                    htmlFor="private"
                    className="inline-flex items-center justify-between w-full px-4 py-3  rounded-lg cursor-pointer
                    peer-checked:text-[#9891ff] border border-transparent peer-checked:border-[#9891ff]  hover:bg-white/[0.05]"
                  >
                    <div className="block">
                      <div className="w-full ">Private</div>
                      <div className="w-full text-sm">
                        Only you can watch your video
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </form>
          </div>

          <div className="max-w-[340px]">
            <span className="hidden md:block text-xl font-medium px-3">
              Preview
            </span>
            <div className="hidden md:block mt-3 p-3">
              <VideoCard
                title={form.title}
                imageSrc={
                  viewImage
                    ? viewImage
                    : 'https://www.oyorooms.com/officialoyoblog/wp-content/themes/inframe/assets/images/no-thumbnail-medium.png'
                }
              />
            </div>
            <div className="flex flex-row justify-between mt-5 md:mt-0 md:px-3">
              {loadingText === 'Publish' && (
                <button
                  type="button"
                  className="w-full py-2 bg-[#0B0B0B] rounded-xl mr-3"
                  onClick={() => {
                    setVideoFile(null);
                  }}
                >
                  Cancel
                </button>
              )}

              <button
                type="submit"
                className={`w-full py-2 rounded-xl ${
                  loadingText === 'Uploaded' ? 'bg-green-600' : 'bg-[#6F6BF2]'
                } `}
                disabled={
                  loadingText === 'Publish' || loadingText === 'Error - Retry'
                    ? false
                    : true
                }
                onClick={
                  loadingText === 'Error - Retry'
                    ? () => dbSave(form)
                    : handlePublish
                }
              >
                {loadingText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
