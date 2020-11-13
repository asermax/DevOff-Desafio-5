import create from 'zustand';

export const useAppState = create((set) => ({
  firstRender: true,
  homeScroll: 0,
  doFirstRender: () => set({ firstRender: false }),
  saveHomeScroll: (homeScroll) => set(({ homeScroll })),
}));
