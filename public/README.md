# Public Assets Folder

This folder contains static assets that are served directly by Next.js.

## Image Placement Guide

### Favicon

Place your favicon files here with these names:

- `favicon.ico` - Standard favicon (16x16 or 32x32 px)
- `favicon.svg` - SVG favicon (recommended for better quality)
- `apple-touch-icon.png` - Apple touch icon (180x180 px)

### Logo

Place your logo files here:

- `logo.png` or `logo.svg` - Main logo for the website
- `logo-white.png` - White version of logo (for dark backgrounds)
- `logo-icon.png` - Icon-only version of logo (for smaller spaces)

### Recommended Sizes

- **Favicon**: 32x32 px or 16x16 px (ICO format)
- **Apple Touch Icon**: 180x180 px (PNG format)
- **Logo**: 200-400px width (PNG or SVG format)
- **Logo Icon**: 64x64 px (PNG format)

## How to Use

### Favicon

Next.js automatically detects `favicon.ico` in the public folder.

### Logo in Components

Reference logos in your components like this:

```tsx
<img src="/logo.png" alt="Printeez Logo" />
```

### In metadata (for app/layout.tsx)

```tsx
export const metadata = {
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};
```

## Quick Start

1. Place your `favicon.ico` file in this folder
2. Place your `logo.png` file in this folder
3. Restart your Next.js dev server
4. Access at: http://localhost:3000/logo.png
