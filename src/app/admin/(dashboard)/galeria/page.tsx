import { getGalleryImages } from "@/lib/data";
import GalleryAdmin from "@/components/admin/GalleryAdmin";

export default async function GalleryAdminPage() {
  const images = await getGalleryImages();
  return <GalleryAdmin images={images} />;
}
