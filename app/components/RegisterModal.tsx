import { SignIn, SignUp } from "@clerk/nextjs";
import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

function RegisterModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [method, setMethod] = useState("signup");
  const searchParams = useSearchParams();
  const router = useRouter();
  const qMethod = searchParams.get("m");
  const { theme } = useTheme();

  useEffect(() => {
    if (qMethod === "signup" || qMethod === "signin") {
      setMethod(qMethod);
      onOpen();
    } else {
      onClose();
    }
  }, [qMethod]);

  const handleOnClose = () => {
    router.push("?");
    onClose();
  };
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={handleOnClose}
        closeButton={<></>}
        scrollBehavior="inside"
      >
        <ModalContent className="w-min overflow-hidden">
          {(onClose) => (
            <>
              <ModalBody className="p-0 gap-0 mx-auto">
                {method === "signup" ? (
                  <SignUp
                    appearance={{
                      baseTheme: theme === "dark" ? dark : undefined,
                    }}
                    routing="hash"
                    signInUrl="?m=signin"
                  />
                ) : (
                  <SignIn
                    appearance={{
                      baseTheme: theme === "dark" ? dark : undefined,
                    }}
                    routing="hash"
                    signUpUrl="?m=signup"
                  />
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default RegisterModal;
