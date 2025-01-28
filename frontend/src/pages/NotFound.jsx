function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-lg mb-6 text-gray-600">
        Oops! The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <button
        className="btn btn-primary"
        onClick={() => (window.location.href = "/")}
      >
        Go Back Home
      </button>
    </div>
  );
}

export default NotFound;
