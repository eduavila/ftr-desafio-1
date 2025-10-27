import { create } from "zustand";
import { enableMapSet } from "immer";
import { immer } from "zustand/middleware/immer";
import { fetchAllLinksHttp } from "../http/fetch-all-links";
import { createLinkHttp } from "../http/create-link";
import { getLinkByShortCodeHttp } from "../http/get-link-by-shortcode";
import { deleteLinkHttp } from "../http/delete-link";
import { exportLinksCSVHttp } from "../http/export-links-csv";

export type Link = {
  id: string;
  originalUrl: string;
  shortCode: string;
  createdAt: Date;
  visitCount: number;
};

type LinksState = {
  linksLoading: boolean;
  links: Link[];
  linkError: string;
  fetchAllLinksLoading: boolean;
  exportLinksCSVLoading: boolean;
  fetchAllLinks: () => Promise<void>;
  createLink: (originalUrl: string, slug: string) => Promise<void>;
  deleteLink: (linkId: string) => Promise<void>;
  updateVisitCount: (linkId: string) => void;
  getLinkByShortCode: (shortCode: string) => Promise<Link | null>;
  exportLinksCSV: () => Promise<{ fileUrl: string }>;
};

enableMapSet();

export const useLinks = create<LinksState, [["zustand/immer", never]]>(
  immer((set) => {
    async function createLink(originalUrl: string, shorCode: string) {
      try {
        set((state) => {
          state.linksLoading = true;
          state.linkError = '';
        })

        const newlink = await createLinkHttp({
          originalUrl: originalUrl,
          shortCode: shorCode
        })

        set((state) => {
          state.links.unshift({
            ...newlink,
            visitCount: 0
          })
          state.linkError = ''
          state.linksLoading = false
        })
      } catch (err) {
        set((state) => {
          state.linkError = err instanceof Error ? err.message : '';
          state.linksLoading = false;
        });

        throw err;
      }
    }

    async function fetchAllLinks() {
      try {
        set((state) => {
          state.fetchAllLinksLoading = true;
        });

        const links = await fetchAllLinksHttp();

        set((state) => {
          state.links = links
          state.fetchAllLinksLoading = false;
        });
      } catch (err) {
        set((state) => {
          state.linkError = (err as any).message;
          state.fetchAllLinksLoading = false;
        });

        throw err;
      }
    }

    async function getLinkByShortCode(shortCode: string) {
      return getLinkByShortCodeHttp(shortCode);
    }

    async function deleteLink(linkId: string) {
      await deleteLinkHttp(linkId);

      set((state) => {
        state.links = state.links.filter((link) => link.id !== linkId)
      });
    }

    function updateVisitCount(linkId: string) {
      set((state) => {
        const link = state.links.find(l => l.id === linkId)
        if (link) {
          link.visitCount += 1
        }
      })
    }

    function exportLinksCSV() {
      try {
        set((state) => {
          state.exportLinksCSVLoading = true;
        });

        return exportLinksCSVHttp();
      } finally {
        set((state) => {
          state.exportLinksCSVLoading = false;
        });
      }
    }

    return {
      linksLoading: true,
      linkError: '',
      exportLinksCSVLoading: false,
      loadingLinks: true,
      fetchAllLinksLoading: true,
      links: [],
      createLink,
      fetchAllLinks,
      deleteLink,
      updateVisitCount,
      getLinkByShortCode,
      exportLinksCSV
    };
  })
);