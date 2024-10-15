"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ImagePlus, X } from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Product name must be at least 2 characters." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  price: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Price must be a valid number.",
  }),
  discount: z.number().min(0).max(100),
  sizes: z.array(z.string()).min(1, { message: "Select at least one size." }),
  colors: z.array(z.string()).min(1, { message: "Select at least one color." }),
  mainImage: z
    .any()
    .refine((files) => files?.length == 1, "Main image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  galleryImages: z
    .any()
    .refine(
      (files) => files?.length <= 5,
      "You can upload up to 5 gallery images."
    )
    .refine(
      (files) => Array.from(files).every((file) => file.size <= MAX_FILE_SIZE),
      `Max file size is 5MB.`
    )
    .refine(
      (files) =>
        Array.from(files).every((file) =>
          ACCEPTED_IMAGE_TYPES.includes(file.type)
        ),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export default function CreateProduct() {
  const router = useRouter();
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      discount: 0,
      sizes: [],
      colors: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Product Created",
      description: "Your product has been successfully created.",
    });
    router.push("/admin/products");
  }

  const handleMainImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryImagesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      const newPreviews: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result as string);
          if (newPreviews.length === files.length) {
            setGalleryPreviews(newPreviews);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Product</CardTitle>
        <CardDescription>Add a new product to your catalog</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter product description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter product price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discount"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Discount (%)</FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[value]}
                      onValueChange={(vals) => onChange(vals[0])}
                    />
                  </FormControl>
                  <FormDescription>Current discount: {value}%</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sizes"
              render={() => (
                <FormItem>
                  <FormLabel>Sizes</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2">
                      {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                        <Label
                          key={size}
                          className="flex items-center space-x-2 border rounded-md p-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            value={size}
                            {...form.register("sizes")}
                            className="form-checkbox"
                          />
                          <span>{size}</span>
                        </Label>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="colors"
              render={() => (
                <FormItem>
                  <FormLabel>Colors</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2">
                      {["Red", "Blue", "Green", "Yellow", "Black", "White"].map(
                        (color) => (
                          <Label
                            key={color}
                            className="flex items-center space-x-2 border rounded-md p-2 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              value={color}
                              {...form.register("colors")}
                              className="form-checkbox"
                            />
                            <span>{color}</span>
                          </Label>
                        )
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mainImage"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Main Image</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-center w-full">
                      <Label
                        htmlFor="main-image-upload"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                      >
                        {mainImagePreview ? (
                          <div className="relative w-full h-full">
                            <img
                              src={mainImagePreview}
                              alt="Main product"
                              className="w-full h-full object-cover rounded-lg"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2"
                              onClick={() => {
                                setMainImagePreview(null);
                                onChange(null);
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <ImagePlus className="w-8 h-8 mb-4 text-gray-500" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                              PNG, JPG or WebP (MAX. 5MB)
                            </p>
                          </div>
                        )}
                        <Input
                          id="main-image-upload"
                          type="file"
                          className="hidden"
                          accept="image/png, image/jpeg, image/webp"
                          onChange={(event) => {
                            handleMainImageChange(event);
                            onChange(event.target.files);
                          }}
                          {...field}
                        />
                      </Label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="galleryImages"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Gallery Images (up to 5)</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-center w-full">
                      <Label
                        htmlFor="gallery-images-upload"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                      >
                        {galleryPreviews.length > 0 ? (
                          <div className="grid grid-cols-3 gap-2 p-2 w-full h-full">
                            {galleryPreviews.map((preview, index) => (
                              <div key={index} className="relative">
                                <img
                                  src={preview}
                                  alt={`Gallery image ${index + 1}`}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  className="absolute top-1 right-1"
                                  onClick={() => {
                                    const newPreviews = galleryPreviews.filter(
                                      (_, i) => i !== index
                                    );
                                    setGalleryPreviews(newPreviews);
                                    onChange(
                                      newPreviews.length > 0
                                        ? new DataTransfer().files
                                        : null
                                    );
                                  }}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <ImagePlus className="w-8 h-8 mb-4 text-gray-500" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                              PNG, JPG or WebP (MAX. 5MB each)
                            </p>
                          </div>
                        )}
                        <Input
                          id="gallery-images-upload"
                          type="file"
                          className="hidden"
                          accept="image/png, image/jpeg, image/webp"
                          multiple
                          onChange={(event) => {
                            handleGalleryImagesChange(event);
                            onChange(event.target.files);
                          }}
                          {...field}
                        />
                      </Label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Create Product</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
