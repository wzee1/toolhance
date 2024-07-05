import { TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

import Link from "next/link"
import Image from "next/image"

import TwoFA from "./TwoFA"

import greenCheckSrc from "@/public/green-check.gif"
import { Remove2FA } from "./Remove2FA"
import { userInfo } from "@/types"

export default function AccountInfo(
  { userInfo }: { userInfo: userInfo }
) {
  return (
    <TabsContent value="twoFA">
      <div className="p-5 bg-accent rounded-sm">
        {
          !userInfo?.hashedPassword
            ? <>
            <p className="text-center text-gray-600 dark:text-gray-300">
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
            : !userInfo?.is2FAEnabled
              ? <TwoFA />
              : <div className="flex items-center flex-col">
                  <h2 className="text-xl font-bold text-center my-3">
                    Congratulations, you have<br />Two-Factor Authentication enabled! 
                  </h2>
        
                  <Image
                    src={greenCheckSrc}
                    alt="Success"
                    width={100}
                    height={100}
                    className="mb-5"
                  />

                  <Remove2FA />
                </div>
        }
      </div>
    </TabsContent>
  )
}


