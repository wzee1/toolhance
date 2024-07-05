import { getSessionsByUserId } from "@/actions/database.actions"
import SignOutFromAllDevicesButton from "./SignOutFromAllDevicesButton"

import { userInfo } from "@/types"

import { TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

import unknownProfile from "@/public/unknownProfile.jpg"
import ProfilePicture from "@/components/shared/account/modify-account/ProfilePicture"

export default async function AccountInfo(
  { userInfo, username }:
  { userInfo: userInfo, username: string | undefined}
) {
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

  const plan = userInfo?.hasPremium ? "Premium" : "Pree"
  const twoFactorStatus = userInfo?.is2FAEnabled ? "Enabled" : "Disabled"
  const sessions = await getSessionsByUserId(userInfo?.id)
  const sessionCount = sessions?.length

  return (
    <TabsContent value="account">
      <div className="p-5 bg-accent rounded-sm">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            {userPicture}
            
            <div>
              <h3 className="text-lg font-medium">{username}</h3>
              <p className="text-sm text-gray-500">{userInfo!.email}</p>
            </div>
          </div>
        </div>

        <Separator
          className="mt-8 mb-7 mx-auto bg-black/20 dark:bg-white/30"
        />

        <h4 className="text-lg font-semibold">Additional Information</h4>
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div>
            <p className="text-sm text-gray-600 dark:text-white/60">
              Account Type:
            </p>
            <p>{plan}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-white/60">
              Two-Factor Authentication:
            </p>
            <p>{twoFactorStatus}</p>
          </div>
        
          <div>
            <p className="text-sm text-gray-600 dark:text-white/60">
              Devices logged in:
            </p>
            <p>{sessionCount}</p>
          </div>

          <SignOutFromAllDevicesButton />
        </div>
      </div>
    </TabsContent>
  )
}


