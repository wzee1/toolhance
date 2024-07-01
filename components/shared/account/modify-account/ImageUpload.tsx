"use client"

import { useState } from "react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

import { uploadImage } from "@/actions/account-manipulation/profile-picture.action"

export default function UploadImage() {
  const [imageData, setImageData] = useState("");
  const [cooldownActive, setCooldownActive] = useState(false);
  const COOLDOWN_MINUTES = 1;

  const handleImageChange = (event: any) => {
    const selectedFile = event.target.files[0];
    const validImageTypes = ["image/jpeg", "image/png", "image/webp"];
    
    if (selectedFile && validImageTypes.includes(selectedFile.type))
      setImageData(selectedFile); // Store selected file data
    else {
      toast({
        variant: "destructive",
        description: "Please upload a valid image file (.jpg, .png, .webp)!",
      })
      event.target.value = null
    }
  }

  const handleUpload = async () => {
    setCooldownActive(true);
    try {
      const formData = new FormData();
      formData.append('image', imageData);
      formData.append("cooldownTime", COOLDOWN_MINUTES.toString())

      const data = await uploadImage(formData)

      if (data.status == 200) {
        setImageData(""); // Clear selected image
        toast({
          variant: "default",
          description: "Profile picture uploaded successfully!",
        })
      } else if (data.status == 429) {
        // exceeded rate limit error
        toast({
          variant: "destructive",
          description: data.error
        })
      }
    } catch (error) {
      console.log("Unexpected error: ", error)
    } finally {
      setTimeout(() => setCooldownActive(false), COOLDOWN_MINUTES * 60000)
    }
  }

  return (
    <div className="flex flex-col gap-5">
      {imageData && typeof imageData === 'object' && (
        <Image
          src={URL.createObjectURL(imageData)}
          alt="Selected Image"
          width={445}
          height={0}
        />
      )}
      <input type="file" onChange={handleImageChange} disabled={cooldownActive} />
      <Button onClick={handleUpload} disabled={cooldownActive}>
        {cooldownActive ? `Next upload in ${COOLDOWN_MINUTES} min(s)` : 'Upload Picture'}
      </Button>
    </div>
  )
}