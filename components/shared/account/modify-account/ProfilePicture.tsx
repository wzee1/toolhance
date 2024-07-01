"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getImage } from '@/actions/account-manipulation/profile-picture.action';
import unknownProfileSrc from "@/public/unknownProfile.jpg"

export default function ProfilePicture(
  { oauth, url } : any
) {
  const [profilePicture, setProfilePicture] = useState<any>("");

  useEffect(() => {
    // for not oauth
    const fetchData = async () => {
      const response = await getImage()

      if (response.status === 200 && response.profilePicture) {
        const imageBlob = new Blob(
          [Buffer.from(response.profilePicture, 'base64')],
          { type: 'image/webp' }
        )

        setProfilePicture(URL.createObjectURL(imageBlob))
      } else setProfilePicture(unknownProfileSrc)
    }

    if (!oauth)
      fetchData()
        .catch(error => console.error("Error fetching profile picture: ", error))
    else
      setProfilePicture(url)
  }, [url, oauth])

  return (
    <div>
      {profilePicture ? (
        <Image
          className="rounded-full object-cover"
          src={profilePicture}
          alt="Profile Picture"
          width={64}
          height={64}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
