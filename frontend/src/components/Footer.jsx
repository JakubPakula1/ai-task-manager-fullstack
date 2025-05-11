export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} AI Task Manager. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
