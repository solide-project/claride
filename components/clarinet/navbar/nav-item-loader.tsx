"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Braces } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { NavItemTheme } from "@/components/core/navbar/nav-item-theme"

interface NavItemLoaderProps extends React.HTMLAttributes<HTMLButtonElement> {
  message?: string
  forceOpen?: boolean
}

export function NavItemLoader({
  message,
  forceOpen = false,
}: NavItemLoaderProps) {
  const { push } = useRouter()
  const [drawerOpen, setDrawerOpen] = useState<boolean | undefined>(true)

  useEffect(() => {
    setDrawerOpen(forceOpen ? true : undefined)
  }, [])

  const [searchResult, setSearchResult] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("")

  const handleLoadContract = (e: React.FormEvent) => {
    e.preventDefault()

    if (searchResult.startsWith("https://github.com/")) {
      push(`/?url=${searchResult}`)
      setDrawerOpen(false)
      // } else if (isAddress(searchResult)) {
      //   push(`/address/${selectedChain}/${searchResult}`)
    } else {
      setErrorMessage("Invalid contract address or github url")
    }
  }

  return (
    <Drawer
      modal={false}
      open={drawerOpen}
      onOpenChange={setDrawerOpen}
      dismissible={forceOpen ? false : true}
    >
      {!forceOpen && (
        <DrawerTrigger asChild>
          <Button
            className="cursor-pointer border-0 hover:bg-grayscale-100"
            size="icon"
            variant="ghost"
            onClick={() => setDrawerOpen(true)}
          >
            <Braces />
          </Button>
        </DrawerTrigger>
      )}
      <DrawerContent className="h-[95vh] bg-none">
        <DrawerTitle></DrawerTitle>
        <DrawerDescription></DrawerDescription>
        <form className="my-4" onSubmit={handleLoadContract}>
          <div className="flex flex-col items-center justify-center gap-4">
            <Image src="/_assets/solide-dark.svg" alt="logo" height={96} width={96} />
            <div className="font-heading my-2 text-center text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
              Solide
            </div>
          </div>
          {(errorMessage || message) && (
            <div className="my-2 text-center text-red-500">
              {errorMessage || message}
            </div>
          )}

          <div className="flex items-center justify-center">
            <div className="flex w-4/5 items-center">
              <Input
                placeholder="Load Clarinet Address or Clarinet File on Github"
                onChange={(e) => setSearchResult(e.target.value)}
              />
            </div>
          </div>
        </form>
        <DrawerFooter>
          <div className="flex w-full gap-2">
            <NavItemTheme />
            <Button onClick={handleLoadContract} className="w-full">
              Load
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
