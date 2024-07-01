import { TabsContent } from "@/components/ui/tabs"

export default function AccountInfo({
  userInfo, userName, userPicture, plan
}: any) {
  return (
    <TabsContent value="account">
      <div className="p-5 bg-accent rounded-sm">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            {userPicture}
            
            <div>
              <h3 className="text-lg font-medium">{userName}</h3>
              <p className="text-sm text-gray-500">{userInfo!.email}</p>
            </div>
          </div>
        </div>

        <p className="mt-5">Your current plan is {plan}</p>
      </div>
    </TabsContent>
  )
}


