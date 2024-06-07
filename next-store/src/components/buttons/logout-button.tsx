"use client";

import { signOut } from "@/app/actions/user-actions";
import { useParams } from "next/navigation";
import { Button } from "../ui/button";

const LogoutButton = () => {
  const { countryCode } = useParams() as { countryCode: string };

  const handleLogout = async () => {
    try {
      await signOut(countryCode);
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default LogoutButton;
