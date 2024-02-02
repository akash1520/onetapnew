import { supabase } from "app";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

type formValues = {
  username: string;
  profileName: string;
  profileImgUrl: string;
};

const initialValues: formValues = {
  username: "",
  profileName: "",
  profileImgUrl: "/profile.png",
};

// Validation schemas
const onBoardingSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required"),
  profileName: Yup.string().required("Profile Name is required"),
});



const OnBoardingForm = () => {
  
  const [selectedImage, setSelectedImage] = useState<File|null>(null)
  const [profileImgUrl, setProfileImgUrl] = useState<string>("")

  const handleSubmit = async (
    values: formValues
  ) => {
    values.profileImgUrl = profileImgUrl
    console.info(JSON.stringify(values,null, 2));
    }
  
  useEffect(()=>{
    const handleUpload = async (selectedImage:File) => {
      const {data, error} = await supabase.storage.from('profileImages').upload(selectedImage.name, selectedImage,{
        contentType:'image/*'
      })

      const media = await supabase.storage.from('profileImages').getPublicUrl(selectedImage.name)
      media && setProfileImgUrl(media.data.publicUrl) 
      error && console.info("Image uploaded error:" + error?.message)
    }
    selectedImage && handleUpload(selectedImage)
  },[selectedImage, setProfileImgUrl, profileImgUrl])

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={onBoardingSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        handleSubmit(values).finally(() =>
          setSubmitting(false)
        );
      }}
    >
      {({ values }) => (
        <Form className="flex flex-col gap-1 overflow-y-auto">
        <div className="mb-2">
            <img className="rounded-full h-max-[100px] w-max-[100px]" onClick={() => document.getElementById("profileImg")?.click()} src={`${profileImgUrl?profileImgUrl:"/profile.png"}`} alt="profile" />
            <input hidden type="file" accept="image/jpg" id="profileImg" onChange={(e) =>
              setSelectedImage(e.target.files ? e.target.files[0] : null)
            } name="profileImg"/>
        </div>

          {/* Username Field */}
          <div className="flex flex-col mb-2">
            <label
              htmlFor="username"
              className="text-sm font-light text-gray-400 mb-1"
            >
              username
            </label>
            <Field
              name="username"
              type="text"
              className="w-full p-2 rounded bg-[#1C2B3A] text-white"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-red-600 text-sm"
            />
          </div>

          {/* Profile Name Field */}
          <div className="flex flex-col mb-2">
            <label
              htmlFor="profileName"
              className="text-sm font-light text-gray-400 mb-1"
            >
              Profile Name
            </label>
            <Field
              name="profileName"
              type="text"
              className="w-full p-2 rounded bg-[#1C2B3A] text-white"
            />
            <ErrorMessage
              name="profileName"
              component="div"
              className="text-red-600 text-sm"
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            Submit
          </button>

        </Form>
      )}
    </Formik>
  );
};

export default OnBoardingForm;
