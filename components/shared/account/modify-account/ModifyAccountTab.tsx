import { TabsContent } from "@/components/ui/tabs"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import ForgetPassword from "./ForgetPassword"
import ImageUpload from "./ImageUpload"
import SubscriptionPlan from "./SubscriptionPlan"

export default function ModifyAccountTab({
  userInfo, userName, userPicture, plan
}: any) {
  return (
    <TabsContent value="modifyAccount">
      <div className="p-5 bg-accent rounded-sm">
        <h2 className="text-xl font-bold text-center mt-3 mb-6">
          Self-Service Password Reset
        </h2>

        {
          !userInfo?.hashedPassword
            ? <>
            <p className="text-center text-gray-300">
              You signed up with a third-party provider.<br/>
              To change your password, please visit their website!
            </p>

            <div className="flex gap-2 flex-col mt-10">
              <Link href="https://google.com" target="_blank">
                <Button className="w-full">
                  Go to Google
                </Button>
              </Link>

              <Link href="https://facebook.com" target="_blank">
                <Button className="w-full">
                  Go to Facebook
                </Button>
              </Link>
            </div>
            </>
            : <ForgetPassword />
        }

        <Separator
          className="my-10 mx-auto bg-black/40 dark:bg-white/40"
        />

        <h2 className="text-xl font-bold text-center my-4 mb-10">
          Upload Profile Picture
        </h2>
        <ImageUpload />

        <Separator
          className="my-10 mx-auto bg-black/40 dark:bg-white/40"
        />
        <h2 className="text-xl font-bold text-center my-4 mb-10">
          Manage Subscription Plan
        </h2>
        <SubscriptionPlan />

      </div>
    </TabsContent>
  )
}