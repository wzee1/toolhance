import { validateRequest } from "@/lib/lucia"
import { redirect } from "next/navigation"
import { findUserByUserId } from "@/actions/database.actions"

import {
  Tabs, TabsList, TabsTrigger
} from "@/components/ui/tabs"

import unknownProfile from "@/public/unknownProfile.jpg"
import ProfilePicture from "@/components/shared/account/modify-account/ProfilePicture"

import ModifyAccountTab from "@/components/shared/account/modify-account/ModifyAccountTab"
import AccountInfoTab from "@/components/shared/account/account-info/AccountInfoTab"
import TwoFATab from "@/components/shared/account/2fa/TwoFATab"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Toolhance | Account",
  description: "Explore and manage your Toolhance account information here, and make updates as necessary!",
}

export default async function Account() {
  const { user } = await validateRequest()
  if (!user) return redirect("/")

  const userInfo = await findUserByUserId(user.id)
  
  // username
  let userName
  if (userInfo?.name) userName = userInfo!.name
  else userName = userInfo?.email?.split("@")[0]

  // profile pic
  let userPicture
  if (userInfo?.profilePictureUrl) {
    // oauth url
    if (userInfo.profilePictureUrl.slice(0, 8) == "https://")
      userPicture = <ProfilePicture
        oauth={true} url={userInfo?.profilePictureUrl.toString()} />
    else
      userPicture = <ProfilePicture
        oauth={false} url={userInfo?.profilePictureUrl} />
  }
  else userPicture = <ProfilePicture
    oauth={false} url={unknownProfile} />

  // plan
  const plan = "Free"

  return (
    <section className="pt-[10rem] flex justify-center items-center flex-col">
      <h1 className="font-bold bg-clip-text text-transparent bg-gradient-to-b dark:from-neutral-200 from-neutral-500 dark:to-neutral-500 to-black text-3xl md:text-5xl text-center mb-3">
        Welcome <span className="bg-clip-text text-transparent bg-gradient-to-b from-blue-200 to-blue-700">
          {userName}
        </span>
      </h1>
      <p className="text-lg md:text-xl text-gray-400 mb-[3.5rem]">
        to your own Toolhance account!
      </p>

      <Tabs defaultValue="account" className="max-w-[450px]">
        <TabsList className="w-[450px] justify-around">
          <TabsTrigger value="account">Your Account</TabsTrigger>
          <TabsTrigger value="modifyAccount">Modify Account</TabsTrigger>
          <TabsTrigger value="twoFA">Setup 2FA</TabsTrigger>
        </TabsList>

        <AccountInfoTab
          userInfo={userInfo} userName={userName}
          userPicture={userPicture} plan={plan}
        />

        <ModifyAccountTab
          userInfo={userInfo} userName={userName}
          userPicture={userPicture} plan={plan}
        />

        <TwoFATab
          userInfo={userInfo} userName={userName}
          userPicture={userPicture} plan={plan}
        />
      </Tabs>
    </section>
  )
}
