"use client"

import { useEffect, useState } from "react"
import QRCode from "qrcode.react"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"

import greenCheckSrc from "@/public/green-check.gif"
import Image from "next/image"

import {
  generate2FASecretAction, verifyOTPAction
} from "@/actions/2fa.actions"

export default function TwoFA() {
  const [secret, setSecret] = useState("")
  const [otp, setOtp] = useState("")
  const [backupCode, setBackupCode] = useState("")
  const [step, setStep] = useState(1)
  const [error, setError] = useState("")

  useEffect(() => {
    if (error != "")
      toast({
        variant: "destructive",
        description: error
      })
  }, [error])

  const generateSecret = async () => {
    try {
      const data = await generate2FASecretAction()

      if (data.status == 200) {
        setSecret(data.message?.secret as string)
        setBackupCode(data.message?.backupCode as string)
        setStep(2)
      }
    } catch (error) {
      setError("Failed to generate secret")
    }
  }

  const verifyOtp = async () => {
    try {
      const data = await verifyOTPAction(
        { otp, secret, backupCode }
      )
      
      if (data.success) {
        setStep(3)
      } else {
        setError("Invalid OTP")
      }
    } catch (error) {
      setError("Failed to verify OTP")
    }
  }

  return (
    <section>
      {step === 1 && (
        <>
          <h2 className="text-xl font-bold text-center mt-3 mb-6">
            Setup Two-Factor Authentication
          </h2>

          <Button
            className="w-full"
            onClick={generateSecret}
          >Generate 2FA Secret</Button>

        </>
      )}
      {step === 2 && (
        <>
          <h2 className="text-xl font-bold text-center mt-3 mb-6">
            Scan the QR code with your authenticator app
          </h2>

          <div className="w-fit p-2 mx-auto mb-6 bg-blue-400 rounded-sm"> 
            <QRCode
              value={`otpauth://totp/Toolhance?secret=${secret}`}
            />
          </div>

          <p><b>Secret:</b> {secret}</p>
          <p className="text-white/50 mb-2">
            Alternatively, enter the secret code into your authenticator app instead of scanning the QR code.
          </p>

          <Input 
            type="text" placeholder="Enter OTP"
            value={otp} onChange={(e) => setOtp(e.target.value)}
            className="mb-4 dark:text-white"
          />

          <Button
            className="w-full"
            onClick={verifyOtp}
          >Verify OTP</Button>
        </>
      )}
      {step === 3 && (
        <div className="flex items-center flex-col">
          <h2 className="text-xl font-bold text-center my-3">
            2FA Setup Complete
          </h2>

          <h3 className="text-lg my-1">
            Your backup code: {backupCode}
          </h3>

          <p className="my-3">
            Please save this backup code in a safe place. Use it to log in if you can&apos;t access the one-time passcode from your authenticator app. You can also use this code to disable Two-Factor Authentication
          </p>

          <Image
            src={greenCheckSrc}
            alt="Success"
            width={100}
            height={100}
          />
        </div>
      )}

      <p className="text-xs text-center text-gray-400 mt-5">{step}. step out of 3</p>
    </section>
  )
}