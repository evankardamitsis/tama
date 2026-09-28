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
import { atAGlance } from "@/content/atAGlance";
import { amenities } from "@/content/amenities";
import { layout } from "@/content/layout";
import { services } from "@/content/services";
import { poolBeach } from "@/content/poolBeach";
import { dining } from "@/content/dining";
import { wellness } from "@/content/wellness";
import { gallery } from "@/content/gallery";
import type {
  AboutPage,
  AmenitiesPage,
  AtAGlancePage,
  DayPage,
  GalleryPage,
  HomePage,
  LayoutPage,
  ServicesPage,
  SiteSettings,
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
export async function getAtAGlancePage(): Promise<AtAGlancePage> {
  return atAGlance;
}
export async function getAmenitiesPage(): Promise<AmenitiesPage> {
  return amenities;
}
export async function getLayoutPage(): Promise<LayoutPage> {
  return layout;
}
export async function getServicesPage(): Promise<ServicesPage> {
  return services;
}
export async function getPoolBeachPage(): Promise<DayPage> {
  return poolBeach;
}
export async function getDiningPage(): Promise<DayPage> {
  return dining;
}
export async function getWellnessPage(): Promise<DayPage> {
  return wellness;
}
export async function getGalleryPage(): Promise<GalleryPage> {
  return gallery;
}
