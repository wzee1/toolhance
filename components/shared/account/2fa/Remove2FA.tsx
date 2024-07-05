"use client"

import { disable2FA } from "@/actions/2fa.actions"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function Remove2FA() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Use Backup Code to Remove 2FA
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Remove Two-Factor Authentication</DialogTitle>
          <DialogDescription>
            Enter your backup code to remove 2FA.<br />
            <span className="text-red-500">This action cannot be undone!</span>
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="code" className="text-right">
            Code
          </Label>
          <Input
            id="code"
            className="col-span-3 dark:text-white"
          />
        </div>
        <DialogFooter>
          <Button onClick={() => disable2FA()}>Remove 2FA</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
