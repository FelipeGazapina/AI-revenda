"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const OTP_LENGTH = 6;

export default function OTPPage() {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams ? searchParams.get("email") || "" : "";

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length === OTP_LENGTH) {
      setIsVerifying(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        if (email === "felipe@gazapina.com.br") {
          toast({
            title: "Admin Access Granted",
            description: "Redirecting to admin dashboard.",
          });
          router.push("/admin");
        } else {
          toast({
            title: "OTP Verified",
            description: "Your OTP has been successfully verified.",
          });
          router.push("/dashboard");
        }
      } catch (error) {
        toast({
          title: "Verification Failed",
          description:
            "There was an error verifying your OTP. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsVerifying(false);
      }
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please enter a complete OTP",
        variant: "destructive",
      });
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "OTP Resent",
        description: "A new OTP has been sent to your device",
      });
      setOtp(Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    } catch (error) {
      toast({
        title: "Resend Failed",
        description: "There was an error resending the OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Suspense fallback={<p>Loading...</p>}>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Enter OTP</CardTitle>
            <CardDescription>
              We&apos;ve sent a one-time password to {email}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="flex justify-between mb-4">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    className="w-12 h-12 text-center text-2xl"
                    disabled={isVerifying || isResending}
                  />
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full"
                disabled={isVerifying || isResending}
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying
                  </>
                ) : (
                  "Verify OTP"
                )}
              </Button>
              <Button
                variant="link"
                type="button"
                onClick={handleResend}
                disabled={isVerifying || isResending}
              >
                {isResending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Resending
                  </>
                ) : (
                  "Resend OTP"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Suspense>
    </div>
  );
}
