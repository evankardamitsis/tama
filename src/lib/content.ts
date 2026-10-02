/**
 * Content access layer.
 *
 * Reads from Contentful when a space is configured, and falls back to the
 * static modules in `src/content` when it is not — so the site still builds
 * and runs with no credentials, and the modules stay as the reference the
 * migration is verified against.
 */
import { contentfulEnabled, loadStore } from "./contentful/store";
import * as map from "./contentful/map";

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

/** Reads from Contentful if it is configured, otherwise the static module. */
async function from<T>(read: (s: Awaited<ReturnType<typeof loadStore>>) => T, fallback: T): Promise<T> {
  if (!contentfulEnabled()) return fallback;
  return read(await loadStore());
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return from(map.siteSettings, site);
}
export async function getHomePage(): Promise<HomePage> {
  return from(map.homePage, home);
}
export async function getAboutPage(): Promise<AboutPage> {
  return from(map.aboutPage, about);
}
export async function getAtAGlancePage(): Promise<AtAGlancePage> {
  return from(map.atAGlancePage, atAGlance);
}
export async function getAmenitiesPage(): Promise<AmenitiesPage> {
  return from(map.amenitiesPage, amenities);
}
export async function getLayoutPage(): Promise<LayoutPage> {
  return from(map.layoutPage, layout);
}
export async function getServicesPage(): Promise<ServicesPage> {
  return from(map.servicesPage, services);
}
export async function getPoolBeachPage(): Promise<DayPage> {
  return from((s) => map.dayPage(s, "pool-beach"), poolBeach);
}
export async function getDiningPage(): Promise<DayPage> {
  return from((s) => map.dayPage(s, "dining"), dining);
}
export async function getWellnessPage(): Promise<DayPage> {
  return from((s) => map.dayPage(s, "wellness"), wellness);
}
export async function getGalleryPage(): Promise<GalleryPage> {
  return from(map.galleryPage, gallery);
}
