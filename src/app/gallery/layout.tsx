export default function GalleryLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="p-6 bg-white shadow-md rounded">
        <h1 className="text-3xl font-bold mb-4">Gallery</h1>
        {children}
      </div>
    );
  }
  