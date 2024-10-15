"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data (in a real app, this would come from an API)
const newProducts = [
  {
    id: 1,
    name: "New Ergonomic Chair",
    price: 199.99,
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Wireless Earbuds Pro",
    price: 149.99,
    image: "/placeholder.svg",
  },
  { id: 3, name: "Smart Home Hub", price: 129.99, image: "/placeholder.svg" },
  { id: 4, name: "4K Ultra HD TV", price: 799.99, image: "/placeholder.svg" },
  {
    id: 5,
    name: "Portable Power Bank",
    price: 49.99,
    image: "/placeholder.svg",
  },
];

const favoriteProducts = [
  {
    id: 101,
    name: "Leather Laptop Bag",
    price: 89.99,
    image: "/placeholder.svg",
  },
  {
    id: 102,
    name: "Fitness Smartwatch",
    price: 199.99,
    image: "/placeholder.svg",
  },
  {
    id: 103,
    name: "Noise-Cancelling Headphones",
    price: 249.99,
    image: "/placeholder.svg",
  },
];

const ProductCard = ({ product, isFavorite = false }: any) => (
  <Card className="w-full">
    <CardHeader>
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
    </CardHeader>
    <CardContent>
      <CardTitle className="text-lg">{product.name}</CardTitle>
      <CardDescription>${product.price.toFixed(2)}</CardDescription>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline">View Details</Button>
      {isFavorite ? (
        <Button variant="ghost" size="icon">
          <Heart className="h-4 w-4 fill-current text-red-500" />
        </Button>
      ) : (
        <Button variant="ghost" size="icon">
          <Heart className="h-4 w-4" />
        </Button>
      )}
    </CardFooter>
  </Card>
);

const Carousel = ({ items }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item: any) => (
            <div key={item.id} className="w-full flex-shrink-0">
              <ProductCard product={item} />
            </div>
          ))}
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-2 transform -translate-y-1/2"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-2 transform -translate-y-1/2"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default function UserDashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>New Products</CardTitle>
            <CardDescription>Check out our latest arrivals</CardDescription>
          </CardHeader>
          <CardContent>
            <Carousel items={newProducts} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Your Favorite Products</CardTitle>
            <CardDescription>Quick access to your saved items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {favoriteProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={true}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
