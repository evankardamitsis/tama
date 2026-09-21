/**
 * Content access layer.
 *
 * Today every getter returns the static module from `src/content`.
 * Phase 2 (Contentful): replace the bodies with `contentful` client calls
 * and map the entries onto the same types — pages and components stay as is.
 */
import { site } from "@/content/site";
import { home } from "@/content/home";
import { about } from "@/content/about";
import { features } from "@/content/features";
import { equipment } from "@/content/equipment";
import { villaLayout } from "@/content/villaLayout";
import { services } from "@/content/services";
import { gallery } from "@/content/gallery";
import type {
  AboutPage,
  EquipmentPage,
  FeaturesPage,
  GalleryPage,
  HomePage,
  ServicesPage,
  SiteSettings,
  VillaLayoutPage,
} from "@/content/types";

export async function getSiteSettings(): Promise<SiteSettings> {
  return site;
}
export async function getHomePage(): Promise<HomePage> {
  return home;
}
export async function getAboutPage(): Promise<AboutPage> {
  return about;
}
export async function getFeaturesPage(): Promise<FeaturesPage> {
  return features;
}
export async function getEquipmentPage(): Promise<EquipmentPage> {
  return equipment;
}
export async function getVillaLayoutPage(): Promise<VillaLayoutPage> {
  return villaLayout;
}
export async function getServicesPage(): Promise<ServicesPage> {
  return services;
}
export async function getGalleryPage(): Promise<GalleryPage> {
  return gallery;
}
