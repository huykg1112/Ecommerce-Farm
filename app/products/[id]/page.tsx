"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { addToCart } from "@/lib/features/cart-slice"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Share2,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  MessageCircle,
  Minus,
  Plus,
  ChevronRight,
} from "lucide-react"
import { products } from "@/data/products"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  
  const dispatch = useDispatch()
  
  // Find the product by ID
  const product = products.find(p => p.id === params.id) || products[0]
  
  // Get related products (same category)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)
  
  // Product images (in a real app, these would come from the product data)
  const productImages = [
    product.image,
    "/images/products/product-detail-2.jpg",
    "/images/products/product-detail-3.jpg",
    "/images/products/product-detail-4.jpg",
  ]
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }
  
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image,
        sellerId: product.seller.id,
        sellerName: product.seller.name,
      })
    )
  }
  
  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary">Trang chủ</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href={`/category/${product.category.toLowerCase()}`} className="hover:text-primary">
          {product.category}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-700 font-medium truncate">{product.name}</span>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div>
          <div className="relative aspect-square mb-4 border rounded-lg overflow-hidden">
            <Image 
              src={productImages[activeImage] || "/placeholder.svg"} 
              alt={product.name} 
              fill 
              className="object-cover"
            />
            {product.discount && product.discount > 0 && (
              <Badge className="absolute top-4 left-4 bg-red-500">-{product.discount}%</Badge>
            )}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {productImages.map((image, index) => (
              <div 
                key={index}
                className={`relative aspect-square border rounded-md overflow-hidden cursor-pointer ${
                  activeImage === index ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setActiveImage(index)}
              >
                <Image 
                  src={image || "/placeholder.svg"} 
                  alt={`${product.name} - Hình ${index + 1}`} 
                  fill 
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">{product.rating} ({product.ratingCount} đánh giá)</span>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-sm text-green-600">Đã bán 250+</span>
          </div>
          
          <div className="flex items-center mb-6">
            <div className="text-3xl font-bold text-gray-900">{product.price.toLocaleString()}đ</div>
            {product.originalPrice && (
              <div className="ml-3 text-lg text-gray-500 line-through">{product.originalPrice.toLocaleString()}đ</div>
            )}
            {product.discount && product.discount > 0 && (
              <Badge className="ml-3 bg-red-500">-{product.discount}%</Badge>
            )}
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Mô tả:</h3>
            <p className="text-gray-600">
              {product.name} được trồng và thu hoạch theo tiêu chuẩn VietGAP, đảm bảo an toàn vệ sinh thực phẩm. 
              Sản phẩm tươi ngon, không sử dụng hóa chất độc hại, phù hợp cho mọi gia đình.
            </p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Đại lý:</h3>
            <Link href={`/seller/${product.seller.id}`} className="flex items-center">
              <Image 
                src={`/images/sellers/${product.seller.id}.jpg`} 
                alt={product.seller.name} 
                width={40} 
                height={40} 
                className="rounded-full mr-2"
              />
              <div>
                <div className="font-medium text-primary hover:underline">{product.seller.name}</div>
                <div className="text-xs text-gray-500">Xem cửa hàng</div>
              </div>
            </Link>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Số lượng:</h3>
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="mx-4 w-8 text-center">{quantity}</span>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={increaseQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <span className="ml-4 text-sm text-gray-500">Còn 500 sản phẩm</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <Button 
              size="lg" 
              className="flex-1 bg-primary hover:bg-primary-dark"
              onClick={handleAddToCart}
            >
              Thêm vào giỏ hàng
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className={`${isWishlisted ? 'text-red-500 border-red-500' : ''}`}
              onClick={toggleWishlist}
            >
              <Heart className={`h-5 w-5 mr-2 ${isWishlisted ? 'fill-red-500' : ''}`} />
              Yêu thích
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center text-sm">
              <Truck className="h-5 w-5 text-primary mr-2" />
              <span>Giao hàng toàn quốc</span>
            </div>
            <div className="flex items-center text-sm">
              <ShieldCheck className="h-5 w-5 text-primary mr-2" />
              <span>Đảm bảo chất lượng</span>
            </div>
            <div className="flex items-center text-sm">
              <RotateCcw className="h-5 w-5 text-primary mr-2" />
              <span>Đổi trả trong 7 ngày</span>
            </div>
            <div className="flex items-center text-sm">
              <MessageCircle className="h-5 w-5 text-primary mr-2" />
              <span>Hỗ trợ 24/7</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Details Tabs */}
      <Tabs defaultValue="details" className="mb-12">
        <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
          <TabsTrigger 
            value="details" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent text-base py-3 px-4"
          >
            Chi tiết sản phẩm
          </TabsTrigger>
          <TabsTrigger 
            value="specifications" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent text-base py-3 px-4"
          >
            Thông số kỹ thuật
          </TabsTrigger>
          <TabsTrigger 
            value="reviews" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent text-base py-3 px-4"
          >
            Đánh giá ({product.ratingCount})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="pt-6">
          <div className="prose max-w-none">
            <h3>Mô tả chi tiết sản phẩm</h3>
            <p>
              {product.name} là sản phẩm nông nghiệp chất lượng cao, được trồng và thu hoạch theo tiêu chuẩn VietGAP, 
              đảm bảo an toàn vệ sinh thực phẩm. Sản phẩm tươi ngon, không sử dụng hóa chất độc hại, 
              phù hợp cho mọi gia đình.
            </p>
            <p>
              Được trồng tại các vùng nông nghiệp sạch, sản phẩm của chúng tôi luôn đảm bảo chất lượng và 
              hương vị tự nhiên. Chúng tôi cam kết mang đến cho khách hàng những sản phẩm tươi ngon nhất, 
              góp phần vào việc bảo vệ sức khỏe của gia đình bạn.
            </p>
            <h3>Đặc điểm nổi bật</h3>
            <ul>
              <li>Sản phẩm tươi ngon, chất lượng cao</li>
              <li>Được trồng và thu hoạch theo tiêu chuẩn VietGAP</li>
              <li>Không sử dụng hóa chất độc hại</li>
              <li>Giàu dinh dưỡng, tốt cho sức khỏe</li>
              <li>Đóng gói cẩn thận, bảo quản tốt</li>
            </ul>
            <h3>Hướng dẫn bảo quản</h3>
            <p>
              Để đảm bảo sản phẩm luôn tươi ngon, bạn nên bảo quản trong tủ lạnh ở nhiệt độ 2-5°C. 
              Nên sử dụng trong vòng 5-7 ngày sau khi mua để đảm bảo chất lượng tốt nhất.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="specifications" className="pt-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900 bg-gray-50 w-1/3">Xuất xứ</td>
                  <td className="py-3 px-4 text-sm text-gray-700">Việt Nam</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900 bg-gray-50">Vùng trồng</td>
                  <td className="py-3 px-4 text-sm text-gray-700">Đà Lạt, Lâm Đồng</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900 bg-gray-50">Tiêu chuẩn</td>
                  <td className="py-3 px-4 text-sm text-gray-700">VietGAP</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900 bg-gray-50">Quy cách đóng gói</td>
                  <td className="py-3 px-4 text-sm text-gray-700">500g/gói</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900 bg-gray-50">Hạn sử dụng</td>
                  <td className="py-3 px-4 text-sm text-gray-700">7 ngày kể từ ngày thu hoạch</td>
                </tr>\

