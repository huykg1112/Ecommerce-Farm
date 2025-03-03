"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { Search, ShoppingCart, Heart, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { categories } from "@/data/categories"

export default function Header() {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const categoryRef = useRef<HTMLDivElement>(null)
  const { totalItems } = useSelector((state: RootState) => state.cart)
  const { isAuthenticated } = useSelector((state: RootState) => state.user)

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const mainNavItems = [
    { name: "Trang chủ", href: "/" },
    { name: "Sản phẩm", href: "/products" },
    {
      name: "Danh mục",
      href: "#",
      hasDropdown: true,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault()
        setShowCategoryDropdown(!showCategoryDropdown)
      },
    },
    { name: "Đại lý", href: "/sellers" },
    { name: "Khuyến mãi", href: "/promotions" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-primary">Farme</span>
          </Link>

          <nav className="hidden md:flex">
            <ul className="flex space-x-6">
              {mainNavItems.map((item, index) => (
                <li key={index} className="relative" ref={item.hasDropdown ? categoryRef : null}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-gray-700 hover:text-primary flex items-center"
                    onClick={item.onClick}
                  >
                    {item.name}
                    {item.hasDropdown && <ChevronDown className="ml-1 h-4 w-4" />}
                  </Link>

                  {item.hasDropdown && showCategoryDropdown && (
                    <div className="absolute top-full left-0 mt-1 w-60 bg-white shadow-lg rounded-md border py-2 z-50">
                      {categories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/category/${category.slug}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative w-full max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Tìm kiếm sản phẩm nông nghiệp..."
                className="w-full pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-primary focus:ring-primary"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="bg-gray-100 rounded-full p-1">
                  <Search className="h-4 w-4 text-gray-500" />
                </div>
              </button>
            </div>
          </div>

          <Link href="/wishlist">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5 text-gray-700" />
              <span className="sr-only">Wishlist</span>
            </Button>
          </Link>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5 text-gray-700" />
              <span className="sr-only">Cart</span>
              {totalItems > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>

          {isAuthenticated ? (
            <Link href="/profile">
              <Button variant="ghost" className="text-sm font-medium">
                Tài khoản
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button className="bg-primary hover:bg-primary-dark text-white">Đăng nhập</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

