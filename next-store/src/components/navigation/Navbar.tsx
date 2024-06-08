"use client";

import Link from "next/link";

import { Customer } from "@medusajs/medusa";
import UserButton from "../buttons/user-button";
import CartButton from "../cart/CartButton";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { buttonVariants } from "../ui/button";
import MobileNav from "./MobileNavbar";
import NavItems from "./NavItems";

type NavbarProps = {
  customer: Omit<Customer, "password_hash"> | null;
};

const Navbar = ({ customer }: NavbarProps) => {
  const user = customer;

  return (
    <div className="bg-background border-gray-500 sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-background">
        <MaxWidthWrapper>
          <div className="border-b border-gray-500">
            <div className="flex h-16 items-center">
              <MobileNav customer={user} />
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <p className="font-semibold text-xl text-blue-500">Medusa</p>
                </Link>
              </div>

              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? null : (
                    <Link
                      href="/auth/login"
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Sign in
                    </Link>
                  )}

                  {user ? null : (
                    <span className="h-6 w-px bg-gray-500" aria-hidden="true" />
                  )}

                  {user ? (
                    <div>
                      <Link href="/profile" legacyBehavior passHref>
                        <UserButton />
                      </Link>
                    </div>
                  ) : (
                    <Link
                      href="/auth/register"
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Create Account
                    </Link>
                  )}

                  {user ? (
                    <span className="h-6 w-px bg-gray-500" aria-hidden="true" />
                  ) : null}

                  {user ? null : (
                    <div className="flex lg:ml-6">
                      <span
                        className="h-6 w-px bg-gray-500"
                        aria-hidden="true"
                      />
                    </div>
                  )}

                  <div className="ml-4 flow-root lg:ml-6">
                    <CartButton />
                  </div>
                </div>
                <div className="lg:hidden">
                  <div className="flex gap-5 mr-2">
                    {user && (
                      <>
                        <UserButton />
                        <span
                          className="h-6 w-px bg-gray-500"
                          aria-hidden="true"
                        />
                      </>
                    )}
                    <CartButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
