import { TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

import Link from "next/link"

import TwoFA from "./TwoFA"

export default function AccountInfo({
  userInfo, userName, userPicture, plan
}: any) {
  return (
    <TabsContent value="twoFA">
      <div className="p-5 bg-accent rounded-sm">
        {
          !userInfo?.hashedPassword
            ? <>
            <p className="text-center text-gray-300">
              You signed up with a third-party provider.<br/>
              To setup Two-Factor Authentication,<br />
              please visit their website!
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
            : <TwoFA />
        }
      </div>
    </TabsContent>
  )
}


